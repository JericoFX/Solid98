import { Component, createSignal, createMemo, Switch, Match } from 'solid-js';
import { 
  Button, 
  Window, 
  Checkbox, 
  Slider, 
  ProgressBar, 
  SunkenPanel, 
  StatusBar,
  TreeView,
  Tabs,
  Tab,
  Table,
  FieldRow
} from '../../index';
import { TreeNode, TableColumn } from '../../types';

interface PlaygroundProps {
  componentId: string;
  onClose: () => void;
}

export const ComponentPlayground: Component<PlaygroundProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal('preview');

  // Interactive states for different components
  const [sliderValue, setSliderValue] = createSignal(50);
  const [checkboxChecked, setCheckboxChecked] = createSignal(false);
  const [progressValue, setProgressValue] = createSignal(75);
  const [selectedTabDemo, setSelectedTabDemo] = createSignal('tab1');

  // Sample data
  const treeData: TreeNode[] = [
    {
      id: '1',
      label: 'Root Folder',
      expanded: true,
      children: [
        { id: '1-1', label: 'Documents', selected: true },
        { id: '1-2', label: 'Pictures' },
      ]
    }
  ];

  const tableData = [
    { name: 'file1.txt', type: 'Text Document', size: '1 KB', date: '01/15/2024' },
    { name: 'image.jpg', type: 'JPEG Image', size: '256 KB', date: '01/14/2024' },
  ];

  const tableColumns: TableColumn<any>[] = [
    { key: 'name', header: 'Name', sortable: true, width: '40%' },
    { key: 'type', header: 'Type', width: '30%' },
    { key: 'size', header: 'Size', width: '15%' },
    { key: 'date', header: 'Date', width: '15%' }
  ];

  const getComponentContent = createMemo(() => {
    switch (props.componentId) {
      case 'button':
        return {
          component: (
            <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="default">Default Button</Button>
                <Button>Normal Button</Button>
                <Button disabled>Disabled Button</Button>
              </div>
              <div>
                <Button onClick={() => alert('Button clicked!')}>
                  Interactive Button
                </Button>
              </div>
            </div>
          ),
          code: `<Button variant="default">Default Button</Button>
<Button>Normal Button</Button>
<Button disabled>Disabled Button</Button>
<Button onClick={() => alert('Clicked!')}>Interactive Button</Button>`,
          props: [
            { name: 'variant', type: 'string', default: 'undefined', description: 'Button style variant (default | undefined)' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
            { name: 'onClick', type: 'function', default: 'undefined', description: 'Click handler function' }
          ]
        };

      case 'checkbox':
        return {
          component: (
            <div style={{ padding: '16px' }}>
              <FieldRow>
                <Checkbox 
                  id="playground-checkbox"
                  label="Interactive Checkbox"
                  checked={checkboxChecked()}
                  onChange={(e) => setCheckboxChecked(e.currentTarget.checked)}
                />
              </FieldRow>
              <div style={{ 'margin-top': '8px', 'font-size': '11px' }}>
                Current state: {checkboxChecked() ? 'Checked' : 'Unchecked'}
              </div>
            </div>
          ),
          code: `<Checkbox 
  id="my-checkbox"
  label="Interactive Checkbox"
  checked={checked()}
  onChange={(e) => setChecked(e.currentTarget.checked)}
/>`,
          props: [
            { name: 'id', type: 'string', default: 'required', description: 'Unique identifier for the checkbox' },
            { name: 'label', type: 'string', default: 'undefined', description: 'Label text for the checkbox' },
            { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
            { name: 'onChange', type: 'function', default: 'undefined', description: 'Change event handler' }
          ]
        };

      case 'slider':
        return {
          component: (
            <div style={{ padding: '16px' }}>
              <FieldRow>
                <label>Value: {sliderValue()}</label>
                <Slider 
                  value={sliderValue()}
                  min={0}
                  max={100}
                  onInput={(e) => setSliderValue(parseInt(e.currentTarget.value))}
                />
              </FieldRow>
              <FieldRow>
                <label>Box Indicator:</label>
                <Slider boxIndicator value={25} min={0} max={100} />
              </FieldRow>
            </div>
          ),
          code: `<Slider 
  value={sliderValue()}
  min={0}
  max={100}
  onInput={(e) => setSliderValue(parseInt(e.currentTarget.value))}
/>
<Slider boxIndicator value={25} />`,
          props: [
            { name: 'value', type: 'number', default: '0', description: 'Current slider value' },
            { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
            { name: 'boxIndicator', type: 'boolean', default: 'false', description: 'Show box-style indicator' },
            { name: 'onInput', type: 'function', default: 'undefined', description: 'Input event handler' }
          ]
        };

      case 'progressbar':
        return {
          component: (
            <div style={{ padding: '16px' }}>
              <div style={{ 'margin-bottom': '16px' }}>
                <label>Progress: {progressValue()}%</label>
                <ProgressBar value={progressValue()} />
              </div>
              <div style={{ 'margin-bottom': '16px' }}>
                <label>Segmented Progress:</label>
                <ProgressBar value={60} segmented />
              </div>
              <Button onClick={() => setProgressValue(Math.random() * 100)}>
                Random Progress
              </Button>
            </div>
          ),
          code: `<ProgressBar value={progressValue()} />
<ProgressBar value={60} segmented />`,
          props: [
            { name: 'value', type: 'number', default: '0', description: 'Progress value (0-100)' },
            { name: 'segmented', type: 'boolean', default: 'false', description: 'Show segmented style' }
          ]
        };

      case 'treeview':
        return {
          component: (
            <div style={{ padding: '16px', height: '200px' }}>
              <TreeView 
                data={treeData}
                onNodeClick={(node) => console.log('Clicked:', node.label)}
                onNodeDoubleClick={(node) => console.log('Double-clicked:', node.label)}
              />
            </div>
          ),
          code: `<TreeView 
  data={treeData}
  onNodeClick={(node) => console.log('Clicked:', node.label)}
  onNodeDoubleClick={(node) => console.log('Double-clicked:', node.label)}
/>`,
          props: [
            { name: 'data', type: 'TreeNode[]', default: 'required', description: 'Array of tree node data' },
            { name: 'onNodeClick', type: 'function', default: 'undefined', description: 'Node click handler' },
            { name: 'onNodeDoubleClick', type: 'function', default: 'undefined', description: 'Node double-click handler' }
          ]
        };

      case 'tabs':
        return {
          component: (
            <div style={{ padding: '16px' }}>
              <Tabs selectedTab={selectedTabDemo()}>
                <Tab 
                  id="tab1" 
                  label="First Tab" 
                  selected={selectedTabDemo() === 'tab1'}
                  onClick={(id) => setSelectedTabDemo(id)}
                />
                <Tab 
                  id="tab2" 
                  label="Second Tab"
                  selected={selectedTabDemo() === 'tab2'}
                  onClick={(id) => setSelectedTabDemo(id)}
                />
                <Tab 
                  id="tab3" 
                  label="Third Tab"
                  selected={selectedTabDemo() === 'tab3'}
                  onClick={(id) => setSelectedTabDemo(id)}
                />
              </Tabs>
              
              <div class="window" role="tabpanel" style={{ 'margin-top': '0' }}>
                <div class="window-body" style={{ padding: '16px' }}>
                  <Switch>
                    <Match when={selectedTabDemo() === 'tab1'}>
                      <h4>First Tab Content</h4>
                      <p>This is the content for the first tab.</p>
                    </Match>
                    <Match when={selectedTabDemo() === 'tab2'}>
                      <h4>Second Tab Content</h4>
                      <p>This is the content for the second tab.</p>
                    </Match>
                    <Match when={selectedTabDemo() === 'tab3'}>
                      <h4>Third Tab Content</h4>
                      <p>This is the content for the third tab.</p>
                    </Match>
                  </Switch>
                </div>
              </div>
            </div>
          ),
          code: `<Tabs selectedTab={selectedTab()}>
  <Tab 
    id="tab1" 
    label="First Tab" 
    selected={selectedTab() === 'tab1'}
    onClick={(id) => setSelectedTab(id)}
  />
  <Tab 
    id="tab2" 
    label="Second Tab"
    selected={selectedTab() === 'tab2'}
    onClick={(id) => setSelectedTab(id)}
  />
</Tabs>`,
          props: [
            { name: 'selectedTab', type: 'string', default: 'required', description: 'Currently selected tab ID' },
            { name: 'children', type: 'Tab[]', default: 'required', description: 'Tab components' }
          ]
        };

      case 'table':
        return {
          component: (
            <div style={{ padding: '16px' }}>
              <Table
                data={tableData}
                columns={tableColumns}
                striped
                hoverable
                onRowClick={(item) => console.log('Row clicked:', item)}
                onRowDoubleClick={(item) => console.log('Row double-clicked:', item)}
              />
            </div>
          ),
          code: `<Table
  data={tableData}
  columns={tableColumns}
  striped
  hoverable
  onRowClick={(item) => console.log('Row clicked:', item)}
  onRowDoubleClick={(item) => console.log('Row double-clicked:', item)}
/>`,
          props: [
            { name: 'data', type: 'T[]', default: 'required', description: 'Array of data objects' },
            { name: 'columns', type: 'TableColumn<T>[]', default: 'required', description: 'Column definitions' },
            { name: 'striped', type: 'boolean', default: 'false', description: 'Alternating row colors' },
            { name: 'hoverable', type: 'boolean', default: 'false', description: 'Row hover effects' },
            { name: 'onRowClick', type: 'function', default: 'undefined', description: 'Row click handler' }
          ]
        };

      default:
        return {
          component: <div style={{ padding: '16px' }}>Component not found</div>,
          code: '// Component not found',
          props: []
        };
    }
  });

  const copyCode = () => {
    navigator.clipboard.writeText(getComponentContent().code);
  };

  return (
    <Window 
      title={`🧪 Playground: ${props.componentId}`}
      active
      onClose={props.onClose}
      style={{ width: '800px', height: '600px' }}
    >
      <div style={{ height: '100%', display: 'flex', 'flex-direction': 'column' }}>
        {/* Tab Navigation */}
        <Tabs selectedTab={activeTab()}>
          <Tab 
            id="preview" 
            label="Preview" 
            selected={activeTab() === 'preview'}
            onClick={(id) => setActiveTab(id)}
          />
          <Tab 
            id="code" 
            label="Code"
            selected={activeTab() === 'code'}
            onClick={(id) => setActiveTab(id)}
          />
          <Tab 
            id="props" 
            label="Props"
            selected={activeTab() === 'props'}
            onClick={(id) => setActiveTab(id)}
          />
        </Tabs>

        {/* Tab Content */}
        <div style={{ 
          flex: '1', 
          overflow: 'auto',
          'background-color': '#fff' 
        }}>
          <Switch>
            <Match when={activeTab() === 'preview'}>
              <div style={{ padding: '16px' }}>
                <h4 style={{ 'margin-top': '0' }}>Interactive Preview</h4>
                <SunkenPanel style={{ 'background-color': '#f0f0f0', 'min-height': '200px' }}>
                  {getComponentContent().component}
                </SunkenPanel>
                <p style={{ 'font-size': '11px', 'margin-top': '8px', color: '#666' }}>
                  Interact with the component above to test its functionality.
                </p>
              </div>
            </Match>

            <Match when={activeTab() === 'code'}>
              <div style={{ padding: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  'justify-content': 'space-between', 
                  'align-items': 'center',
                  'margin-bottom': '12px' 
                }}>
                  <h4 style={{ margin: '0' }}>Code Example</h4>
                  <Button onClick={copyCode} style={{ 'font-size': '10px' }}>
                    📋 Copy Code
                  </Button>
                </div>
                <SunkenPanel style={{ 'background-color': '#fff' }}>
                  <pre style={{
                    margin: '0',
                    padding: '12px',
                    'font-family': 'monospace',
                    'font-size': '11px',
                    'line-height': '1.4',
                    'white-space': 'pre-wrap'
                  }}>
                    {getComponentContent().code}
                  </pre>
                </SunkenPanel>
              </div>
            </Match>

            <Match when={activeTab() === 'props'}>
              <div style={{ padding: '16px' }}>
                <h4 style={{ 'margin-top': '0' }}>Component Props</h4>
                {getComponentContent().props.length > 0 ? (
                  <Table
                    data={getComponentContent().props}
                    columns={[
                      { key: 'name', header: 'Prop Name', width: '25%' },
                      { key: 'type', header: 'Type', width: '20%' },
                      { key: 'default', header: 'Default', width: '15%' },
                      { key: 'description', header: 'Description', width: '40%' }
                    ]}
                    striped
                  />
                ) : (
                  <p style={{ color: '#666', 'font-style': 'italic' }}>
                    No props documentation available for this component.
                  </p>
                )}
              </div>
            </Match>
          </Switch>
        </div>

        <StatusBar fields={[`Component: ${props.componentId}`, `Tab: ${activeTab()}`, 'Ready']} />
      </div>
    </Window>
  );
};