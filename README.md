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
import { Window, Button, StatusBar } from 'solid-98css';

function MyApp() {
  return (
    <Window title="My Application">
      <p>Welcome to the Windows 98 era!</p>
      <Button variant="default">Click me!</Button>
      <StatusBar>Ready</StatusBar>
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

## Component Examples

### Window with Controls

```tsx
<Window>
  <WindowHeader 
    title="My App"
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

## API Reference

### Window Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Window title |
| `active` | `boolean` | `true` | Window active state |
| `resizable` | `boolean` | `false` | Enable resize handles |

### Button Props  
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'normal'` | `'normal'` | Button style variant |
| `disabled` | `boolean` | `false` | Disabled state |

### Slider Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | `boolean` | `false` | Vertical orientation |
| `boxIndicator` | `boolean` | `false` | Box-style indicator |
| `value` | `number` | - | Current value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |

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