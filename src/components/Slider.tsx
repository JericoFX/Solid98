import { JSX, mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { SliderProps } from '../types';

export function Slider(props: SliderProps) {
  const merged = mergeProps({ 
    vertical: false,
    boxIndicator: false,
    min: 0,
    max: 100,
    step: 1
  }, props);
  
  const [local, others] = splitProps(merged, [
    'vertical', 
    'boxIndicator',
    'class'
  ]);

  return (
    <input
      type="range"
      class={cn(
        local.boxIndicator && 'has-box-indicator',
        local.vertical && 'is-vertical',
        local.class
      )}
      {...others}
    />
  );
}