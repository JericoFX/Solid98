import { JSX, mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { WindowProps } from '../types';
import { WindowHeader } from './WindowHeader';
import { StatusBar } from './StatusBar';

export function Window(props: WindowProps) {
  const merged = mergeProps({ active: true, resizable: false }, props);
  const [local, others] = splitProps(merged, [
    'title',
    'active', 
    'resizable',
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
        'window',
        !local.active && 'inactive',
        local.class
      )}
      {...others}
    >
      {local.title && (
        <WindowHeader
          title={local.title}
          active={local.active}
          showMinimize={local.showMinimize}
          showMaximize={local.showMaximize}
          showClose={local.showClose}
          showHelp={local.showHelp}
          onClose={local.onClose}
          onMinimize={local.onMinimize}
          onMaximize={local.onMaximize}
          onRestore={local.onRestore}
          onHelp={local.onHelp}
        />
      )}
      <div class="window-body">
        {local.children}
      </div>
    </div>
  );
}