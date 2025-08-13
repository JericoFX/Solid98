import { mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { GroupBoxProps } from '../types';

export function GroupBox(props: GroupBoxProps) {
  const merged = mergeProps({ 
    disabled: false 
  }, props);

  const [local, others] = splitProps(merged, [
    'legend',
    'disabled',
    'class',
    'children'
  ]);

  return (
    <fieldset
      class={cn('group-box', local.disabled && 'disabled', local.class)}
      disabled={local.disabled}
      {...others}
    >
      {local.legend && <legend class="group-box-legend">{local.legend}</legend>}
      <div class="group-box-content">
        {local.children}
      </div>
    </fieldset>
  );
}