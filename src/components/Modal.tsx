import { mergeProps, splitProps, Show, createEffect, onMount, onCleanup } from 'solid-js';
import { cn } from '../utils/cn';
import { ModalProps } from '../types';

// Enhanced Modal with more Windows 98 features

export function Modal(props: ModalProps) {
  const merged = mergeProps({ 
    open: false, 
    showCloseButton: true,
    width: 'auto',
    height: 'auto',
    modal: true,
    movable: false
  }, props);
  const [local, others] = splitProps(merged, [
    'open', 
    'title', 
    'onClose', 
    'children', 
    'class', 
    'showCloseButton',
    'width',
    'height',
    'modal',
    'movable'
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

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === overlayRef && local.onClose) {
      local.onClose();
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && local.onClose) {
      local.onClose();
    }
  };

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    onCleanup(() => {
      document.removeEventListener('keydown', handleKeydown);
    });
  });

  return (
    <Show when={local.open}>
      <div
        ref={overlayRef}
        class="modal-overlay"
        onClick={handleOverlayClick}
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
          class={cn('window', 'modal-window', local.class)}
          style={{
            'max-width': '90vw',
            'max-height': '90vh',
            width: typeof local.width === 'number' ? `${local.width}px` : local.width,
            height: typeof local.height === 'number' ? `${local.height}px` : local.height,
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          {...others}
        >
          <Show when={local.title}>
            <div class="title-bar">
              <div class="title-bar-text">{local.title}</div>
              <Show when={local.showCloseButton}>
                <div class="title-bar-controls">
                  <button 
                    aria-label="Close" 
                    onClick={local.onClose}
                  />
                </div>
              </Show>
            </div>
          </Show>
          
          <div class="window-body">
            {local.children}
          </div>
        </div>
      </div>
    </Show>
  );
}