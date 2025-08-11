# Comprehensive Guide: Creating CSS Library Wrappers with SolidJS and Bun

This guide provides a complete framework for creating SolidJS wrapper libraries for CSS frameworks, using the `solid7` project as a reference implementation.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Package Configuration](#package-configuration)
3. [Build System Setup](#build-system-setup)
4. [Component Development Patterns](#component-development-patterns)
5. [TypeScript Integration](#typescript-integration)
6. [GitHub Pages Deployment](#github-pages-deployment)
7. [Best Practices and Conventions](#best-practices-and-conventions)
8. [Testing and Quality Assurance](#testing-and-quality-assurance)

## Project Structure

### Recommended Directory Layout

```
project-root/
├── src/                          # Library source code
│   ├── components/               # Component implementations
│   │   ├── Button.tsx           # Individual components
│   │   ├── Window.tsx
│   │   ├── index.ts             # Component exports
│   │   └── dialog.css           # Component-specific styles (if needed)
│   ├── playground/               # Development playground
│   │   ├── App.tsx              # Playground application
│   │   ├── App.css              # Playground styles
│   │   └── index.tsx            # Playground entry point
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   └── cn.ts                # Class name utility
│   └── index.ts                 # Main library entry
├── playground-dist/              # Playground build output (GitHub Pages)
├── dist/                         # Library build output (npm package)
├── docs/                         # Documentation (optional)
├── .github/workflows/            # CI/CD workflows
│   └── deploy.yml
├── package.json                  # Package configuration
├── vite.config.ts               # Build configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.js             # Linting configuration
├── bun.lock                     # Lock file for Bun
├── index.html                   # Playground HTML entry
└── README.md                    # Project documentation
```

### Key Directory Principles

- **src/components/**: Modular component architecture with barrel exports
- **src/playground/**: Isolated development environment
- **Dual output directories**: Separate dist folders for library and playground
- **TypeScript-first**: Comprehensive type definitions and configurations
- **Tooling integration**: ESLint, Prettier, and other development tools

## Package Configuration

### package.json Template

```json
{
  "name": "solid-css-wrapper",
  "type": "module",
  "version": "1.0.0",
  "description": "SolidJS wrapper components for CSS framework",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "bunx --bun vite",
    "build": "bunx --bun vite build && bunx tsc --emitDeclarationOnly",
    "build:lib": "bunx --bun vite build --mode lib && bunx tsc --emitDeclarationOnly",
    "preview": "bunx --bun vite preview",
    "typecheck": "bunx tsc --noEmit",
    "lint": "bunx eslint src/**/*.{ts,tsx}",
    "prepublishOnly": "bun run build:lib"
  },
  "keywords": [
    "solidjs",
    "css-framework",
    "ui",
    "components"
  ],
  "peerDependencies": {
    "solid-js": "^1.8.0"
  },
  "dependencies": {
    "css-framework": "^1.0.0",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "@solidjs/testing-library": "^0.8.10",
    "@types/node": "^24.1.0",
    "@typescript-eslint/eslint-plugin": "^8.38.0",
    "@typescript-eslint/parser": "^8.38.0",
    "eslint": "^9.32.0",
    "globals": "^16.3.0",
    "solid-js": "^1.9.7",
    "typescript": "^5.9.2",
    "vite": "^7.0.6",
    "vite-plugin-solid": "^2.11.8"
  }
}
```

### Configuration Principles

- **Dual package format**: ESM and CommonJS support via exports field
- **TypeScript declarations**: Generated automatically and included
- **Peer dependencies**: Keep SolidJS as peer dependency to avoid version conflicts
- **CSS framework dependency**: Include as regular dependency for auto-import
- **Bun integration**: Use `bunx --bun` for optimal performance
- **Pre-publish hooks**: Ensure library build before npm publish

## Build System Setup

### vite.config.ts Template

```typescript
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';
  
  return {
    base: isLib ? '/' : '/repo-name/',
    plugins: [
      solid()
    ],
    build: isLib ? {
      // Library build configuration
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'LibraryName',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
      },
      rollupOptions: {
        external: ['solid-js', 'css-framework'],
        output: {
          globals: {
            'solid-js': 'SolidJS',
            'css-framework': 'CSSFramework'
          }
        }
      },
      copyPublicDir: false
    } : {
      // Playground build configuration
      outDir: 'playground-dist'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };
});
```

### Build Mode Logic

- **Library mode** (`--mode lib`): Builds for npm distribution
  - ES modules and CommonJS formats
  - External dependencies (not bundled)
  - TypeScript declarations generated separately
  - No public directory copying

- **Playground mode** (default): Builds for GitHub Pages
  - Single bundle with all dependencies
  - Assets optimized and copied
  - Custom base URL for GitHub Pages deployment

### TypeScript Configuration

#### tsconfig.json Template

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "declaration": true,
    "declarationDir": "dist",
    "emitDeclarationOnly": true,
    "outDir": "dist",
    
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["src/playground"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Component Development Patterns

### Base Component Pattern

```typescript
import { Component, mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { BaseProps } from '../types';

export interface ComponentProps extends BaseProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Component: Component<ComponentProps> = (props) => {
  const merged = mergeProps({ variant: 'primary' as const }, props);
  const [local, others] = splitProps(merged, ['variant', 'class', 'children', 'disabled']);

  const componentClass = () => {
    return cn(
      'base-component-class',
      {
        'variant-primary': local.variant === 'primary',
        'variant-secondary': local.variant === 'secondary',
        'disabled': local.disabled
      },
      local.class
    );
  };

  return (
    <div class={componentClass()} {...others}>
      {local.children}
    </div>
  );
};
```

### Key Component Patterns

1. **Props Handling**:
   - Use `mergeProps` for default values
   - Use `splitProps` to separate component-specific props
   - Forward remaining props with spread operator

2. **Class Name Management**:
   - Use `cn` utility (clsx wrapper) for conditional classes
   - Support custom `class` prop for extensibility
   - Map variant/state props to CSS classes

3. **TypeScript Integration**:
   - Extend base interfaces for consistency
   - Use generic constraints where appropriate
   - Provide comprehensive prop types

### Advanced Component Patterns

#### Form Components with Event Handling

```typescript
import { Component, splitProps } from 'solid-js';
import { JSX } from 'solid-js';
import { cn } from '../utils/cn';

export interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class'> {
  class?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
}

export const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'label', 'labelPosition']);

  const inputClass = () => cn('text-input', local.class);
  const containerClass = () => cn(
    'input-container',
    { 'label-left': local.labelPosition === 'left' }
  );

  const renderInput = () => (
    <input class={inputClass()} {...others} />
  );

  if (!local.label) {
    return renderInput();
  }

  return (
    <div class={containerClass()}>
      <label>{local.label}</label>
      {renderInput()}
    </div>
  );
};
```

#### Complex State Management

```typescript
import { Component, createSignal, createEffect, For } from 'solid-js';

export interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: JSX.Element;
    disabled?: boolean;
  }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const Tabs: Component<TabsProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal(props.activeTab || props.tabs[0]?.id);

  createEffect(() => {
    if (props.activeTab !== undefined) {
      setActiveTab(props.activeTab);
    }
  });

  const handleTabClick = (tabId: string) => {
    if (!props.tabs.find(tab => tab.id === tabId)?.disabled) {
      setActiveTab(tabId);
      props.onTabChange?.(tabId);
    }
  };

  const activeContent = () => {
    return props.tabs.find(tab => tab.id === activeTab())?.content;
  };

  return (
    <div class="tabs-container">
      <div class="tab-headers">
        <For each={props.tabs}>
          {(tab) => (
            <button
              class={cn('tab-header', {
                'active': activeTab() === tab.id,
                'disabled': tab.disabled
              })}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          )}
        </For>
      </div>
      <div class="tab-content">
        {activeContent()}
      </div>
    </div>
  );
};
```

### Component Export Pattern

Create barrel exports in `src/components/index.ts`:

```typescript
// Individual component exports
export { Window } from './Window';
export { Button } from './Button';
export { Input } from './Input';
export { Tabs } from './Tabs';
// ... other components

// Re-export types if needed
export type { WindowProps } from './Window';
export type { ButtonProps } from './Button';
```

## TypeScript Integration

### Comprehensive Type System

#### Base Types (`src/types/index.ts`)

```typescript
import { JSX } from 'solid-js';

// Base props for all components
export interface BaseProps {
  class?: string;
  children?: JSX.Element;
}

// Common UI variants
export type Variant = 'primary' | 'secondary' | 'default';
export type Size = 'small' | 'medium' | 'large';
export type Position = 'top' | 'bottom' | 'left' | 'right';

// Form-related types
export interface FormProps<T extends HTMLElement = HTMLElement> 
  extends Omit<JSX.HTMLAttributes<T>, 'class'> {
  class?: string;
}

// Window/Dialog types
export interface WindowProps extends BaseProps {
  title?: string;
  width?: string;
  height?: string;
  active?: boolean;
  resizable?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

// Event handler types
export interface SelectionChangeHandler<T> {
  (item: T): void;
}

export interface SortHandler {
  (column: string, direction: 'asc' | 'desc'): void;
}
```

#### Advanced Type Patterns

```typescript
// Generic component props with constraints
export interface ListViewProps<T extends Record<string, any> = Record<string, any>> 
  extends BaseProps {
  items: Array<T & { id: string; selected?: boolean }>;
  columns: Array<{
    key: keyof T;
    title: string;
    sortable?: boolean;
    width?: string;
  }>;
  onSelectionChange?: SelectionChangeHandler<T>;
  onSort?: SortHandler;
}

// Union types for variants
export interface ButtonProps extends FormProps<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

// Conditional types for complex scenarios
export interface ProgressBarProps extends BaseProps {
  value?: number;
  max?: number;
  min?: number;
  // State is mutually exclusive
  state?: 'normal' | 'paused' | 'error' | 'marquee';
  animate?: boolean;
}
```

### Type Safety Best Practices

1. **Strict Type Checking**: Enable all strict TypeScript options
2. **Generic Constraints**: Use constraints to limit generic types appropriately
3. **Discriminated Unions**: Use for mutually exclusive properties
4. **Event Handlers**: Properly type event handlers with specific element types
5. **Props Inheritance**: Extend HTML element props while excluding conflicting ones

## GitHub Pages Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Bun
      uses: oven-sh/setup-bun@v1
      with:
        bun-version: latest

    - name: Install dependencies
      run: bun install

    - name: Build playground
      run: bun run build

    - name: Setup Pages
      uses: actions/configure-pages@v4

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './playground-dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### Deployment Configuration

1. **Base URL Configuration**: Set in Vite config based on repository name
2. **Asset Path Resolution**: Handled automatically by Vite base config
3. **Build Artifacts**: Upload from playground-dist directory
4. **Permissions**: Proper GitHub Pages permissions configured

## Best Practices and Conventions

### Code Organization

1. **Modular Architecture**:
   - One component per file
   - Logical grouping in directories
   - Consistent export patterns

2. **Naming Conventions**:
   - PascalCase for components
   - camelCase for props and functions
   - kebab-case for CSS classes
   - SCREAMING_SNAKE_CASE for constants

3. **File Structure**:
   - Co-locate related files
   - Separate concerns (components, types, utils)
   - Consistent file naming

### Performance Optimization

1. **Bundle Size**:
   - Tree-shakeable exports
   - External CSS framework
   - Minimal dependencies

2. **Runtime Performance**:
   - Efficient prop handling with splitProps
   - Memoized class name calculations
   - Appropriate use of signals

3. **Development Experience**:
   - Fast development server with Bun
   - Type-safe development
   - Hot module replacement

### CSS Integration Patterns

#### Auto-import CSS Framework

```typescript
// src/index.ts
import 'css-framework/dist/style.css';
export * from './components';
export * from './types';
```

#### Component-specific Styles

```typescript
// src/components/Dialog.tsx
import './dialog.css'; // Component-specific styles
import { Component } from 'solid-js';

export const Dialog: Component = () => {
  // Component implementation
};
```

#### Class Name Utility

```typescript
// src/utils/cn.ts
import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

### Error Handling and Validation

1. **Props Validation**:
   - Use TypeScript for compile-time validation
   - Runtime checks for critical props
   - Graceful degradation for missing props

2. **Error Boundaries**:
   - Wrap complex components in error boundaries
   - Provide meaningful error messages
   - Fallback UI for failed components

3. **Development Warnings**:
   - Console warnings for deprecated props
   - Development-only validation
   - Clear error messages

## Testing and Quality Assurance

### Testing Setup

```typescript
// Basic component test example
import { render, screen } from '@solidjs/testing-library';
import { Button } from '../src/components/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(() => <Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(() => <Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');
  });
});
```

### Quality Tools

1. **ESLint Configuration**:
   - TypeScript-aware rules
   - SolidJS-specific linting
   - Consistent code style

2. **Type Checking**:
   - Strict TypeScript configuration
   - Pre-commit type checking
   - CI/CD type validation

3. **Build Validation**:
   - Library build verification
   - Playground build testing
   - Bundle size monitoring

### Development Workflow

1. **Local Development**:
   ```bash
   bun install
   bun run dev          # Start playground dev server
   bun run typecheck    # Check types
   bun run lint         # Lint code
   ```

2. **Pre-release Testing**:
   ```bash
   bun run build:lib    # Test library build
   bun run build        # Test playground build
   ```

3. **Publishing**:
   ```bash
   npm version patch    # Bump version
   npm publish          # Publish to npm (triggers build:lib)
   ```

## Conclusion

This guide provides a comprehensive framework for creating high-quality CSS library wrappers with SolidJS and Bun. Key benefits of this approach include:

- **Developer Experience**: Fast builds, type safety, and hot reloading
- **Package Quality**: Dual build system, proper TypeScript support, and tree-shaking
- **Maintainability**: Modular architecture, consistent patterns, and comprehensive testing
- **Distribution**: Automated deployment to GitHub Pages and npm publishing

By following these patterns and conventions, you can create robust, maintainable, and user-friendly component libraries that leverage the full power of modern web development tools.