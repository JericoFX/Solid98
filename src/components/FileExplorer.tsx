import { JSX, createSignal, mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { Window } from './Window';
import { StatusBar } from './StatusBar';
import { Button } from './Button';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: number;
  modified?: string;
  icon?: string;
}

interface FileExplorerProps {
  title?: string;
  initialPath?: string;
  class?: string;
  children?: JSX.Element;
}

// Simulated file system structure
const fileSystem: Record<string, FileItem[]> = {
  'C:\\': [
    { id: '1', name: 'My Documents', type: 'folder', modified: '12/15/2024' },
    { id: '2', name: 'My Pictures', type: 'folder', modified: '12/14/2024' },
    { id: '3', name: 'Desktop', type: 'folder', modified: '12/16/2024' },
    { id: '4', name: 'Program Files', type: 'folder', modified: '12/10/2024' },
    { id: '5', name: 'Windows', type: 'folder', modified: '12/08/2024' },
    { id: '6', name: 'readme.txt', type: 'file', size: 2048, modified: '12/15/2024' },
    { id: '7', name: 'config.ini', type: 'file', size: 1024, modified: '12/14/2024' },
    { id: '8', name: 'autoexec.bat', type: 'file', size: 512, modified: '12/13/2024' },
  ],
  'C:\\My Documents\\': [
    { id: '9', name: 'Letters', type: 'folder', modified: '12/10/2024' },
    { id: '10', name: 'Projects', type: 'folder', modified: '12/12/2024' },
    { id: '11', name: 'document1.doc', type: 'file', size: 15360, modified: '12/14/2024' },
    { id: '12', name: 'notes.txt', type: 'file', size: 2048, modified: '12/15/2024' },
  ],
  'C:\\My Pictures\\': [
    { id: '13', name: 'Vacation', type: 'folder', modified: '12/05/2024' },
    { id: '14', name: 'Family', type: 'folder', modified: '12/07/2024' },
    { id: '15', name: 'sunset.jpg', type: 'file', size: 245760, modified: '12/10/2024' },
    { id: '16', name: 'landscape.bmp', type: 'file', size: 1048576, modified: '12/08/2024' },
  ],
  'C:\\Desktop\\': [
    { id: '17', name: 'Shortcut to Calculator', type: 'file', size: 1024, modified: '12/16/2024' },
    { id: '18', name: 'New Folder', type: 'folder', modified: '12/16/2024' },
    { id: '19', name: 'temp.txt', type: 'file', size: 512, modified: '12/16/2024' },
  ],
  'C:\\Program Files\\': [
    { id: '20', name: 'Microsoft Office', type: 'folder', modified: '12/01/2024' },
    { id: '21', name: 'Internet Explorer', type: 'folder', modified: '12/01/2024' },
    { id: '22', name: 'Windows Media Player', type: 'folder', modified: '12/01/2024' },
  ],
  'C:\\Windows\\': [
    { id: '23', name: 'System32', type: 'folder', modified: '12/01/2024' },
    { id: '24', name: 'Temp', type: 'folder', modified: '12/15/2024' },
    { id: '25', name: 'win.ini', type: 'file', size: 1024, modified: '12/08/2024' },
    { id: '26', name: 'system.ini', type: 'file', size: 2048, modified: '12/08/2024' },
  ],
};

export function FileExplorer(props: FileExplorerProps) {
  const merged = mergeProps({
    title: 'My Computer',
    initialPath: 'C:\\'
  }, props);
  
  const [local, others] = splitProps(merged, ['title', 'initialPath', 'class']);
  
  const [currentPath, setCurrentPath] = createSignal(local.initialPath);
  const [selectedItems, setSelectedItems] = createSignal<string[]>([]);
  const [viewMode, setViewMode] = createSignal<'list' | 'details'>('details');
  
  const currentFiles = () => fileSystem[currentPath()] || [];
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };
  
  const handleItemClick = (id: string, event: MouseEvent) => {
    if (event.ctrlKey) {
      setSelectedItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setSelectedItems([id]);
    }
  };
  
  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      const newPath = `${currentPath()}${item.name}\\`;
      if (fileSystem[newPath]) {
        setCurrentPath(newPath);
        setSelectedItems([]);
      }
    }
  };
  
  const navigateUp = () => {
    const pathParts = currentPath().split('\\').filter(Boolean);
    if (pathParts.length > 1) {
      pathParts.pop();
      setCurrentPath(pathParts.join('\\') + '\\');
      setSelectedItems([]);
    }
  };

  return (
    <Window 
      title={local.title} 
      class={cn('file-explorer', local.class)} 
      {...others}
    >
      {/* Toolbar */}
      <div style="display: flex; gap: 4px; padding: 4px; border-bottom: 1px solid #c0c0c0; background: #c0c0c0;">
        <Button onClick={navigateUp} disabled={currentPath() === 'C:\\'}>
          Up
        </Button>
        <Button onClick={() => setViewMode(prev => prev === 'list' ? 'details' : 'list')}>
          {viewMode() === 'list' ? 'Details' : 'List'}
        </Button>
      </div>
      
      {/* Address Bar */}
      <div class="field-row" style="margin: 4px;">
        <label for="address">Address:</label>
        <input 
          id="address" 
          type="text" 
          value={currentPath()} 
          onInput={(e) => setCurrentPath(e.currentTarget.value)}
        />
      </div>
      
      {/* File Area */}
      <div class="sunken-field" style="flex: 1; margin: 4px; padding: 4px; overflow: auto; background: white;">
        <Show when={viewMode() === 'details'}>
          <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
            <thead>
              <tr style="background: #c0c0c0; border-bottom: 1px solid #808080;">
                <th style="text-align: left; padding: 2px 8px; border-right: 1px solid #808080;">Name</th>
                <th style="text-align: left; padding: 2px 8px; border-right: 1px solid #808080;">Size</th>
                <th style="text-align: left; padding: 2px 8px; border-right: 1px solid #808080;">Type</th>
                <th style="text-align: left; padding: 2px 8px;">Modified</th>
              </tr>
            </thead>
            <tbody>
              <For each={currentFiles()}>
                {(item) => (
                  <tr 
                    class={cn(
                      'file-item',
                      selectedItems().includes(item.id) && 'selected'
                    )}
                    style={selectedItems().includes(item.id) ? 
                      "background: #0000ff; color: white;" : 
                      "background: transparent;"
                    }
                    onClick={(e) => handleItemClick(item.id, e)}
                    onDblClick={() => handleItemDoubleClick(item)}
                  >
                    <td style="padding: 1px 8px; display: flex; align-items: center; gap: 4px;">
                      <span style={`font-family: 'MS Sans Serif', sans-serif; font-size: 16px; ${
                        item.type === 'folder' ? 'color: #ffff00;' : 'color: #c0c0c0;'
                      }`}>
                        {item.type === 'folder' ? '📁' : '📄'}
                      </span>
                      {item.name}
                    </td>
                    <td style="padding: 1px 8px;">
                      {item.type === 'file' ? formatFileSize(item.size) : ''}
                    </td>
                    <td style="padding: 1px 8px;">
                      {item.type === 'folder' ? 'File Folder' : 'File'}
                    </td>
                    <td style="padding: 1px 8px;">{item.modified}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Show>
        
        <Show when={viewMode() === 'list'}>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 8px;">
            <For each={currentFiles()}>
              {(item) => (
                <div 
                  class={cn(
                    'file-item-icon',
                    selectedItems().includes(item.id) && 'selected'
                  )}
                  style={`
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    width: 60px; 
                    padding: 4px; 
                    cursor: pointer;
                    ${selectedItems().includes(item.id) ? 
                      'background: #0000ff; color: white;' : 
                      'background: transparent;'
                    }
                  `}
                  onClick={(e) => handleItemClick(item.id, e)}
                  onDblClick={() => handleItemDoubleClick(item)}
                >
                  <span style={`font-size: 32px; ${
                    item.type === 'folder' ? 'color: #ffff00;' : 'color: #c0c0c0;'
                  }`}>
                    {item.type === 'folder' ? '📁' : '📄'}
                  </span>
                  <span style="font-size: 11px; text-align: center; word-wrap: break-word; width: 100%;">
                    {item.name}
                  </span>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
      
      <StatusBar fields={[
        `${currentFiles().length} object(s)`,
        `${selectedItems().length} selected`,
        currentPath()
      ]} />
    </Window>
  );
}