import { JSX, splitProps, createUniqueId, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { CheckboxProps } from '../types';

export function Checkbox(props: CheckboxProps) {
  const [local, others] = splitProps(props, ['label', 'class', 'id']);
  const uniqueId = createUniqueId();
  const checkboxId = local.id || uniqueId;

  return (
    <>
      <input
        type="checkbox"
        id={checkboxId}
        class={local.class}
        {...others}
      />
      <Show when={local.label}>
        <label for={checkboxId}>{local.label}</label>
      </Show>
    </>
  );
}