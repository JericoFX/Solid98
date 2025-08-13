import { JSX } from 'solid-js';

/**
 * Base interface for all Solid98CSS components
 * Provides common props for styling and children
 */
export interface BaseComponentProps {
  /** Additional CSS class names to apply to the component */
  class?: string;
  /** Child elements to render inside the component */
  children?: JSX.Element;
  /** Inline styles as object or CSS string */
  style?: JSX.CSSProperties | string;
}

/**
 * Authentic Windows 98 window component with full window management features
 * 
 * @example
 * ```tsx
 * <Window 
 *   title="My Application" 
 *   active={true}
 *   showMinimize={true}
 *   onClose={() => setWindowOpen(false)}
 * >
 *   <p>Window content here</p>
 * </Window>
 * ```
 * 
 * @accessibility
 * - Supports keyboard navigation for window controls
 * - Focus management when window becomes active
 * - Screen reader compatible window title
 */
export interface WindowProps extends BaseComponentProps {
  /** Window title displayed in the title bar */
  title?: string;
  /** Whether the window appears active (focused) */
  active?: boolean;
  /** Enable window resizing functionality */
  resizable?: boolean;
  /** Show minimize button in title bar */
  showMinimize?: boolean;
  /** Show maximize/restore button in title bar */
  showMaximize?: boolean;
  /** Show close button in title bar */
  showClose?: boolean;
  /** Show help button in title bar */
  showHelp?: boolean;
  /** Called when close button is clicked */
  onClose?: () => void;
  /** Called when minimize button is clicked */
  onMinimize?: () => void;
  /** Called when maximize button is clicked */
  onMaximize?: () => void;
  /** Called when restore button is clicked (when window is maximized) */
  onRestore?: () => void;
  /** Called when help button is clicked */
  onHelp?: () => void;
}

export interface WindowHeaderProps extends BaseComponentProps {
  title?: string;
  active?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  showHelp?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onRestore?: () => void;
  onHelp?: () => void;
}

/**
 * Windows 98 style button with authentic styling and enhanced click feedback
 * 
 * @example
 * ```tsx
 * <Button variant="default" onClick={() => alert('Clicked!')}>
 *   Primary Action
 * </Button>
 * 
 * <Button variant="normal" disabled>
 *   Secondary Action
 * </Button>
 * ```
 * 
 * @accessibility
 * - Full keyboard support (Space/Enter activation)
 * - Focus indicators with Windows 98 styling
 * - Disabled state properly announced to screen readers
 */
export interface ButtonProps
  extends BaseComponentProps,
    Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'class'> {
  /** Visual style variant - 'default' for primary actions, 'normal' for secondary */
  variant?: 'default' | 'normal';
  /** Disables interaction and applies disabled styling */
  disabled?: boolean;
}

export interface StatusBarProps extends BaseComponentProps {
  fields?: string[];
}

export interface FieldRowProps extends BaseComponentProps {
  stacked?: boolean;
}

export interface CheckboxProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  class?: string;
  label?: string;
  id?: string;
}

export interface RadioProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  class?: string;
  label?: string;
  id?: string;
  name?: string;
  value?: string;
}

export interface SelectProps
  extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'class'> {
  class?: string;
  children?: JSX.Element;
  options?: { value: string; label: string; selected?: boolean }[];
}

export interface SliderProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  class?: string;
  vertical?: boolean;
  boxIndicator?: boolean;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
}

export interface ProgressBarProps extends BaseComponentProps {
  value?: number;
  max?: number;
  segmented?: boolean;
}

export interface SunkenPanelProps
  extends BaseComponentProps,
    Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> {
  interactive?: boolean;
}

export interface TreeViewProps extends BaseComponentProps {
  data?: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
  onNodeDoubleClick?: (node: TreeNode) => void;
}

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
}

export interface TabsProps extends BaseComponentProps {
  multirows?: boolean;
  selectedTab?: string;
  onTabSelect?: (tabId: string) => void;
}

export interface TabProps extends BaseComponentProps {
  id: string;
  label: string;
  selected?: boolean;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  width?: string | number;
  sortable?: boolean;
  render?: (value: unknown, item: T, index: number) => JSX.Element;
}

export interface TableProps<T = Record<string, unknown>> extends BaseComponentProps {
  data?: T[];
  columns?: TableColumn<T>[];
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  onRowClick?: (item: T, index: number) => void;
  onRowDoubleClick?: (item: T, index: number) => void;
  selectedRow?: number;
}

export interface ModalProps extends BaseComponentProps {
  open?: boolean;
  title?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  width?: string | number;
  height?: string | number;
  modal?: boolean;
  movable?: boolean;
}

export type AlertType = 'error' | 'warning' | 'question' | 'info';

export interface AlertProps extends BaseComponentProps {
  open?: boolean;
  type?: AlertType;
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

/**
 * File Explorer types
 */
export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified?: Date;
  icon?: string;
  path?: string;
}

export interface FileSystemStructure {
  [key: string]: FileItem[] | FileSystemStructure;
}

/**
 * Windows 98 File Explorer component with authentic styling and navigation
 * 
 * @example
 * ```tsx
 * <FileExplorer
 *   data={fileData}
 *   viewMode="details"
 *   showSearch={true}
 *   onFileOpen={(file) => console.log('Opening:', file.name)}
 *   onFileSelect={(file, selected) => setSelected(selected)}
 * />
 * ```
 * 
 * @accessibility
 * - Full keyboard navigation support (arrow keys, Enter, Space)
 * - Screen reader announcements for file selections
 * - Focus management for grid and list views
 */
export interface FileExplorerProps extends BaseComponentProps {
  /** Array of files and folders to display */
  data?: FileItem[];
  /** Complete file system structure for navigation */
  fileSystem?: FileSystemStructure;
  /** Current directory path */
  currentPath?: string;
  /** Display mode - 'icons' for grid view, 'details' for list view */
  viewMode?: 'icons' | 'details';
  /** Show hidden files and folders */
  showHidden?: boolean;
  /** Enable search functionality */
  showSearch?: boolean;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Explorer width */
  width?: string;
  /** Explorer height */
  height?: string;
  /** Enable navigation features (back/forward buttons, breadcrumbs) */
  enableNavigation?: boolean;
  /** Show back and forward navigation buttons */
  showBackForward?: boolean;
  /** Called when navigating to a different path */
  onNavigate?: (path: string, item: FileItem) => void;
  /** Called when files are selected/deselected */
  onFileSelect?: (item: FileItem, selectedItems: string[]) => void;
  /** Called when a file is opened (double-clicked) */
  onFileOpen?: (item: FileItem) => void;
  /** Called when search term changes with filtered results */
  onSearchChange?: (searchTerm: string, filteredItems: FileItem[]) => void;
  /** Called when path changes via navigation */
  onPathChange?: (path: string) => void;
}

/**
 * Navigable File Explorer types
 */
export interface NavigationHistoryEntry {
  path: string;
  displayName: string;
  timestamp: Date;
}

export interface NavigableFileExplorerProps extends BaseComponentProps {
  title?: string;
  initialPath?: string;
  viewMode?: 'icons' | 'details';
  showHidden?: boolean;
  showSearch?: boolean;
  showToolbar?: boolean;
  showAddressBar?: boolean;
  showStatusBar?: boolean;
  width?: string | number;
  height?: string | number;
  active?: boolean;
  resizable?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onRestore?: () => void;
  onFileOpen?: (item: FileItem) => void;
  onPathChange?: (path: string) => void;
}

/**
 * New Component Types
 */

// MenuBar types
export interface MenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  separator?: boolean;
  shortcut?: string;
  submenu?: MenuItem[];
  onClick?: () => void;
}

export interface MenuBarProps extends BaseComponentProps {
  items: MenuItem[];
  onMenuSelect?: (menuId: string, item: MenuItem) => void;
}

// Text Input types
export interface TextInputProps extends BaseComponentProps, 
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  type?: 'text' | 'password' | 'email' | 'number' | 'search';
}

export interface TextAreaProps extends BaseComponentProps,
  Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'class'> {
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

// Toolbar types
export interface ToolbarItem {
  id: string;
  type: 'button' | 'separator' | 'dropdown' | 'toggle';
  icon?: string;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  active?: boolean;
  items?: ToolbarItem[];
  onClick?: () => void;
}

export interface ToolbarProps extends BaseComponentProps {
  items: ToolbarItem[];
  vertical?: boolean;
  size?: 'small' | 'medium' | 'large';
  onItemClick?: (item: ToolbarItem) => void;
}

// GroupBox types
export interface GroupBoxProps extends BaseComponentProps {
  legend?: string;
  disabled?: boolean;
}

// ListBox types
export interface ListBoxItem {
  id: string | number;
  label: string;
  value?: any;
  disabled?: boolean;
  selected?: boolean;
  icon?: string;
}

export interface ListBoxProps extends BaseComponentProps {
  items: ListBoxItem[];
  multiSelect?: boolean;
  disabled?: boolean;
  size?: number;
  onSelectionChange?: (selectedItems: ListBoxItem[]) => void;
  onItemClick?: (item: ListBoxItem) => void;
  onItemDoubleClick?: (item: ListBoxItem) => void;
}
