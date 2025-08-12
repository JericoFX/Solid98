# Solid98 - SolidJS + 98.css Components

> SolidJS wrapper components for the 98.css Windows 98 UI framework

[![npm version](https://badge.fury.io/js/solid-98css.svg)](https://badge.fury.io/js/solid-98css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Demo

🎮 **[Live Playground](https://jericofx.github.io/solid98/)**

> **Note**: The playground automatically loads 98.css styles via both auto-import and CDN fallback to ensure proper Windows 98 styling.

## Features

- 🪟 **Windows 98 Aesthetic** - Pixel-perfect recreation of classic Windows 98 UI
- ⚡ **SolidJS Integration** - Type-safe, reactive components built for SolidJS
- 🎨 **Framework Agnostic CSS** - Built on top of the excellent 98.css framework
- 📦 **Tree Shakeable** - Import only the components you need
- 🔧 **TypeScript Support** - Full TypeScript definitions included
- 🚀 **Zero Dependencies** - Only requires SolidJS as peer dependency
- ✨ **Auto-styling** - 98.css automatically imported with the library
- 🔄 **CDN Fallback** - Playground includes CDN fallback for development

## Installation

```bash
npm install solid-98css solid-js
# or
bun add solid-98css solid-js
# or
yarn add solid-98css solid-js
```

## Quick Start

```tsx
import { Window, Button, StatusBar, FileExplorer } from 'solid-98css';

function MyApp() {
  return (
    <Window title='My Application'>
      <p>Welcome to the Windows 98 era!</p>
      <Button variant='default'>Click me!</Button>
      <StatusBar>Ready</StatusBar>
      
      {/* New: Full-featured Windows 98 file explorer */}
      <FileExplorer enableNavigation={true} viewMode="details" />
    </Window>
  );
}
```

## Available Components

### Window Components

- `Window` - Main window container with title bar
- `WindowHeader` - Customizable window header with controls
- `StatusBar` - Bottom status bar with customizable fields

### Form Controls

- `Button` - Standard Windows 98 buttons
- `Checkbox` - Checkbox with label
- `Radio` - Radio button with label
- `Select` - Dropdown selection
- `Slider` - Range slider (horizontal/vertical)

### Layout Components

- `FieldRow` - Form field layout (horizontal/stacked)
- `SunkenPanel` - Recessed panel container
- `ProgressBar` - Progress indicator (normal/segmented)

### Advanced Components

- `TreeView` - Hierarchical tree navigation
- `Tabs` / `Tab` - Tab navigation system
- `Table` - Sortable data table with selection support
- `Modal` - Modal dialog windows
- `Alert` - System alert dialogs (Error, Warning, Info, Confirm)

### File System Components

- `FileExplorer` - Windows 98-style file manager with full navigation
- `NavigableFileExplorer` - Enhanced file explorer in a window container
- `ImageViewer` - Image gallery viewer with Windows 98 styling
- `Notepad` - Text editor application with Windows 98 interface

## Component Examples

### Window with Controls

```tsx
<Window>
  <WindowHeader
    title='My App'
    showHelp
    onClose={() => console.log('Close!')}
    onMinimize={() => console.log('Minimize!')}
    onMaximize={() => console.log('Maximize!')}
    onHelp={() => console.log('Help!')}
  />

  <div style={{ padding: '10px' }}>
    <p>Window content goes here</p>
  </div>

  <StatusBar fields={['Ready', 'NUM', 'CAPS']} />
</Window>
```

### Form Controls

```tsx
<FieldRow>
  <Checkbox
    id="check1"
    label="Enable feature"
    checked={enabled()}
    onChange={(e) => setEnabled(e.target.checked)}
  />
</FieldRow>

<FieldRow>
  <Radio name="option" value="1" label="Option 1" />
  <Radio name="option" value="2" label="Option 2" />
</FieldRow>

<FieldRow>
  <Select options={[
    { value: 'opt1', label: 'First Option' },
    { value: 'opt2', label: 'Second Option', selected: true }
  ]} />
</FieldRow>
```

### Progress and Sliders

```tsx
<ProgressBar value={75} max={100} />
<ProgressBar value={50} segmented />

<Slider
  value={volume()}
  onInput={(e) => setVolume(e.target.value)}
/>

<Slider vertical boxIndicator value={25} />
```

### FileExplorer - Windows 98 File Manager

The `FileExplorer` component provides a complete Windows 98-style file manager with navigation, breadcrumbs, search, and multiple view modes.

#### Basic Usage

```tsx
import { FileExplorer, Window } from 'solid-98css';

function MyFileManager() {
  return (
    <Window title="My Computer - File Explorer">
      <FileExplorer
        enableNavigation={true}
        viewMode="details"
        height="400px"
        onNavigate={(path, item) => console.log('Navigated to:', path)}
        onFileOpen={(item) => console.log('Opening:', item.name)}
      />
    </Window>
  );
}
```

#### With Custom File System

```tsx
import { FileExplorer, createFileSystem } from 'solid-98css';

const customFileSystem = createFileSystem({
  'My Projects': {
    'Web Apps': [
      { name: 'solid-app', type: 'folder', modified: new Date() },
      { name: 'react-app', type: 'folder', modified: new Date() },
      { name: 'package.json', type: 'file', size: 1024, modified: new Date() }
    ],
    'Documentation': [
      { name: 'README.md', type: 'file', size: 2048, modified: new Date() },
      { name: 'API.md', type: 'file', size: 4096, modified: new Date() }
    ]
  }
});

function ProjectExplorer() {
  return (
    <FileExplorer
      fileSystem={customFileSystem}
      enableNavigation={true}
      currentPath=""
      viewMode="icons"
      showSearch={true}
      showBackForward={true}
    />
  );
}
```

#### Navigation Features

The FileExplorer includes complete navigation functionality:

- **🔙 Back/Forward Buttons** - Browser-style navigation with history
- **⬆️ Up Button** - Navigate to parent directory  
- **🍞 Breadcrumb Address Bar** - Click any path segment to navigate quickly
- **🔍 Search Bar** - Filter files and folders in current directory
- **📁 Folder Navigation** - Double-click folders to navigate into them
- **🖱️ File Selection** - Single-click to select, Ctrl+click for multi-select

#### View Modes

```tsx
// Details view (table format)
<FileExplorer viewMode="details" />

// Icons view (grid format)  
<FileExplorer viewMode="icons" />
```

#### Event Handling

```tsx
<FileExplorer
  onNavigate={(path, item) => {
    console.log(`Navigated to: ${path || 'My Computer'}`);
    console.log('Folder item:', item);
  }}
  
  onFileSelect={(item, selectedItems) => {
    console.log('Selected file:', item.name);
    console.log('All selected:', selectedItems);
  }}
  
  onFileOpen={(item) => {
    if (item.type === 'folder') {
      console.log('Opening folder:', item.name);
    } else {
      console.log('Opening file:', item.name);
      // Handle file opening logic
    }
  }}
  
  onSearchChange={(searchTerm, filteredItems) => {
    console.log(`Search: "${searchTerm}" found ${filteredItems.length} items`);
  }}
  
  onPathChange={(newPath) => {
    console.log('Current path changed to:', newPath);
  }}
/>
```

#### Pre-built File System Structure

The default file system includes a realistic Windows 98 structure:

```
My Computer/
├── My Documents/
│   ├── Letters/
│   │   ├── Cover Letter.doc
│   │   ├── Thank You.doc
│   │   ├── Business/
│   │   └── Personal/
│   ├── Projects/
│   │   ├── Website/
│   │   ├── Database/  
│   │   ├── Report.doc
│   │   └── Presentation.ppt
│   ├── Resume.doc
│   ├── Budget.xls
│   └── Notes.txt
├── My Pictures/
│   ├── Vacation/
│   │   ├── Beach.jpg
│   │   ├── Mountains.jpg
│   │   └── Hotel.jpg
│   ├── Family/
│   │   ├── Birthday.jpg
│   │   ├── Wedding.jpg
│   │   └── Kids/
│   ├── Sunset.bmp
│   └── Portrait.jpg
├── Desktop/
│   ├── My Computer.lnk
│   ├── Recycle Bin.lnk
│   ├── Internet Explorer.lnk
│   ├── Temp Files/
│   └── Shortcuts/
├── Program Files/
│   ├── Microsoft Office/
│   ├── Internet Explorer/
│   ├── Windows Media Player/
│   ├── Adobe/
│   └── Common Files/
└── Windows/
    ├── System32/
    ├── System/
    ├── Fonts/
    ├── Temp/
    ├── Help/
    ├── win.ini
    └── system.ini
```

### NavigableFileExplorer - Complete File Manager Window

A complete file manager application with window chrome and enhanced navigation:

```tsx
import { NavigableFileExplorer } from 'solid-98css';

function FileManagerApp() {
  const [explorerWindows, setExplorerWindows] = createSignal([]);
  
  const openNewWindow = (title, path) => {
    setExplorerWindows(prev => [...prev, {
      id: Date.now(),
      title,
      initialPath: path,
      active: true
    }]);
  };

  return (
    <div>
      <button onClick={() => openNewWindow('My Documents', 'My Computer/My Documents')}>
        Open My Documents
      </button>
      
      {explorerWindows().map(window => (
        <NavigableFileExplorer
          key={window.id}
          title={window.title}
          initialPath={window.initialPath}
          width={600}
          height={500}
          active={window.active}
          resizable={true}
          onClose={() => closeWindow(window.id)}
          onFileOpen={(item) => handleFileOpen(item)}
          onPathChange={(path) => console.log('Path:', path)}
        />
      ))}
    </div>
  );
}
```

## API Reference

### Window Props

| Prop        | Type      | Default | Description           |
| ----------- | --------- | ------- | --------------------- |
| `title`     | `string`  | -       | Window title          |
| `active`    | `boolean` | `true`  | Window active state   |
| `resizable` | `boolean` | `false` | Enable resize handles |

### Button Props

| Prop       | Type                    | Default    | Description          |
| ---------- | ----------------------- | ---------- | -------------------- |
| `variant`  | `'default' \| 'normal'` | `'normal'` | Button style variant |
| `disabled` | `boolean`               | `false`    | Disabled state       |

### Slider Props

| Prop           | Type      | Default | Description          |
| -------------- | --------- | ------- | -------------------- |
| `vertical`     | `boolean` | `false` | Vertical orientation |
| `boxIndicator` | `boolean` | `false` | Box-style indicator  |
| `value`        | `number`  | -       | Current value        |
| `min`          | `number`  | `0`     | Minimum value        |
| `max`          | `number`  | `100`   | Maximum value        |

### FileExplorer Props

| Prop                | Type                    | Default          | Description                          |
| ------------------- | ----------------------- | ---------------- | ------------------------------------ |
| `enableNavigation`  | `boolean`               | `true`           | Enable file system navigation        |
| `viewMode`          | `'details' \| 'icons'`  | `'icons'`        | Display mode for files and folders   |
| `showSearch`        | `boolean`               | `true`           | Show search bar                      |
| `showBackForward`   | `boolean`               | `true`           | Show back/forward navigation buttons |
| `currentPath`       | `string`                | `''`             | Current directory path               |
| `data`              | `FileItem[]`            | `[]`             | Static file data (when navigation disabled) |
| `fileSystem`        | `FileSystemStructure`   | `defaultFileSystem` | File system structure for navigation |
| `width`             | `string \| number`      | `'100%'`         | Component width                      |
| `height`            | `string \| number`      | `'400px'`        | Component height                     |
| `searchPlaceholder` | `string`                | `'Search...'`    | Search input placeholder text        |
| `showHidden`        | `boolean`               | `false`          | Show hidden files and folders        |

### FileExplorer Events

| Event             | Type                                      | Description                           |
| ----------------- | ----------------------------------------- | ------------------------------------- |
| `onNavigate`      | `(path: string, item: FileItem) => void` | Fired when navigating to a folder     |
| `onFileSelect`    | `(item: FileItem, selected: string[]) => void` | Fired when selecting files/folders |
| `onFileOpen`      | `(item: FileItem) => void`                | Fired when opening a file/folder      |
| `onSearchChange`  | `(term: string, filtered: FileItem[]) => void` | Fired when search term changes     |
| `onPathChange`    | `(path: string) => void`                  | Fired when current path changes       |

### NavigableFileExplorer Props

| Prop           | Type      | Default          | Description                    |
| -------------- | --------- | ---------------- | ------------------------------ |
| `title`        | `string`  | `'File Explorer'`| Window title                   |
| `initialPath`  | `string`  | `''`             | Initial directory path         |
| `width`        | `number`  | `600`            | Window width                   |
| `height`       | `number`  | `500`            | Window height                  |
| `active`       | `boolean` | `true`           | Window active state            |
| `resizable`    | `boolean` | `true`           | Enable window resizing         |
| `showToolbar`  | `boolean` | `true`           | Show navigation toolbar        |
| `showAddressBar` | `boolean` | `true`         | Show breadcrumb address bar    |
| `showStatusBar`  | `boolean` | `true`         | Show status bar                |

All other props from `FileExplorer` and `Window` components are also supported.

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build library
bun run build:lib

# Build playground
bun run build

# Type check
bun run typecheck

# Lint
bun run lint
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [JericoFX](https://github.com/JericoFX)

## Credits

- Built with [SolidJS](https://solidjs.com)
- Styled with [98.css](https://jdan.github.io/98.css/) by [@jdan](https://github.com/jdan)  
- Inspired by the classic Windows 98 interface

## Recent Updates

### v1.1.0 - Enhanced FileExplorer with Full Navigation

- ✅ **Complete Navigation System** - Back/Forward buttons with history tracking
- ✅ **Breadcrumb Address Bar** - Clickable path segments for quick navigation  
- ✅ **File System Navigator** - Realistic Windows 98 directory structure
- ✅ **Search Integration** - Filter files and folders in current directory
- ✅ **Multiple View Modes** - Details table view and icons grid view
- ✅ **Event System** - Comprehensive callbacks for navigation, selection, and file operations
- ✅ **TypeScript Support** - Full type safety for all FileExplorer features
- ✅ **Responsive Design** - Proper text truncation and mobile-friendly layouts
