import { createSignal, mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { ListBoxProps, ListBoxItem } from '../types';

export function ListBox(props: ListBoxProps) {
  const merged = mergeProps({ 
    items: [],
    multiSelect: false,
    disabled: false,
    size: 4
  }, props);

  const [local, others] = splitProps(merged, [
    'items',
    'multiSelect',
    'disabled',
    'size',
    'class',
    'onSelectionChange',
    'onItemClick',
    'onItemDoubleClick'
  ]);

  const [selectedItems, setSelectedItems] = createSignal<(string | number)[]>(
    local.items.filter(item => item.selected).map(item => item.id)
  );

  const handleItemClick = (item: ListBoxItem, event: MouseEvent) => {
    if (item.disabled || local.disabled) return;

    let newSelection: (string | number)[];

    if (local.multiSelect) {
      if (event.ctrlKey) {
        // Toggle selection with Ctrl+click
        newSelection = selectedItems().includes(item.id)
          ? selectedItems().filter(id => id !== item.id)
          : [...selectedItems(), item.id];
      } else if (event.shiftKey && selectedItems().length > 0) {
        // Range selection with Shift+click
        const lastSelected = selectedItems()[selectedItems().length - 1];
        const lastIndex = local.items.findIndex(i => i.id === lastSelected);
        const currentIndex = local.items.findIndex(i => i.id === item.id);
        const start = Math.min(lastIndex, currentIndex);
        const end = Math.max(lastIndex, currentIndex);
        
        newSelection = local.items
          .slice(start, end + 1)
          .map(i => i.id);
      } else {
        // Single selection
        newSelection = [item.id];
      }
    } else {
      // Single select mode
      newSelection = [item.id];
    }

    setSelectedItems(newSelection);
    
    const selectedItemObjects = local.items.filter(i => newSelection.includes(i.id));
    local.onSelectionChange?.(selectedItemObjects);
    local.onItemClick?.(item);
  };

  const handleItemDoubleClick = (item: ListBoxItem) => {
    if (item.disabled || local.disabled) return;
    local.onItemDoubleClick?.(item);
  };

  return (
    <div
      class={cn('listbox', local.disabled && 'disabled', local.class)}
      style={{
        height: `${local.size * 1.2 + 0.2}em`, // Approximate height based on size
        overflow: 'auto'
      }}
      {...others}
    >
      <For each={local.items}>
        {(item) => (
          <div
            class={cn(
              'listbox-item',
              selectedItems().includes(item.id) && 'selected',
              item.disabled && 'disabled'
            )}
            onClick={(e) => handleItemClick(item, e)}
            onDblClick={() => handleItemDoubleClick(item)}
            data-value={item.value}
          >
            <Show when={item.icon}>
              <span class="listbox-item-icon">{item.icon}</span>
            </Show>
            <span class="listbox-item-label">{item.label}</span>
          </div>
        )}
      </For>
      
      <Show when={local.items.length === 0}>
        <div class="listbox-empty">No items</div>
      </Show>
    </div>
  );
}