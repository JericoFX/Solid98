import { Component, createSignal } from 'solid-js';
import { Window, FileExplorer, StatusBar, Button } from '../../index';
import { FileItem } from '../../types';

export const FileManagerDemo: Component = () => {
  const [currentPath, setCurrentPath] = createSignal('');
  const [selectedFiles, setSelectedFiles] = createSignal<string[]>([]);
  const [viewMode, setViewMode] = createSignal<'icons' | 'details'>('icons');

  // Sample file system data
  const fileSystemData: Record<string, FileItem[]> = {
    '': [ // Root (My Computer)
      { name: 'Documents', type: 'folder', modified: new Date('2024-01-15') },
      { name: 'Pictures', type: 'folder', modified: new Date('2024-01-10') },
      { name: 'Program Files', type: 'folder', modified: new Date('2024-01-01') },
      { name: 'readme.txt', type: 'file', size: 1024, modified: new Date('2024-01-08') },
      { name: 'autoexec.bat', type: 'file', size: 256, modified: new Date('1998-12-07') }
    ],
    'Documents': [
      { name: 'Letters', type: 'folder', modified: new Date('2024-01-12') },
      { name: 'Projects', type: 'folder', modified: new Date('2024-01-14') },
      { name: 'report.doc', type: 'file', size: 15360, modified: new Date('2024-01-08') },
      { name: 'notes.txt', type: 'file', size: 2048, modified: new Date('2024-01-10') }
    ],
    'Documents/Letters': [
      { name: 'to_mom.txt', type: 'file', size: 512, modified: new Date('2024-01-05') },
      { name: 'business.doc', type: 'file', size: 2048, modified: new Date('2024-01-03') }
    ],
    'Pictures': [
      { name: 'Vacation', type: 'folder', modified: new Date('2024-01-08') },
      { name: 'sunset.jpg', type: 'file', size: 1024000, modified: new Date('2024-01-07') },
      { name: 'beach.png', type: 'file', size: 2048000, modified: new Date('2024-01-05') }
    ]
  };

  // Get current directory data
  const getCurrentData = () => fileSystemData[currentPath()] || [];

  const handleNavigate = (path: string, _item: FileItem) => {
    setCurrentPath(path);
    setSelectedFiles([]); // Clear selection when navigating
  };

  const handleFileSelect = (_item: FileItem, selectedItems: string[]) => {
    setSelectedFiles(selectedItems);
  };

  const handleFileOpen = (item: FileItem) => {
    if (item.type === 'folder') {
      const newPath = currentPath() ? `${currentPath()}/${item.name}` : item.name;
      setCurrentPath(newPath);
    } else {
      alert(`Opening file: ${item.name}\n\nSize: ${item.size ? `${Math.round(item.size / 1024)} KB` : 'Unknown'}\nModified: ${item.modified?.toLocaleDateString()}`);
    }
  };

  const handleSearchChange = (searchTerm: string, filteredItems: FileItem[]) => {
    console.log(`Search: "${searchTerm}" found ${filteredItems.length} items`);
  };

  return (
    <div style={{ width: '600px', height: '500px' }}>
      <Window title={`${currentPath() || 'My Computer'} - File Explorer`} active>
        {/* Toolbar */}
        <div style={{ 
          padding: '4px 8px', 
          'border-bottom': '1px solid #808080',
          display: 'flex',
          'align-items': 'center',
          gap: '8px'
        }}>
          <Button 
            onClick={() => setViewMode(viewMode() === 'icons' ? 'details' : 'icons')}
            style={{ 'font-size': '10px', padding: '2px 6px' }}
          >
            {viewMode() === 'icons' ? '📋 Details' : '📁 Icons'}
          </Button>
          <span style={{ 'font-size': '10px', color: '#666' }}>
            {getCurrentData().length} item{getCurrentData().length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* File Explorer */}
        <FileExplorer
          data={getCurrentData()}
          currentPath={currentPath()}
          viewMode={viewMode()}
          showSearch={true}
          searchPlaceholder="Search files and folders..."
          height="380px"
          onNavigate={handleNavigate}
          onFileSelect={handleFileSelect}
          onFileOpen={handleFileOpen}
          onSearchChange={handleSearchChange}
        />

        {/* Status Bar */}
        <StatusBar fields={[
          `${selectedFiles().length} item${selectedFiles().length !== 1 ? 's' : ''} selected`,
          `${getCurrentData().length} total`,
          'Ready'
        ]} />
      </Window>
    </div>
  );
};