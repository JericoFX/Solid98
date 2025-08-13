import { mergeProps, splitProps, createSignal, onMount } from 'solid-js';
import { cn } from '../utils/cn';
import { WindowProps } from '../types';
import { WindowHeader } from './WindowHeader';

export function Window(props: WindowProps) {
  const merged = mergeProps({ active: true, resizable: false }, props);
  const [local, others] = splitProps(merged, [
    'title',
    'active', 
    'resizable',
    'showMinimize',
    'showMaximize',
    'showClose',
    'showHelp',
    'onClose',
    'onMinimize', 
    'onMaximize',
    'onRestore',
    'onHelp',
    'class',
    'children'
  ]);

  const [isVisible, setIsVisible] = createSignal(false);
  const [isClosing, setIsClosing] = createSignal(false);

  // Entrance animation on mount
  onMount(() => {
    setIsVisible(true);
  });

  // Enhanced close handler with exit animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (local.onClose) {
        local.onClose();
      }
    }, 200); // Wait for animation to complete
  };

  // Enhanced minimize handler with animation
  const handleMinimize = () => {
    const windowElement = document.querySelector('.window') as HTMLElement;
    if (windowElement) {
      windowElement.style.animation = 'win98-window-minimize 0.3s ease-out forwards';
      setTimeout(() => {
        if (local.onMinimize) {
          local.onMinimize();
        }
        windowElement.style.animation = '';
      }, 300);
    }
  };

  return (
    <div
      class={cn(
        'window',
        !local.active && 'inactive',
        isClosing() && 'window-closing',
        local.class
      )}
      style={{
        opacity: isVisible() ? '1' : '0',
        transform: isVisible() ? 'scale(1)' : 'scale(0.7)',
        transition: isClosing() ? 'all 0.2s ease-in' : 'none'
      }}
      {...others}
    >
      {local.title && (
        <WindowHeader
          title={local.title}
          active={local.active}
          showMinimize={local.showMinimize}
          showMaximize={local.showMaximize}
          showClose={local.showClose}
          showHelp={local.showHelp}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={local.onMaximize}
          onRestore={local.onRestore}
          onHelp={local.onHelp}
        />
      )}
      <div class="window-body">
        {local.children}
      </div>
    </div>
  );
}