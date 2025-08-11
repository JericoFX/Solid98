## CRITICAL: COMMIT MESSAGE REQUIREMENTS - NO EXCEPTIONS

⚠️ **STOP**: Before ANY commit, you MUST include agent attribution in this exact format:
`type(scope): description - @agent1 @agent2`

**This is not optional. Every single commit must follow this pattern.**

## Pre-Commit Checklist for Claude Code

Before creating any commit, you MUST:
1. ✅ Identify which agents contributed to the changes
2. ✅ Format commit message as: `type(scope): description - @agent1 @agent2` 
3. ✅ Include the standard attribution footer
4. ✅ Verify the message follows the project's agent attribution requirements

**For component fixes**: Always include `@solidjs-reactive-expert` and relevant UI experts
**For build changes**: Always include `@vite-build-specialist` and configuration experts
**For CSS/styling changes**: Always include `@modern-css-specialist` and design experts

---

# Solid98 - SolidJS Windows 98 UI Components

## Project Overview

**solid98** is a comprehensive SolidJS wrapper library for the 98.css Windows 98 UI framework. It provides type-safe, reactive SolidJS components that wrap the classic Windows 98 aesthetic provided by 98.css.

### Architecture & Technology Stack

- **Frontend Framework**: SolidJS 1.9.7 with TypeScript
- **CSS Framework**: 98.css 0.1.20 (Windows 98 UI styles)
- **Build System**: Vite 7.0.6 with dual build modes
- **Package Manager**: Bun (fast, modern package manager)
- **Utilities**: clsx 2.1.1 for className management
- **Development**: ESLint, TypeScript strict mode, Playwright testing

### Project Structure

```
solid98/
├── src/
│   ├── components/          # SolidJS component wrappers
│   │   ├── Window.tsx       # Main window container
│   │   ├── WindowHeader.tsx # Modular window header
│   │   ├── Button.tsx       # Windows 98 buttons
│   │   ├── Tabs.tsx         # Tab navigation
│   │   ├── StatusBar.tsx    # Status bar
│   │   └── [other components]
│   ├── utils/
│   │   └── cn.ts           # clsx utility for className joining
│   ├── types/              # TypeScript definitions
│   └── index.ts            # Main library export
├── dist/                   # Library build output
├── playground-dist/        # GitHub Pages build output
└── src/playground/         # Component testing playground
```

## Development Guidelines

### Component Architecture Principles

1. **Modular Design**: Components must be composable and reusable
   - Example: `Window` + `WindowHeader` with buttons as props
   - Each component handles one responsibility
   - Props interface should be intuitive and type-safe

2. **SolidJS Patterns**: Follow SolidJS best practices
   - Use `mergeProps()` for default props
   - Use `splitProps()` to separate component-specific from DOM props
   - Leverage SolidJS reactivity system properly
   - Forward refs and event handlers appropriately

3. **CSS Class Management**: Always use the `cn()` utility
   ```typescript
   import { cn } from '../utils/cn';
   
   // Combine classes properly
   const classes = cn('base-class', conditionalClass && 'conditional', props.class);
   ```

4. **TypeScript Standards**: Strict typing required
   - Define proper component props interfaces
   - Export component types for library consumers
   - Use SolidJS component types correctly
   - Maintain type safety across build targets

### Component Development Workflow

```typescript
// Standard component template
import { JSX, mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';

interface ComponentProps {
  // Component-specific props
  variant?: 'primary' | 'secondary';
  // Standard JSX props
  class?: string;
  children?: JSX.Element;
  // Event handlers as needed
  onClick?: (e: MouseEvent) => void;
}

export function Component(props: ComponentProps) {
  // Merge with defaults
  const merged = mergeProps({ variant: 'primary' }, props);
  
  // Split component props from DOM props
  const [local, others] = splitProps(merged, ['variant', 'class']);
  
  return (
    <div
      class={cn(
        'base-98css-class',
        local.variant === 'primary' && 'primary-variant-class',
        local.class
      )}
      {...others}
    >
      {props.children}
    </div>
  );
}
```

### 98.css Integration Guidelines

1. **CSS Framework Reference**: Always check classes in `node_modules/98.css/dist/`
2. **Class Naming**: Use exact 98.css class names, combine with `cn()` utility
3. **Responsive Behavior**: Respect 98.css responsive patterns
4. **Theme Consistency**: Maintain Windows 98 aesthetic integrity

## Current Component Status

### ✅ Implemented Components
- **Window**: Main window container with title bar support
- **WindowHeader**: Modular title bar with control buttons
- **Button**: Standard and default button variants
- **StatusBar**: Bottom status bar with field support
- **FieldRow**: Form field layout (horizontal/stacked)
- **Checkbox**: Checkbox with label integration
- **Radio**: Radio button with label integration  
- **Select**: Dropdown selection with options
- **Slider**: Range slider (horizontal/vertical, box indicator)
- **ProgressBar**: Progress indicator (normal/segmented)
- **SunkenPanel**: Sunken container with interactive mode
- **TreeView**: Hierarchical tree with expand/collapse
- **Tabs/Tab**: Tab navigation system

### 🎯 Component Features

#### Core Windows Components
- **Window control buttons**: Minimize, maximize, restore, close, help
- **Active/inactive states**: Visual feedback for window focus
- **Modular architecture**: Separate header and body components

#### Form Integration
- **Label associations**: Proper accessibility with form labels
- **Event handling**: SolidJS reactive event patterns
- **Validation ready**: Props structured for form validation

#### Layout System
- **Responsive design**: Components adapt to different screen sizes
- **Consistent spacing**: Following Windows 98 design guidelines
- **Flexible containers**: Panels and layouts for complex UIs

## Build Configuration

### Dual Build System Architecture

The project uses a sophisticated dual build system for different deployment targets:

```typescript
// vite.config.ts - Conditional build configuration
const isLib = mode === 'lib';

export default defineConfig({
  base: isLib ? '/' : '/solid98/',
  // Library vs Playground build configurations
});
```

### Build Modes

#### Library Build (`build:lib`)
- **Purpose**: NPM package distribution
- **Output**: `dist/` directory
- **Formats**: ESM + CommonJS with TypeScript declarations
- **Externals**: solid-js and 98.css marked as external
- **Entry**: `src/index.ts`

#### Playground Build (`build`)  
- **Purpose**: GitHub Pages demo deployment
- **Output**: `playground-dist/` directory
- **Base Path**: `/solid98/` for GitHub Pages
- **Bundle**: All dependencies included for standalone demo

### Package Scripts
```json
{
  "dev": "bunx --bun vite",                    // Development server
  "build": "bunx --bun vite build && bunx tsc --emitDeclarationOnly", // Playground build
  "build:lib": "bunx --bun vite build --mode lib && bunx tsc --emitDeclarationOnly", // Library build
  "prepublishOnly": "bun run build:lib",      // Auto-build before npm publish
  "typecheck": "bunx tsc --noEmit",           // Type checking
  "lint": "bunx eslint src/**/*.{ts,tsx}"     // Code linting
}
```

### CSS Auto-import Configuration

```typescript
// src/index.ts - Automatic CSS import
import '98.css/dist/98.css';
// This ensures 98.css is automatically available when library is imported
```

```json
// package.json - CSS dependency strategy
{
  "dependencies": {
    "98.css": "^0.1.20"    // Regular dependency (not peer) for auto-import
  }
}
```

### GitHub Actions Deployment

```yaml
# .github/workflows/deploy.yml
# - Uses oven-sh/setup-bun for fast builds
# - Builds playground with GitHub Pages base path
# - Deploys to /solid98/ subdirectory
```

## Quality Standards

### TypeScript Configuration
- **Strict Mode**: Enabled for type safety
- **Declaration Generation**: Automatic .d.ts generation
- **Path Aliases**: `@` points to `src/` directory
- **Build Targets**: ES2020, compatible with modern browsers

### Code Quality Requirements
1. **ESLint**: All code must pass linting
2. **TypeScript**: Strict type checking required
3. **Component Testing**: Playground testing for all components
4. **Build Validation**: Both lib and playground builds must succeed

### Testing Strategy
- **Manual Testing**: Playground-based component testing
- **Build Testing**: Validate both build modes
- **Integration Testing**: Test in external projects
- **Visual Testing**: Verify Windows 98 UI consistency

## Memory Instructions for AI Agents

### Development Context Memory
- **CSS Framework**: 98.css classes available in node_modules/98.css/dist/
- **Component Patterns**: Follow established mergeProps/splitProps patterns
- **Build System**: Remember dual build system when making changes
- **Windows 98 Aesthetic**: Maintain consistency with 98.css visual design

### Component Development Memory
- **Modular Architecture**: Always design components as composable modules
- **TypeScript Types**: Export proper component type definitions
- **Class Utilities**: Always use cn() utility for className management
- **Event Handling**: Use SolidJS reactive patterns for user interactions

### Build Configuration Memory
- **GitHub Pages**: Base path /solid98/ for playground builds
- **Library Distribution**: External dependencies for npm package
- **Bun Integration**: Use bun for fast builds and package management
- **Auto-deployment**: GitHub Actions handles automatic playground deployment

### Commit Message Guidelines

**MANDATORY**: All commit messages MUST automatically include agent attribution. Claude Code will ALWAYS append agent names to commit messages without being asked.

- **Required Format**: `type(scope): description - @agent1 @agent2`
- **Default Behavior**: Every commit automatically includes the contributing agents
- **Examples**: 
  - `feat(window): implement Windows 98 window controls - @solidjs-reactive-expert @modern-css-specialist`
  - `fix(button): resolve default button styling issue - @solidjs-reactive-expert @modern-css-specialist`
  - `docs: update component API documentation - @documentation-specialist`
  - `refactor(build): optimize dual build configuration - @vite-build-specialist`

**Implementation**: When creating any commit, Claude Code will automatically determine which agent(s) worked on the changes and append them to the commit message. This is not optional and happens by default for all commits.

This provides clear traceability of which agents contributed to each change and is essential for project maintenance and code archaeology.