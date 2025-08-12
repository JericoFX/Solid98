import { FileItem, FileSystemStructure } from '../types';

/**
 * Default Windows 98-style file system structure
 * Makes it easy for developers to create realistic folder structures
 */
export const defaultFileSystem: FileSystemStructure = {
  'My Computer': {
    'My Documents': [
      { name: 'Letters', type: 'folder', modified: new Date('1998-12-15') },
      { name: 'Projects', type: 'folder', modified: new Date('1998-11-20') },
      { name: 'Resume.doc', type: 'file', size: 28672, modified: new Date('1998-12-10') },
      { name: 'Budget.xls', type: 'file', size: 16384, modified: new Date('1998-11-25') },
      { name: 'Notes.txt', type: 'file', size: 2048, modified: new Date('1998-12-01') },
    ],
    'My Pictures': [
      { name: 'Vacation', type: 'folder', modified: new Date('1998-08-15') },
      { name: 'Family', type: 'folder', modified: new Date('1998-07-10') },
      { name: 'Sunset.bmp', type: 'file', size: 786432, modified: new Date('1998-09-05') },
      { name: 'Portrait.jpg', type: 'file', size: 245760, modified: new Date('1998-08-20') },
    ],
    'Desktop': [
      { name: 'My Computer.lnk', type: 'file', size: 512, modified: new Date('1998-12-07') },
      { name: 'Recycle Bin.lnk', type: 'file', size: 512, modified: new Date('1998-12-07') },
      { name: 'Internet Explorer.lnk', type: 'file', size: 512, modified: new Date('1998-12-07') },
      { name: 'Temp Files', type: 'folder', modified: new Date('1998-12-16') },
      { name: 'Shortcuts', type: 'folder', modified: new Date('1998-11-30') },
    ],
    'Program Files': [
      { name: 'Microsoft Office', type: 'folder', modified: new Date('1998-10-15') },
      { name: 'Internet Explorer', type: 'folder', modified: new Date('1998-12-07') },
      { name: 'Windows Media Player', type: 'folder', modified: new Date('1998-11-10') },
      { name: 'Adobe', type: 'folder', modified: new Date('1998-09-20') },
      { name: 'Common Files', type: 'folder', modified: new Date('1998-12-07') },
    ],
    'Windows': [
      { name: 'System32', type: 'folder', modified: new Date('1998-12-07') },
      { name: 'System', type: 'folder', modified: new Date('1998-12-07') },
      { name: 'Fonts', type: 'folder', modified: new Date('1998-11-15') },
      { name: 'Temp', type: 'folder', modified: new Date('1998-12-16') },
      { name: 'Help', type: 'folder', modified: new Date('1998-12-07') },
      { name: 'win.ini', type: 'file', size: 4096, modified: new Date('1998-12-07') },
      { name: 'system.ini', type: 'file', size: 2048, modified: new Date('1998-12-07') },
    ]
  },
  'My Computer/My Documents/Letters': [
    { name: 'Cover Letter.doc', type: 'file', size: 12288, modified: new Date('1998-12-01') },
    { name: 'Thank You.doc', type: 'file', size: 8192, modified: new Date('1998-11-15') },
    { name: 'Business', type: 'folder', modified: new Date('1998-10-20') },
    { name: 'Personal', type: 'folder', modified: new Date('1998-11-10') },
  ],
  'My Computer/My Documents/Projects': [
    { name: 'Website', type: 'folder', modified: new Date('1998-11-20') },
    { name: 'Database', type: 'folder', modified: new Date('1998-10-15') },
    { name: 'Report.doc', type: 'file', size: 45056, modified: new Date('1998-11-18') },
    { name: 'Presentation.ppt', type: 'file', size: 1048576, modified: new Date('1998-11-22') },
  ],
  'My Computer/My Pictures/Vacation': [
    { name: 'Beach.jpg', type: 'file', size: 512000, modified: new Date('1998-08-10') },
    { name: 'Mountains.jpg', type: 'file', size: 384000, modified: new Date('1998-08-12') },
    { name: 'Hotel.jpg', type: 'file', size: 298000, modified: new Date('1998-08-15') },
  ],
  'My Computer/My Pictures/Family': [
    { name: 'Birthday.jpg', type: 'file', size: 445000, modified: new Date('1998-07-05') },
    { name: 'Wedding.jpg', type: 'file', size: 678000, modified: new Date('1998-06-20') },
    { name: 'Kids', type: 'folder', modified: new Date('1998-07-10') },
  ]
};

/**
 * Navigation utilities for file system
 */
export class FileSystemNavigator {
  private fileSystem: FileSystemStructure;
  private history: string[] = [];
  private currentIndex: number = -1;

  constructor(fileSystem: FileSystemStructure = defaultFileSystem) {
    this.fileSystem = fileSystem;
  }

  /**
   * Get files and folders for a given path
   */
  getItemsAtPath(path: string): FileItem[] {
    if (!path || path === '') {
      // Root level - navigate to 'My Computer' contents directly
      const myComputerPath = 'My Computer';
      if (this.fileSystem[myComputerPath]) {
        const myComputerContents = this.fileSystem[myComputerPath];
        if (typeof myComputerContents === 'object' && !Array.isArray(myComputerContents)) {
          // It's a nested structure, return the folder names
          return Object.keys(myComputerContents).map(name => ({
            name,
            type: 'folder' as const,
            modified: new Date('1998-12-07')
          }));
        }
      }
      
      // Fallback: show top-level items
      const rootKeys = Object.keys(this.fileSystem);
      return rootKeys.map(name => ({
        name,
        type: 'folder' as const,
        modified: new Date('1998-12-07')
      }));
    }

    const items = this.fileSystem[path];
    
    if (Array.isArray(items)) {
      return items;
    } else if (typeof items === 'object') {
      // It's a nested structure, return the folder names
      return Object.keys(items).map(name => ({
        name,
        type: 'folder' as const,
        modified: new Date('1998-12-07')
      }));
    }

    return [];
  }

  /**
   * Navigate to a path and update history
   */
  navigateTo(path: string): FileItem[] {
    // Add to history if it's a new navigation (not back/forward)
    if (this.currentIndex === -1 || this.history[this.currentIndex] !== path) {
      // Remove any forward history
      this.history = this.history.slice(0, this.currentIndex + 1);
      this.history.push(path);
      this.currentIndex = this.history.length - 1;
    }
    
    return this.getItemsAtPath(path);
  }

  /**
   * Go back in history
   */
  goBack(): { path: string; items: FileItem[] } | null {
    if (this.canGoBack()) {
      this.currentIndex--;
      const path = this.history[this.currentIndex];
      return {
        path,
        items: this.getItemsAtPath(path)
      };
    }
    return null;
  }

  /**
   * Go forward in history
   */
  goForward(): { path: string; items: FileItem[] } | null {
    if (this.canGoForward()) {
      this.currentIndex++;
      const path = this.history[this.currentIndex];
      return {
        path,
        items: this.getItemsAtPath(path)
      };
    }
    return null;
  }

  /**
   * Can we go back?
   */
  canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Can we go forward?
   */
  canGoForward(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * Get parent path
   */
  getParentPath(path: string): string {
    if (!path || path === '') return '';
    
    const parts = path.split('/');
    parts.pop();
    return parts.join('/');
  }

  /**
   * Get display name for path
   */
  getDisplayName(path: string): string {
    if (!path || path === '') return 'My Computer';
    
    const parts = path.split('/');
    return parts[parts.length - 1];
  }

  /**
   * Check if path exists
   */
  pathExists(path: string): boolean {
    if (!path || path === '') return true;
    
    return this.fileSystem[path] !== undefined;
  }

  /**
   * Build path from parts
   */
  buildPath(...parts: string[]): string {
    return parts.filter(Boolean).join('/');
  }

  /**
   * Get breadcrumb navigation for a path
   */
  getBreadcrumbs(path: string): Array<{ name: string; path: string }> {
    if (!path || path === '') {
      return [{ name: 'My Computer', path: '' }];
    }

    // Handle paths that start with 'My Computer'
    let pathToParse = path;
    const breadcrumbs: Array<{ name: string; path: string }> = [
      { name: 'My Computer', path: '' }
    ];

    if (path.startsWith('My Computer/')) {
      pathToParse = path.substring('My Computer/'.length);
    } else if (path === 'My Computer') {
      return breadcrumbs;
    }

    let currentPath = '';
    const parts = pathToParse.split('/');
    for (const part of parts) {
      if (part) {
        currentPath = currentPath ? `My Computer/${currentPath}/${part}` : `My Computer/${part}`;
        breadcrumbs.push({ name: part, path: currentPath });
      }
    }

    return breadcrumbs;
  }
}

/**
 * Helper function to create custom file systems easily
 */
export function createFileSystem(structure: any): FileSystemStructure {
  const result: FileSystemStructure = {};
  
  function processStructure(obj: any, basePath: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = basePath ? `${basePath}/${key}` : key;
      
      if (Array.isArray(value)) {
        // It's a file list
        result[currentPath] = value as FileItem[];
      } else if (typeof value === 'object' && value !== null) {
        // It's a nested structure
        result[currentPath] = {};
        processStructure(value, currentPath);
      }
    }
  }
  
  processStructure(structure);
  return result;
}