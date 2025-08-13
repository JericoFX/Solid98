import { mergeProps, splitProps, Show, createEffect, onMount, onCleanup } from 'solid-js';
import { cn } from '../utils/cn';

// Windows 98 style icons as SVG data URLs
const WIN98_ICONS = {
  error: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNGRjAwMDAiIHN0cm9rZT0iIzgwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTAsMTAgMjIsMjIgMjIsMTAgMTAsMjIiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjMiIGhlaWdodD0iMTQiIGZpbGw9IiNGRkZGRkYiIHRyYW5zZm9ybT0icm90YXRlKDQ1IDE2IDE2KSIvPgo8cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMyIgaGVpZ2h0PSIxNCIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE2IDE2KSIvPgo8L3N2Zz4K',
  warning: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSIxNiwyIDMwLDI4IDIsMjgiIGZpbGw9IiNGRkZGMDAiIHN0cm9rZT0iIzgwODAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxyZWN0IHg9IjE0LjUiIHk9IjEwIiB3aWR0aD0iMyIgaGVpZ2h0PSIxMCIgZmlsbD0iIzAwMDAwMCIvPgo8Y2lyY2xlIGN4PSIxNiIgY3k9IjI0IiByPSIyIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPgo=',
  question: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMwMDgwRkYiIHN0cm9rZT0iIzAwNDA4MCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMiA5QzEyIDcuODk1NDMgMTIuODk1NCA3IDE0IDdIMThDMTkuMTA0NiA3IDIwIDcuODk1NDMgMjAgOVYxMUMyMCAxMi4xMDQ2IDE5LjEwNDYgMTMgMTggMTNIMTZWMTVIMTQiIGZpbGw9IiNGRkZGRkYiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIyMSIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
  info: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMwMDgwRkYiIHN0cm9rZT0iIzAwNDA4MCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iOSIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxNC41IiB5PSIxNCIgd2lkdGg9IjMiIGhlaWdodD0iMTAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg=='
};

type AlertType = 'error' | 'warning' | 'question' | 'info';

interface AlertProps {
  open?: boolean;
  type?: AlertType;
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  class?: string;
}

export function Alert(props: AlertProps) {
  const merged = mergeProps({ 
    open: false,
    type: 'info' as AlertType,
    title: '',
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancel: false
  }, props);
  const [local, others] = splitProps(merged, [
    'open', 
    'type', 
    'title', 
    'message', 
    'onConfirm', 
    'onCancel', 
    'confirmText', 
    'cancelText', 
    'showCancel', 
    'class'
  ]);

  let modalRef: HTMLDivElement | undefined;
  let overlayRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (local.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  onCleanup(() => {
    document.body.style.overflow = '';
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && local.onCancel) {
      local.onCancel();
    } else if (e.key === 'Enter' && local.onConfirm) {
      local.onConfirm();
    }
  };

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    onCleanup(() => {
      document.removeEventListener('keydown', handleKeydown);
    });
  });

  const getDefaultTitle = () => {
    switch (local.type) {
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'question': return 'Confirm';
      case 'info': return 'Information';
      default: return 'Alert';
    }
  };

  const handleConfirm = () => {
    if (local.onConfirm) {
      local.onConfirm();
    }
  };

  const handleCancel = () => {
    if (local.onCancel) {
      local.onCancel();
    }
  };

  return (
    <Show when={local.open}>
      <div
        ref={overlayRef}
        class="alert-overlay"
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          'background-color': 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'z-index': '1000'
        }}
      >
        <div
          ref={modalRef}
          class={cn('window', 'alert-dialog', local.class)}
          style={{
            'min-width': '300px',
            'max-width': '500px',
            width: 'auto'
          }}
          {...others}
        >
          <div class="title-bar">
            <div class="title-bar-text">{local.title || getDefaultTitle()}</div>
          </div>
          
          <div class="window-body" style={{ padding: '16px' }}>
            <div class="alert-content" style={{ 
              display: 'flex', 
              'align-items': 'flex-start', 
              gap: '16px',
              'margin-bottom': '20px'
            }}>
              <img 
                src={WIN98_ICONS[local.type]} 
                alt={local.type}
                style={{ 
                  width: '32px', 
                  height: '32px',
                  'flex-shrink': '0'
                }}
              />
              <div class="alert-message" style={{ 
                'font-family': '"Pixelated MS Sans Serif", Arial',
                'font-size': '11px',
                'line-height': '1.4',
                'padding-top': '4px'
              }}>
                {local.message}
              </div>
            </div>
            
            <div class="alert-buttons" style={{ 
              display: 'flex', 
              'justify-content': 'center',
              gap: '8px'
            }}>
              <button 
                class="default"
                onClick={handleConfirm}
                style={{ 'min-width': '75px' }}
              >
                {local.confirmText}
              </button>
              <Show when={local.showCancel}>
                <button 
                  onClick={handleCancel}
                  style={{ 'min-width': '75px' }}
                >
                  {local.cancelText}
                </button>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}

// Convenience functions for common alert types
export const showError = (message: string, onConfirm?: () => void) => ({
  type: 'error' as const,
  message,
  onConfirm
});

export const showWarning = (message: string, onConfirm?: () => void) => ({
  type: 'warning' as const,
  message,
  onConfirm
});

export const showInfo = (message: string, onConfirm?: () => void) => ({
  type: 'info' as const,
  message,
  onConfirm
});

export const showConfirm = (message: string, onConfirm?: () => void, onCancel?: () => void) => ({
  type: 'question' as const,
  message,
  onConfirm,
  onCancel,
  showCancel: true,
  confirmText: 'Yes',
  cancelText: 'No'
});