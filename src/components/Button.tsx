import { mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { ButtonProps } from '../types';

export function Button(props: ButtonProps) {
  const merged = mergeProps({ variant: 'normal' as const }, props);
  const [local, others] = splitProps(merged, ['variant', 'disabled', 'class', 'children', 'onClick']);

  // Enhanced click handler with sound effect animation
  const handleClick = (e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    const target = e.currentTarget;
    
    // Add visual sound effect
    target.classList.add('win98-sound-effect');
    setTimeout(() => {
      target.classList.remove('win98-sound-effect');
    }, 200);
    
    // Call original click handler
    if (local.onClick && typeof local.onClick === 'function') {
      local.onClick(e);
    }
  };

  return (
    <button
      class={cn(
        local.variant === 'default' && 'default',
        local.disabled && 'disabled',
        local.class
      )}
      disabled={local.disabled}
      onClick={handleClick}
      {...others}
    >
      {local.children}
    </button>
  );
}