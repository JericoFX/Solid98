import { createSignal, mergeProps, splitProps, For, Show, createMemo } from 'solid-js';
import { cn } from '../utils/cn';
import { FileExplorerProps, FileItem } from '../types';
import './FileExplorer.css';

export function FileExplorer(props: FileExplorerProps) {
  const merged = mergeProps(
    {
      viewMode: 'icons' as const,
      showHidden: false,
      showSearch: false,
      searchPlaceholder: 'Search files...',
      currentPath: '',
      data: [],
      width: '100%',
      height: '500px'
    },
    props
  );

  const [local, others] = splitProps(merged, [
    'data',
    'currentPath',
    'viewMode',
    'showHidden',
    'showSearch',
    'searchPlaceholder',
    'width',
    'height',
    'onNavigate',
    'onFileSelect',
    'onFileOpen',
    'onSearchChange',
    'class'
  ]);

  const [selectedItems, setSelectedItems] = createSignal<string[]>([]);
  const [searchTerm, setSearchTerm] = createSignal<string>('');

  // Get file icon based on type and extension (Windows 98 style)
  const getFileIcon = (item: FileItem): string => {
    if (item.icon) return item.icon;
    
    if (item.type === 'folder') {
      // Closed folder icon (Windows 98 style)
      return '🗁'; // Better than 📁 for Windows 98 look
    }
    
    const ext = item.name.toLowerCase().split('.').pop() || '';
    switch (ext) {
      case 'txt':
      case 'md':
      case 'log':
        return '🗒'; // Text document icon
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return '🖻'; // Image file icon
      case 'exe':
      case 'com':
      case 'bat':
        return '⚙'; // Application icon (no variation selector)
      case 'doc':
      case 'docx':
        return '🗄'; // Document icon
      case 'xls':
      case 'xlsx':
        return '🗃'; // Spreadsheet icon
      case 'sys':
        return '⚠'; // System file icon
      default:
        return '🗋'; // Generic document icon
    }
  };

  // Format file size
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };

  // Format date
  const formatDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Filter files based on search and hidden settings
  const filteredData = createMemo(() => {
    let filtered = local.data || [];
    
    // Filter hidden files
    if (!local.showHidden) {
      filtered = filtered.filter(item => !item.name.startsWith('.'));
    }
    
    // Filter by search term
    if (searchTerm()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm().toLowerCase())
      );
      
      // Notify search change
      local.onSearchChange?.(searchTerm(), filtered);
    }
    
    return filtered;
  });

  // Get breadcrumb items from current path
  const getBreadcrumbs = createMemo(() => {
    if (!local.currentPath) return [{ name: 'My Computer', path: '' }];
    
    const parts = local.currentPath.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'My Computer', path: '' }];
    
    let currentPath = '';
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      breadcrumbs.push({ name: part, path: currentPath });
    }
    
    return breadcrumbs;
  });

  // Handle item click for selection
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

  // Handle item double-click for navigation/opening
  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      // Navigate to folder
      const newPath = local.currentPath 
        ? `${local.currentPath}/${item.name}`
        : item.name;
      local.onNavigate?.(newPath, item);
    } else {
      // Open file
      local.onFileOpen?.(item);
    }
  };

  // Navigation handlers
  const navigateUp = () => {
    if (!local.currentPath) return;
    
    const parts = local.currentPath.split('/').filter(Boolean);
    parts.pop();
    const parentPath = parts.join('/');
    
    const parentItem: FileItem = {
      name: '..',
      type: 'folder',
      path: parentPath
    };
    
    local.onNavigate?.(parentPath, parentItem);
  };

  const handleBreadcrumbClick = (path: string) => {
    const breadcrumbItem: FileItem = {
      name: path || 'My Computer',
      type: 'folder',
      path
    };
    
    local.onNavigate?.(path, breadcrumbItem);
  };

  // Search handlers
  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div 
      class={cn('xp-file-explorer', local.class)}
      style={{ 
        width: local.width, 
        height: local.height
      }}
      {...others}
    >
      {/* Address Bar */}
      <div class="xp-explorer-address-bar">
        <div class="xp-explorer-nav-buttons">
          <button 
            class="xp-explorer-nav-button"
            onClick={navigateUp}
            disabled={!local.currentPath}
          >
            ⬆ Up
          </button>
        </div>
        <div class="xp-explorer-breadcrumb">
          <For each={getBreadcrumbs()}>
            {(crumb, index) => (
              <>
                <span
                  class={cn(
                    'xp-explorer-breadcrumb-item',
                    index() === getBreadcrumbs().length - 1 && 'current'
                  )}
                  onClick={() => handleBreadcrumbClick(crumb.path)}
                >
                  {crumb.name}
                </span>
                <Show when={index() < getBreadcrumbs().length - 1}>
                  <span class="xp-explorer-breadcrumb-separator"> / </span>
                </Show>
              </>
            )}
          </For>
        </div>
      </div>
      
      {/* Search Bar (conditional) */}
      <Show when={local.showSearch}>
        <div class="xp-explorer-search-bar">
          <input
            class="xp-explorer-search-input"
            type="text"
            placeholder={local.searchPlaceholder}
            value={searchTerm()}
            onInput={(e) => handleSearchInput(e.currentTarget.value)}
          />
          <Show when={searchTerm()}>
            <button 
              class="xp-explorer-search-clear"
              onClick={clearSearch}
            >
              ×
            </button>
          </Show>
        </div>
      </Show>
      
      {/* Content Area */}
      <div class="xp-explorer-content">
        <Show when={local.viewMode === 'icons'}>
          {/* Icons View */}
          <div class="xp-explorer-icons-view">
            <For each={filteredData()}>
              {(item) => {
                const itemKey = `${item.name}_${item.type}`;
                const isSelected = selectedItems().includes(itemKey);
                
                return (
                  <div
                    class={cn(
                      'xp-explorer-item',
                      isSelected && 'xp-explorer-item-selected'
                    )}
                    onClick={(e) => handleItemClick(item, e)}
                    onDblClick={() => handleItemDoubleClick(item)}
                  >
                    <div class="xp-explorer-item-icon">
                      {getFileIcon(item)}
                    </div>
                    <div class="xp-explorer-item-name">
                      {item.name}
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </Show>
        
        <Show when={local.viewMode === 'details'}>
          {/* Details View */}
          <div class="xp-explorer-details-view">
            <div class="xp-explorer-details-header">
              <div class="xp-explorer-details-col">Name</div>
              <div class="xp-explorer-details-col">Size</div>
              <div class="xp-explorer-details-col">Type</div>
              <div class="xp-explorer-details-col">Modified</div>
            </div>
            <div class="xp-explorer-details-content">
              <For each={filteredData()}>
                {(item) => {
                  const itemKey = `${item.name}_${item.type}`;
                  const isSelected = selectedItems().includes(itemKey);
                  
                  return (
                    <div
                      class={cn(
                        'xp-explorer-details-row',
                        isSelected && 'xp-explorer-details-row-selected'
                      )}
                      onClick={(e) => handleItemClick(item, e)}
                      onDblClick={() => handleItemDoubleClick(item)}
                    >
                      <div class="xp-explorer-details-cell">
                        <span class="xp-explorer-item-icon">
                          {getFileIcon(item)}
                        </span>
                        <span class="xp-explorer-item-name">
                          {item.name}
                        </span>
                      </div>
                      <div class="xp-explorer-details-cell">
                        {item.type === 'file' ? formatFileSize(item.size) : ''}
                      </div>
                      <div class="xp-explorer-details-cell">
                        {item.type === 'folder' ? 'File Folder' : 'File'}
                      </div>
                      <div class="xp-explorer-details-cell">
                        {formatDate(item.modified)}
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </Show>
      </div>
      
      {/* Status Bar */}
      <div class="xp-explorer-status">
        <div class="xp-explorer-status-left">
          {searchTerm() 
            ? `${filteredData().length} of ${(local.data || []).length} object(s)`
            : `${(local.data || []).length} object(s)`
          }
        </div>
        <div class="xp-explorer-status-right">
          {selectedItems().length > 0 && `${selectedItems().length} selected`}
          {searchTerm() && ` | Search: "${searchTerm()}"`}
        </div>
      </div>
    </div>
  );
}