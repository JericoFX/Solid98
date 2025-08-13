import { mergeProps, splitProps, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { WindowHeaderProps } from '../types';

export function WindowHeader(props: WindowHeaderProps) {
  const merged = mergeProps({ 
    active: true,
    showMinimize: true,
    showMaximize: true, 
    showClose: true,
    showHelp: false
  }, props);
  
  const [local, others] = splitProps(merged, [
    'title',
    'active',
    'showMinimize',
    'showMaximize',
    'showClose', 
    'showHelp',
    'onClose',
    'onMinimize',
    'onMaximize',
    'onRestore',
    'onHelp',
    'class',
    'children'
  ]);

  return (
    <div
      class={cn(
        'title-bar',
        !local.active && 'inactive',
        local.class
      )}
      {...others}
    >
      <div class="title-bar-text">
        {local.title || local.children}
      </div>
      <div class="title-bar-controls">
        <Show when={local.showHelp}>
          <button 
            aria-label="Help"
            class="help"
            onClick={local.onHelp}
          />
        </Show>
        <Show when={local.showMinimize}>
          <button 
            aria-label="Minimize"
            class="minimize"
            onClick={local.onMinimize}
          />
        </Show>
        <Show when={local.showMaximize}>
          <button 
            aria-label="Maximize"
            class="maximize"
            onClick={local.onMaximize}
          />
        </Show>
        <Show when={local.showClose}>
          <button 
            aria-label="Close"
            class="close"
            onClick={local.onClose}
          />
        </Show>
      </div>
    </div>
  );
}