import { JSX, mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { ProgressBarProps } from '../types';

export function ProgressBar(props: ProgressBarProps) {
  const merged = mergeProps({ 
    value: 0, 
    max: 100, 
    segmented: false 
  }, props);
  
  const [local, others] = splitProps(merged, [
    'value',
    'max', 
    'segmented',
    'class',
    'children'
  ]);

  return (
    <div
      class={cn(
        'progress-indicator',
        local.segmented && 'segmented',
        local.class
      )}
      {...others}
    >
      <div 
        class="progress-indicator-bar"
        style={{
          width: `${Math.min(100, Math.max(0, (local.value / local.max) * 100))}%`
        }}
      />
      {local.children}
    </div>
  );
}