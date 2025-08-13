import { createSignal, mergeProps, splitProps, For, Show, onCleanup } from 'solid-js';
import { cn } from '../utils/cn';
import { MenuBarProps, MenuItem } from '../types';

export function MenuBar(props: MenuBarProps) {
  const merged = mergeProps({ items: [] }, props);
  const [local, others] = splitProps(merged, ['items', 'class', 'onMenuSelect']);
  
  const [activeMenu, setActiveMenu] = createSignal<string | null>(null);
  const [menuPosition, setMenuPosition] = createSignal({ x: 0, y: 0 });

  // Close menu when clicking outside
  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.menubar') && !target.closest('.dropdown-menu')) {
      setActiveMenu(null);
    }
  };

  document.addEventListener('click', handleDocumentClick);
  onCleanup(() => document.removeEventListener('click', handleDocumentClick));

  const handleMenuClick = (menuId: string, event: MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setActiveMenu(activeMenu() === menuId ? null : menuId);
  };

  const handleMenuItemClick = (item: MenuItem, menuId: string) => {
    if (item.disabled || item.separator) return;
    
    item.onClick?.();
    local.onMenuSelect?.(menuId, item);
    setActiveMenu(null);
  };

  return (
    <div class={cn('menubar', local.class)} {...others}>
      <For each={local.items}>
        {(menu) => (
          <div class="menu-container">
            <button
              class={cn('menu-button', activeMenu() === menu.id && 'active')}
              onClick={(e) => handleMenuClick(menu.id, e)}
              disabled={menu.disabled}
            >
              {menu.label}
            </button>
            
            <Show when={activeMenu() === menu.id && menu.submenu}>
              <div 
                class="dropdown-menu"
                style={{
                  position: 'fixed',
                  left: `${menuPosition().x}px`,
                  top: `${menuPosition().y}px`,
                  'z-index': '1000'
                }}
              >
                <For each={menu.submenu}>
                  {(item) => (
                    <>
                      <Show when={item.separator}>
                        <hr class="menu-separator" />
                      </Show>
                      <Show when={!item.separator}>
                        <div
                          class={cn('menu-item', item.disabled && 'disabled')}
                          onClick={() => handleMenuItemClick(item, menu.id)}
                        >
                          <span class="menu-label">{item.label}</span>
                          <Show when={item.shortcut}>
                            <span class="menu-shortcut">{item.shortcut}</span>
                          </Show>
                          <Show when={item.submenu && item.submenu.length > 0}>
                            <span class="menu-arrow">▶</span>
                          </Show>
                        </div>
                      </Show>
                    </>
                  )}
                </For>
              </div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}