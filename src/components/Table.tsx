import { mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { TableProps, TableColumn } from '../types';

export function Table<T = Record<string, unknown>>(props: TableProps<T>) {
  const merged = mergeProps({ 
    data: [],
    columns: [],
    striped: false,
    bordered: true,
    hoverable: false,
    sortOrder: 'asc' as const
  }, props);
  const [local, others] = splitProps(merged, [
    'data', 
    'columns', 
    'striped', 
    'bordered', 
    'hoverable', 
    'sortBy', 
    'sortOrder', 
    'onSort', 
    'onRowClick', 
    'onRowDoubleClick',
    'selectedRow', 
    'class', 
    'children'
  ]);

  const tableClasses = cn(
    'win98-table',
    local.striped && 'win98-table-striped',
    local.bordered && 'win98-table-bordered',
    local.hoverable && 'win98-table-hoverable',
    local.class
  );

  const handleHeaderClick = (column: TableColumn<T>) => {
    if (column.sortable && local.onSort) {
      local.onSort(column.key);
    }
  };

  const getSortIndicator = (columnKey: string) => {
    if (local.sortBy === columnKey) {
      return local.sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const getCellValue = (item: T, column: TableColumn<T>, index: number) => {
    if (column.render) {
      return column.render((item as Record<string, unknown>)[column.key], item, index);
    }
    return String((item as Record<string, unknown>)[column.key] ?? '');
  };

  return (
    <div class="win98-table-container">
      <table class={tableClasses} {...others}>
        <Show when={local.columns && local.columns.length > 0}>
          <thead>
            <tr>
              <For each={local.columns}>
                {(column) => (
                  <th
                    class={cn(
                      'win98-table-header',
                      column.sortable && 'win98-table-sortable'
                    )}
                    style={{
                      width: column.width 
                        ? (typeof column.width === 'number' ? `${column.width}px` : column.width)
                        : undefined
                    }}
                    onClick={() => handleHeaderClick(column)}
                  >
                    {column.header}{getSortIndicator(column.key)}
                  </th>
                )}
              </For>
            </tr>
          </thead>
        </Show>
        
        <tbody>
          <Show when={local.data && local.data.length > 0}>
            <For each={local.data}>
              {(item, index) => (
                <tr
                  class={cn(
                    'win98-table-row',
                    local.selectedRow === index() && 'win98-table-row-selected',
                    (local.onRowClick || local.onRowDoubleClick) && 'win98-table-row-clickable'
                  )}
                  onClick={() => local.onRowClick?.(item, index())}
                  onDblClick={() => local.onRowDoubleClick?.(item, index())}
                >
                  <For each={local.columns}>
                    {(column) => (
                      <td class="win98-table-cell">
                        {getCellValue(item, column, index())}
                      </td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </Show>
          
          <Show when={!local.data || local.data.length === 0}>
            <tr>
              <td 
                class="win98-table-empty" 
                colSpan={local.columns?.length || 1}
              >
                No data available
              </td>
            </tr>
          </Show>
        </tbody>
        
        <Show when={local.children}>
          {local.children}
        </Show>
      </table>
    </div>
  );
}

// Table component styles (to be added to the main CSS or as a separate style)
const tableStyles = `
.win98-table-container {
  background: #fff;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  padding: 2px;
  overflow: auto;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Pixelated MS Sans Serif", Arial;
  font-size: 11px;
  background: #fff;
}

.win98-table-bordered {
  border: 1px solid #000;
}

.win98-table-header {
  background: silver;
  border: 1px outset silver;
  padding: 4px 8px;
  text-align: left;
  font-weight: bold;
  position: relative;
  user-select: none;
}

.win98-table-sortable {
  cursor: pointer;
}

.win98-table-sortable:hover {
  background: #dfdfdf;
}

.win98-table-sortable:active {
  border: 1px inset silver;
  background: #c0c7c8;
}

.win98-table-cell {
  padding: 4px 8px;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
}

.win98-table-row {
  background: #fff;
}

.win98-table-striped .win98-table-row:nth-child(even) {
  background: #f8f8f8;
}

.win98-table-row-clickable {
  cursor: pointer;
}

.win98-table-hoverable .win98-table-row:hover {
  background: #dfdfdf;
}

.win98-table-row-selected {
  background: navy !important;
  color: #fff;
}

.win98-table-empty {
  text-align: center;
  color: grey;
  font-style: italic;
  padding: 16px;
}
`;

export { tableStyles };