import { mergeProps, splitProps, JSX } from 'solid-js';
import { cn } from '../utils/cn';
import { TextAreaProps } from '../types';

export function TextArea(props: TextAreaProps) {
  const merged = mergeProps({ 
    value: '',
    disabled: false,
    readonly: false,
    required: false,
    rows: 4,
    wrap: 'soft' as const,
    resize: 'both' as const
  }, props);

  const [local, others] = splitProps(merged, [
    'class',
    'style',
    'disabled',
    'readonly',
    'value',
    'placeholder',
    'required',
    'rows',
    'cols',
    'maxLength',
    'minLength',
    'wrap',
    'resize',
    'onInput',
    'onChange',
    'onFocus',
    'onBlur',
    'onKeyDown',
    'onKeyUp',
    'onScroll'
  ]);

  return (
    <textarea
      value={local.value}
      placeholder={local.placeholder}
      disabled={local.disabled}
      readonly={local.readonly}
      required={local.required}
      rows={local.rows}
      cols={local.cols}
      maxLength={local.maxLength}
      minLength={local.minLength}
      wrap={local.wrap}
      class={cn('textbox', local.disabled && 'disabled', local.class)}
      style={{
        resize: local.resize,
        ...(local.style as JSX.CSSProperties || {})
      }}
      onInput={local.onInput}
      onChange={local.onChange}
      onFocus={local.onFocus}
      onBlur={local.onBlur}
      onKeyDown={local.onKeyDown}
      onKeyUp={local.onKeyUp}
      onScroll={local.onScroll}
      {...others}
    />
  );
}