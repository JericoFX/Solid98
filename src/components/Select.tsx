import { mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { SelectProps } from '../types';

export function Select(props: SelectProps) {
  const merged = mergeProps({ options: [] }, props);
  const [local, others] = splitProps(merged, ['options', 'class', 'children']);

  return (
    <select
      class={cn(local.class)}
      {...others}
    >
      <Show when={local.options && local.options.length > 0}>
        <For each={local.options}>
          {(option) => (
            <option value={option.value} selected={option.selected}>
              {option.label}
            </option>
          )}
        </For>
      </Show>
      <Show when={!local.options || local.options.length === 0}>
        {local.children}
      </Show>
    </select>
  );
}