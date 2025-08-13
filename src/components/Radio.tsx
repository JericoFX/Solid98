import { splitProps, createUniqueId, Show } from 'solid-js';
import { RadioProps } from '../types';

export function Radio(props: RadioProps) {
  const [local, others] = splitProps(props, ['label', 'class', 'id']);
  const uniqueId = createUniqueId();
  const radioId = local.id || uniqueId;

  return (
    <>
      <input
        type="radio"
        id={radioId}
        class={local.class}
        {...others}
      />
      <Show when={local.label}>
        <label for={radioId}>{local.label}</label>
      </Show>
    </>
  );
}