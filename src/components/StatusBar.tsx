import { mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { StatusBarProps } from '../types';

export function StatusBar(props: StatusBarProps) {
  const merged = mergeProps({ fields: [] }, props);
  const [local, others] = splitProps(merged, ['fields', 'class', 'children']);

  return (
    <div
      class={cn('status-bar', local.class)}
      {...others}
    >
      <Show when={local.fields && local.fields.length > 0}>
        <For each={local.fields}>
          {(field) => (
            <div class="status-bar-field">{field}</div>
          )}
        </For>
      </Show>
      <Show when={!local.fields || local.fields.length === 0}>
        <div class="status-bar-field">
          {local.children}
        </div>
      </Show>
    </div>
  );
}