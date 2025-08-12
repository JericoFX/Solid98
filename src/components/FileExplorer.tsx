import { JSX, createSignal, mergeProps, splitProps, For, Show, createMemo, createEffect, onMount } from 'solid-js';
import { cn } from '../utils/cn';
import { StatusBar } from './StatusBar';
import { Button } from './Button';
import { FileExplorerProps, FileItem } from '../types';
import { FileSystemNavigator, defaultFileSystem } from '../utils/fileSystem';
import './FileExplorer.css';

export function FileExplorer(props: FileExplorerProps) {
  const merged = mergeProps(
    {
      width: '100%',
      height: '400px',
      viewMode: 'icons' as const,
      showHidden: false,
      showSearch: true,
      searchPlaceholder: 'Search files and folders...',
      currentPath: '',
      data: [],
      enableNavigation: true,
      showBackForward: true,
      fileSystem: defaultFileSystem
    },
    props
  );

  const [local, others] = splitProps(merged, [
    'data',
    'currentPath', 
    'width',
    'height',
    'viewMode',
    'showHidden',
    'showSearch',
    'searchPlaceholder',
    'enableNavigation',
    'showBackForward',
    'fileSystem',
    'onNavigate',
    'onFileSelect',
    'onFileOpen',
    'onSearchChange',
    'onPathChange',
    'class',
  ]);

  const [selectedItems, setSelectedItems] = createSignal<string[]>([]);
  const [searchTerm, setSearchTerm] = createSignal<string>('');
  const [currentPath, setCurrentPath] = createSignal<string>(local.currentPath || '');
  const [currentData, setCurrentData] = createSignal<FileItem[]>(local.data || []);
  
  // Navigation system
  let navigator: FileSystemNavigator | null = null;
  
  // Initialize navigator if navigation is enabled
  onMount(() => {
    if (local.enableNavigation && local.fileSystem) {
      navigator = new FileSystemNavigator(local.fileSystem);
      
      // Load initial data from file system
      if (!local.data || local.data.length === 0) {
        const items = navigator.navigateTo(local.currentPath || '');
        setCurrentData(items);
      }
    }
  });
  
  // Update data when currentPath changes
  createEffect(() => {
    if (local.enableNavigation && navigator) {
      const items = navigator.getItemsAtPath(currentPath());
      setCurrentData(items);
    } else if (local.data) {
      setCurrentData(local.data);
    }
  });

  // Windows 98 file icons mapping
  const getFileIcon = (item: FileItem): string => {
    if (item.type === 'folder') {
      return '📁'; // Classic folder icon
    }
    
    const ext = item.name.toLowerCase().split('.').pop() || '';
    switch (ext) {
      case 'txt':
      case 'md':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return '🖼️';
      case 'mp3':
      case 'wav':
      case 'wma':
        return '🎵';
      case 'exe':
      case 'com':
        return '⚙️';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📄';
    }
  };

  // Format file size in Windows 98 style
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };

  // Format date in Windows 98 style
  const formatDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit', 
      year: 'numeric'
    });
  };

  // Filter files based on search term
  const filteredData = createMemo(() => {
    const dataToFilter = currentData();
    if (!searchTerm()) return dataToFilter;
    
    const filtered = dataToFilter.filter(item =>
      item.name.toLowerCase().includes(searchTerm().toLowerCase())
    );
    
    // Call search change callback
    local.onSearchChange?.(searchTerm(), filtered);
    return filtered;
  });

  const handleItemClick = (item: FileItem, event: MouseEvent) => {
    const itemKey = `${item.name}_${item.type}`;
    
    if (event.ctrlKey) {
      // Multi-select with Ctrl+click
      setSelectedItems(prev => 
        prev.includes(itemKey) 
          ? prev.filter(id => id !== itemKey)
          : [...prev, itemKey]
      );
    } else {
      // Single select
      setSelectedItems([itemKey]);
    }
    
    local.onFileSelect?.(item, selectedItems());
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      if (local.enableNavigation && navigator) {
        // Use navigation system
        const newPath = navigator.buildPath(currentPath(), item.name);
        const items = navigator.navigateTo(newPath);
        setCurrentPath(newPath);
        setCurrentData(items);
        setSelectedItems([]);
        setSearchTerm('');
        
        // Notify callbacks
        local.onNavigate?.(newPath, item);
        local.onPathChange?.(newPath);
      } else {
        // Legacy behavior
        const newPath = currentPath()
          ? `${currentPath()}/${item.name}`
          : item.name;
        local.onNavigate?.(newPath, item);
      }
    } else {
      // Open file
      local.onFileOpen?.(item);
    }
  };

  const navigateUp = () => {
    const current = currentPath();
    if (!current) return;
    
    if (local.enableNavigation && navigator) {
      const parentPath = navigator.getParentPath(current);
      const items = navigator.navigateTo(parentPath);
      setCurrentPath(parentPath);
      setCurrentData(items);
      setSelectedItems([]);
      setSearchTerm('');
      
      // Create a mock parent folder item for callback
      const parentItem: FileItem = {
        name: '..', 
        type: 'folder',
        path: parentPath
      };
      
      local.onNavigate?.(parentPath, parentItem);
      local.onPathChange?.(parentPath);
    } else {
      // Legacy behavior
      const pathParts = current.split('/').filter(Boolean);
      pathParts.pop();
      const parentPath = pathParts.join('/');
      
      const parentItem: FileItem = {
        name: '..', 
        type: 'folder',
        path: parentPath
      };
      
      local.onNavigate?.(parentPath, parentItem);
      setSelectedItems([]);
      setSearchTerm('');
    }
  };
  
  // Navigation functions
  const navigateBack = () => {
    if (local.enableNavigation && navigator) {
      const result = navigator.goBack();
      if (result) {
        setCurrentPath(result.path);
        setCurrentData(result.items);
        setSelectedItems([]);
        setSearchTerm('');
        
        local.onPathChange?.(result.path);
      }
    }
  };
  
  const navigateForward = () => {
    if (local.enableNavigation && navigator) {
      const result = navigator.goForward();
      if (result) {
        setCurrentPath(result.path);
        setCurrentData(result.items);
        setSelectedItems([]);
        setSearchTerm('');
        
        local.onPathChange?.(result.path);
      }
    }
  };
  
  const canGoBack = () => {
    return local.enableNavigation && navigator ? navigator.canGoBack() : false;
  };
  
  const canGoForward = () => {
    return local.enableNavigation && navigator ? navigator.canGoForward() : false;
  };

  // Breadcrumb navigation functions
  const getBreadcrumbs = createMemo(() => {
    if (!local.enableNavigation || !navigator) return [];
    return navigator.getBreadcrumbs(currentPath());
  });

  const handleBreadcrumbClick = (path: string) => {
    if (local.enableNavigation && navigator) {
      const items = navigator.navigateTo(path);
      setCurrentPath(path);
      setCurrentData(items);
      setSelectedItems([]);
      setSearchTerm('');
      
      local.onNavigate?.(path, { name: '..', type: 'folder', path } as FileItem);
      local.onPathChange?.(path);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedItems([]);
  };

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    // Clear selection when searching
    if (value) {
      setSelectedItems([]);
    }
  };

  return (
    <div 
      class={cn('win98-file-explorer', local.class)}
      style={{ 
        width: local.width, 
        height: local.height,
        border: '2px inset #c0c0c0',
        'background-color': '#c0c0c0'
      }}
      {...others}
    >
      {/* Windows 98 Toolbar */}
      <div class="win98-toolbar">
        <Show when={local.showBackForward && local.enableNavigation}>
          <Button 
            onClick={navigateBack}
            disabled={!canGoBack()}
            class="toolbar-button"
          >
            ⬅ Back
          </Button>
          <Button 
            onClick={navigateForward}
            disabled={!canGoForward()}
            class="toolbar-button"
          >
            ➡ Forward
          </Button>
          
          <div class="toolbar-separator"></div>
        </Show>
        
        <Button 
          onClick={navigateUp} 
          disabled={!currentPath()}
          class="toolbar-button"
        >
          ⬆ Up
        </Button>
        
        <div class="toolbar-separator"></div>
        
        <Button class="toolbar-button">
          📋 Cut
        </Button>
        <Button class="toolbar-button">
          📄 Copy  
        </Button>
        <Button class="toolbar-button">
          📋 Paste
        </Button>
        
        <div class="toolbar-separator"></div>
        
        <Show when={searchTerm()}>
          <Button onClick={clearSearch} class="toolbar-button">
            ❌ Clear Search
          </Button>
        </Show>
      </div>

      {/* Enhanced Address Bar with Breadcrumbs */}
      <div class="win98-address-bar">
        <label for="address-input">Address:</label>
        <div class="address-field">
          <Show when={local.enableNavigation && navigator}>
            <div class="breadcrumb-container">
              <For each={getBreadcrumbs()}>
                {(crumb, index) => (
                  <>
                    <span
                      class="breadcrumb-item"
                      onClick={() => handleBreadcrumbClick(crumb.path)}
                    >
                      {crumb.name}
                    </span>
                    <Show when={index() < getBreadcrumbs().length - 1}>
                      <span class="breadcrumb-separator"> / </span>
                    </Show>
                  </>
                )}
              </For>
            </div>
          </Show>
          <Show when={!local.enableNavigation || !navigator}>
            <input
              id="address-input"
              type="text"
              value={currentPath() || 'My Computer'}
              readonly
              class="address-input"
            />
          </Show>
        </div>
      </div>

      {/* Search Bar */}
      <Show when={local.showSearch}>
        <div class="win98-search-bar">
          <label for="search-input">Search:</label>
          <input
            id="search-input"
            type="text"
            placeholder={local.searchPlaceholder}
            value={searchTerm()}
            onInput={(e) => handleSearchInput(e.currentTarget.value)}
            class="search-input"
          />
        </div>
      </Show>

      {/* File Area */}
      <div class="win98-file-area">
        <Show when={local.viewMode === 'details'}>
          {/* Details View */}
          <table class="details-table">
            <thead>
              <tr class="details-header">
                <th class="col-name">Name</th>
                <th class="col-size">Size</th>
                <th class="col-type">Type</th>
                <th class="col-modified">Modified</th>
              </tr>
            </thead>
            <tbody>
              <For each={filteredData()}>
                {(item) => {
                  const itemKey = `${item.name}_${item.type}`;
                  const isSelected = selectedItems().includes(itemKey);
                  
                  return (
                    <tr
                      class={cn('file-row', isSelected && 'selected')}
                      onClick={(e) => handleItemClick(item, e)}
                      onDblClick={() => handleItemDoubleClick(item)}
                    >
                      <td class="file-name">
                        <span class="file-icon">{getFileIcon(item)}</span>
                        <span class="file-text">{item.name}</span>
                      </td>
                      <td class="file-size">
                        {item.type === 'file' ? formatFileSize(item.size) : ''}
                      </td>
                      <td class="file-type">
                        {item.type === 'folder' ? 'File Folder' : 'File'}
                      </td>
                      <td class="file-modified">
                        {formatDate(item.modified)}
                      </td>
                    </tr>
                  );
                }}
              </For>
            </tbody>
          </table>
        </Show>

        <Show when={local.viewMode === 'icons'}>
          {/* Icons View */}
          <div class="icons-container">
            <For each={filteredData()}>
              {(item) => {
                const itemKey = `${item.name}_${item.type}`;
                const isSelected = selectedItems().includes(itemKey);
                
                return (
                  <div
                    class={cn('file-icon-item', isSelected && 'selected')}
                    onClick={(e) => handleItemClick(item, e)}
                    onDblClick={() => handleItemDoubleClick(item)}
                  >
                    <div class="icon-image">
                      {getFileIcon(item)}
                    </div>
                    <div class="icon-label">
                      {item.name}
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </Show>
      </div>

      {/* Windows 98 Status Bar */}
      <StatusBar 
        fields={[
          searchTerm() 
            ? `${filteredData().length} of ${(local.data || []).length} object(s)`
            : `${(local.data || []).length} object(s)`,
          `${selectedItems().length} selected`,
          searchTerm() ? `Search: "${searchTerm()}"` : (local.currentPath || 'My Computer')
        ]}
        class="win98-status-bar"
      />
    </div>
  );
}