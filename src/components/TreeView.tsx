import { JSX, mergeProps, splitProps, For, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { TreeViewProps, TreeNode } from '../types';

export function TreeView(props: TreeViewProps) {
  const merged = mergeProps({ data: [] }, props);
  const [local, others] = splitProps(merged, ['data', 'class', 'children']);

  const TreeNodeComponent = (nodeProps: { node: TreeNode; depth?: number }) => {
    const depth = nodeProps.depth || 0;
    
    return (
      <ul style={{ 'margin-left': depth > 0 ? '20px' : '0' }}>
        <li>
          <span class={cn(nodeProps.node.selected && 'highlighted')}>
            {nodeProps.node.label}
          </span>
          <Show when={nodeProps.node.children && nodeProps.node.expanded}>
            <For each={nodeProps.node.children}>
              {(child) => (
                <TreeNodeComponent node={child} depth={depth + 1} />
              )}
            </For>
          </Show>
        </li>
      </ul>
    );
  };

  return (
    <div
      class={cn('tree-view', local.class)}
      {...others}
    >
      <Show when={local.data && local.data.length > 0}>
        <For each={local.data}>
          {(node) => <TreeNodeComponent node={node} />}
        </For>
      </Show>
      <Show when={!local.data || local.data.length === 0}>
        {local.children}
      </Show>
    </div>
  );
}