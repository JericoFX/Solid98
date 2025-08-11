import { JSX, mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { SunkenPanelProps } from '../types';

export function SunkenPanel(props: SunkenPanelProps) {
  const merged = mergeProps({ interactive: false }, props);
  const [local, others] = splitProps(merged, ['interactive', 'class', 'children']);

  return (
    <div
      class={cn(
        'sunken-panel',
        local.interactive && 'interactive',
        local.class
      )}
      {...others}
    >
      {local.children}
    </div>
  );
}