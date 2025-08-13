import { mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { FieldRowProps } from '../types';

export function FieldRow(props: FieldRowProps) {
  const merged = mergeProps({ stacked: false }, props);
  const [local, others] = splitProps(merged, ['stacked', 'class', 'children']);

  return (
    <div
      class={cn(
        local.stacked ? 'field-row-stacked' : 'field-row',
        local.class
      )}
      {...others}
    >
      {local.children}
    </div>
  );
}