import { JSX, mergeProps, splitProps, For, Show, createSignal } from 'solid-js';
import { cn } from '../utils/cn';
import { TreeViewProps, TreeNode } from '../types';

export function TreeView(props: TreeViewProps) {
  const merged = mergeProps({ data: [] }, props);
  const [local, others] = splitProps(merged, ['data', 'class', 'children']);

  const TreeNodeComponent = (nodeProps: { node: TreeNode; isRoot?: boolean }) => {
    const [isExpanded, setIsExpanded] = createSignal(nodeProps.node.expanded ?? false);
    const hasChildren = nodeProps.node.children && nodeProps.node.children.length > 0;
    
    const handleToggle = () => {
      if (hasChildren) {
        setIsExpanded(!isExpanded());
      }
    };

    if (hasChildren) {
      return (
        <li>
          <details open={isExpanded()}>
            <summary onClick={handleToggle} class={cn(nodeProps.node.selected && 'selected')}>
              {nodeProps.node.label}
            </summary>
            <ul>
              <For each={nodeProps.node.children}>
                {(child) => <TreeNodeComponent node={child} />}
              </For>
            </ul>
          </details>
        </li>
      );
    }

    return (
      <li>
        <a href="#" onClick={(e) => e.preventDefault()} class={cn(nodeProps.node.selected && 'selected')}>
          {nodeProps.node.label}
        </a>
      </li>
    );
  };

  return (
    <ul
      class={cn('tree-view', local.class)}
      {...others}
    >
      <Show when={local.data && local.data.length > 0}>
        <For each={local.data}>
          {(node) => <TreeNodeComponent node={node} isRoot={true} />}
        </For>
      </Show>
      <Show when={!local.data || local.data.length === 0}>
        {local.children}
      </Show>
    </ul>
  );
}