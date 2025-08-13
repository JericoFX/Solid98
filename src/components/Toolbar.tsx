import { mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { ToolbarProps, ToolbarItem } from '../types';

export function Toolbar(props: ToolbarProps) {
  const merged = mergeProps({ 
    items: [],
    vertical: false,
    size: 'medium' as const
  }, props);

  const [local, others] = splitProps(merged, [
    'items',
    'vertical',
    'size',
    'class',
    'onItemClick'
  ]);

  const handleItemClick = (item: ToolbarItem) => {
    if (item.disabled) return;
    
    item.onClick?.();
    local.onItemClick?.(item);
  };

  const renderToolbarItem = (item: ToolbarItem) => {
    switch (item.type) {
      case 'separator':
        return <hr class={cn('toolbar-separator', local.vertical && 'vertical')} />;
      
      case 'button':
      case 'toggle':
        return (
          <button
            class={cn(
              'toolbar-button',
              item.type === 'toggle' && item.active && 'active',
              item.disabled && 'disabled',
              `size-${local.size}`
            )}
            disabled={item.disabled}
            title={item.tooltip}
            onClick={() => handleItemClick(item)}
          >
            <Show when={item.icon}>
              <span class="toolbar-icon">{item.icon}</span>
            </Show>
            <Show when={item.label && local.size !== 'small'}>
              <span class="toolbar-label">{item.label}</span>
            </Show>
          </button>
        );
      
      case 'dropdown':
        return (
          <div class="toolbar-dropdown">
            <button
              class={cn(
                'toolbar-button',
                'dropdown-toggle',
                item.disabled && 'disabled',
                `size-${local.size}`
              )}
              disabled={item.disabled}
              title={item.tooltip}
              onClick={() => handleItemClick(item)}
            >
              <Show when={item.icon}>
                <span class="toolbar-icon">{item.icon}</span>
              </Show>
              <Show when={item.label && local.size !== 'small'}>
                <span class="toolbar-label">{item.label}</span>
              </Show>
              <span class="dropdown-arrow">▼</span>
            </button>
            {/* Dropdown menu would need additional state management */}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      class={cn(
        'toolbar',
        local.vertical && 'vertical',
        `size-${local.size}`,
        local.class
      )}
      {...others}
    >
      <For each={local.items}>
        {(item) => renderToolbarItem(item)}
      </For>
    </div>
  );
}