import { JSX } from 'solid-js';

export interface BaseComponentProps {
  class?: string;
  children?: JSX.Element;
}

export interface WindowProps extends BaseComponentProps {
  title?: string;
  active?: boolean;
  resizable?: boolean;
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

export interface ButtonProps extends BaseComponentProps, Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'class'> {
  variant?: 'default' | 'normal';
  disabled?: boolean;
}

export interface StatusBarProps extends BaseComponentProps {
  fields?: string[];
}

export interface FieldRowProps extends BaseComponentProps {
  stacked?: boolean;
}

export interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  class?: string;
  label?: string;
  id?: string;
}

export interface RadioProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  class?: string;
  label?: string;
  id?: string;
  name?: string;
  value?: string;
}

export interface SelectProps extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'class'> {
  class?: string;
  children?: JSX.Element;
  options?: { value: string; label: string; selected?: boolean }[];
}

export interface SliderProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
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

export interface SunkenPanelProps extends BaseComponentProps, Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> {
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

export interface TableColumn<T = any> {
  key: string;
  header: string;
  width?: string | number;
  sortable?: boolean;
  render?: (value: any, item: T, index: number) => JSX.Element;
}

export interface TableProps<T = any> extends BaseComponentProps {
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