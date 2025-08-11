import { JSX, mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { ButtonProps } from '../types';

export function Button(props: ButtonProps) {
  const merged = mergeProps({ variant: 'normal' as const }, props);
  const [local, others] = splitProps(merged, ['variant', 'disabled', 'class', 'children']);

  return (
    <button
      class={cn(
        local.variant === 'default' && 'default',
        local.disabled && 'disabled',
        local.class
      )}
      disabled={local.disabled}
      {...others}
    >
      {local.children}
    </button>
  );
}