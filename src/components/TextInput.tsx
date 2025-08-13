import { mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { TextInputProps } from '../types';

export function TextInput(props: TextInputProps) {
  const merged = mergeProps({ 
    type: 'text' as const,
    value: '',
    disabled: false,
    readonly: false,
    required: false
  }, props);

  const [local, others] = splitProps(merged, [
    'class', 
    'disabled',
    'readonly',
    'type',
    'value',
    'placeholder',
    'required',
    'maxLength',
    'minLength',
    'pattern',
    'autocomplete',
    'onInput',
    'onChange',
    'onFocus',
    'onBlur',
    'onKeyDown',
    'onKeyUp'
  ]);

  return (
    <input
      type={local.type}
      value={local.value}
      placeholder={local.placeholder}
      disabled={local.disabled}
      readonly={local.readonly}
      required={local.required}
      maxLength={local.maxLength}
      minLength={local.minLength}
      pattern={local.pattern}
      autocomplete={local.autocomplete}
      class={cn('textbox', local.disabled && 'disabled', local.class)}
      onInput={local.onInput}
      onChange={local.onChange}
      onFocus={local.onFocus}
      onBlur={local.onBlur}
      onKeyDown={local.onKeyDown}
      onKeyUp={local.onKeyUp}
      {...others}
    />
  );
}