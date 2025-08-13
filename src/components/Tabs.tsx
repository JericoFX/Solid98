import { mergeProps, splitProps } from 'solid-js';
import { cn } from '../utils/cn';
import { TabsProps } from '../types';

export function Tabs(props: TabsProps) {
  const merged = mergeProps({ multirows: false }, props);
  const [local, others] = splitProps(merged, [
    'multirows',
    'selectedTab',
    'onTabSelect', 
    'class',
    'children'
  ]);

  return (
    <menu
      role="tablist"
      class={cn(
        local.multirows && 'multirows',
        local.class
      )}
      {...others}
    >
      {local.children}
    </menu>
  );
}

export function Tab(props: { 
  id: string; 
  label: string; 
  selected?: boolean; 
  class?: string;
  onClick?: (id: string) => void;
}) {
  const [local, others] = splitProps(props, ['id', 'label', 'selected', 'onClick', 'class']);

  return (
    <li
      role="tab"
      aria-selected={local.selected}
      class={local.class}
      {...others}
    >
      <a 
        href="#tabs" 
        onClick={(e) => {
          e.preventDefault();
          local.onClick?.(local.id);
        }}
      >
        {local.label}
      </a>
    </li>
  );
}