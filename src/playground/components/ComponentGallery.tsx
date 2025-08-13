import { Component, createSignal, createMemo, For, ErrorBoundary } from 'solid-js';
import { ComponentCard } from './ComponentCard';
import { 
  Button, 
  Window, 
  Checkbox, 
  Radio, 
  Select, 
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

interface ComponentInfo {
  id: string;
  title: string;
  description: string;
  category: string;
  preview: () => any;
  codeSnippet: string;
  searchTerms: string[];
}

export const ComponentGallery: Component = () => {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [selectedCategory, setSelectedCategory] = createSignal('all');

  // Sample data for components
  const sampleTreeData: TreeNode[] = [
    { id: '1', label: 'Folder 1', children: [{ id: '1-1', label: 'File 1.txt' }] }
  ];

  const sampleTableData = [
    { name: 'file.txt', type: 'Text Document', size: '1 KB' }
  ];

  const sampleTableColumns: TableColumn<any>[] = [
    { key: 'name', header: 'Name', sortable: true, width: '50%' },
    { key: 'type', header: 'Type', width: '30%' },
    { key: 'size', header: 'Size', width: '20%' }
  ];

  const components: ComponentInfo[] = [
    // Basic UI
    {
      id: 'button',
      title: 'Button',
      description: 'Classic Windows 98 buttons with hover states and variants.',
      category: 'Basic UI',
      preview: () => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="default">Default</Button>
          <Button>Normal</Button>
        </div>
      ),
      codeSnippet: `<Button variant="default">Default</Button>\n<Button>Normal</Button>`,
      searchTerms: ['button', 'click', 'action', 'submit']
    },
    {
      id: 'checkbox',
      title: 'Checkbox',
      description: 'Windows 98 style checkboxes with labels.',
      category: 'Basic UI',
      preview: () => <Checkbox id="preview-check" label="Check me!" checked={false} />,
      codeSnippet: `<Checkbox id="my-checkbox" label="Check me!" checked={false} onChange={(e) => console.log(e.target.checked)} />`,
      searchTerms: ['checkbox', 'check', 'toggle', 'boolean']
    },
    {
      id: 'radio',
      title: 'Radio Button',
      description: 'Radio buttons for exclusive selections.',
      category: 'Basic UI',
      preview: () => (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Radio id="r1" name="preview" value="1" label="Option 1" checked={true} />
          <Radio id="r2" name="preview" value="2" label="Option 2" checked={false} />
        </div>
      ),
      codeSnippet: `<Radio id="radio1" name="group" value="option1" label="Option 1" checked={true} />\n<Radio id="radio2" name="group" value="option2" label="Option 2" checked={false} />`,
      searchTerms: ['radio', 'option', 'select', 'choice']
    },
    {
      id: 'select',
      title: 'Select Dropdown',
      description: 'Dropdown select boxes with Windows 98 styling.',
      category: 'Basic UI',
      preview: () => (
        <Select options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2', selected: true }
        ]} />
      ),
      codeSnippet: `<Select options={[\n  { value: 'option1', label: 'First Option' },\n  { value: 'option2', label: 'Second Option', selected: true }\n]} />`,
      searchTerms: ['select', 'dropdown', 'combobox', 'options']
    },
    {
      id: 'slider',
      title: 'Slider',
      description: 'Range sliders with optional box indicators.',
      category: 'Basic UI',
      preview: () => <Slider value={50} />,
      codeSnippet: `<Slider value={50} onInput={(e) => setValue(e.target.value)} />\n<Slider boxIndicator value={25} />`,
      searchTerms: ['slider', 'range', 'input', 'value']
    },
    {
      id: 'fieldrow',
      title: 'Field Row',
      description: 'Layout component for organizing form elements.',
      category: 'Basic UI',
      preview: () => (
        <FieldRow>
          <label>Name:</label>
          <input type="text" value="Example" style={{ width: '100px' }} />
        </FieldRow>
      ),
      codeSnippet: `<FieldRow>\n  <label>Label:</label>\n  <input type="text" />\n</FieldRow>`,
      searchTerms: ['fieldrow', 'form', 'layout', 'label']
    },

    // Windows
    {
      id: 'window',
      title: 'Window',
      description: 'Classic Windows 98 windows with title bars and controls.',
      category: 'Windows',
      preview: () => (
        <div style={{ transform: 'scale(0.7)', 'transform-origin': 'top left' }}>
          <Window title="Example" active style={{ width: '200px', height: '100px' }}>
            <div style={{ padding: '8px' }}>Window content</div>
          </Window>
        </div>
      ),
      codeSnippet: `<Window title="My Window" active>\n  <div>Window content here</div>\n</Window>`,
      searchTerms: ['window', 'dialog', 'frame', 'container']
    },
    {
      id: 'sunkenpanel',
      title: 'Sunken Panel',
      description: 'Inset panels for grouping content.',
      category: 'Windows',
      preview: () => (
        <SunkenPanel style={{ width: '120px', height: '40px', padding: '4px' }}>
          Panel content
        </SunkenPanel>
      ),
      codeSnippet: `<SunkenPanel>\n  <p>Content inside panel</p>\n</SunkenPanel>`,
      searchTerms: ['panel', 'sunken', 'inset', 'container']
    },

    // Progress & Status
    {
      id: 'progressbar',
      title: 'Progress Bar',
      description: 'Progress indicators with optional segmentation.',
      category: 'Status',
      preview: () => <ProgressBar value={75} style={{ width: '120px' }} />,
      codeSnippet: `<ProgressBar value={75} />\n<ProgressBar value={60} segmented />`,
      searchTerms: ['progress', 'bar', 'loading', 'percentage']
    },
    {
      id: 'statusbar',
      title: 'Status Bar',
      description: 'Bottom status bars with field divisions.',
      category: 'Status',
      preview: () => <StatusBar fields={['Ready', 'NUM']} />,
      codeSnippet: `<StatusBar fields={['Ready', 'NUM', 'CAPS']} />`,
      searchTerms: ['status', 'bar', 'footer', 'fields']
    },

    // Advanced Components
    {
      id: 'treeview',
      title: 'Tree View',
      description: 'Hierarchical tree navigation.',
      category: 'Advanced',
      preview: () => (
        <div style={{ width: '150px', height: '80px', overflow: 'hidden' }}>
          <TreeView data={sampleTreeData} />
        </div>
      ),
      codeSnippet: `<TreeView \n  data={treeData}\n  onNodeClick={(node) => console.log(node)}\n  onNodeDoubleClick={(node) => openNode(node)}\n/>`,
      searchTerms: ['tree', 'hierarchy', 'navigation', 'folder']
    },
    {
      id: 'tabs',
      title: 'Tabs',
      description: 'Tabbed interface navigation.',
      category: 'Advanced',
      preview: () => (
        <div style={{ width: '200px' }}>
          <Tabs selectedTab="tab1">
            <Tab id="tab1" label="Tab 1" selected={true} onClick={() => {}} />
            <Tab id="tab2" label="Tab 2" selected={false} onClick={() => {}} />
          </Tabs>
        </div>
      ),
      codeSnippet: `<Tabs selectedTab={selectedTab()}>\n  <Tab id="tab1" label="Tab 1" selected={true} onClick={setTab} />\n  <Tab id="tab2" label="Tab 2" selected={false} onClick={setTab} />\n</Tabs>`,
      searchTerms: ['tabs', 'navigation', 'pages', 'sections']
    },
    {
      id: 'table',
      title: 'Table',
      description: 'Data tables with sorting and selection.',
      category: 'Advanced',
      preview: () => (
        <div style={{ width: '180px', height: '80px', overflow: 'hidden' }}>
          <Table
            data={sampleTableData}
            columns={sampleTableColumns}
            striped
          />
        </div>
      ),
      codeSnippet: `<Table\n  data={tableData}\n  columns={columns}\n  striped\n  hoverable\n  sortBy={sortBy()}\n  onSort={handleSort}\n/>`,
      searchTerms: ['table', 'data', 'grid', 'sort', 'list']
    }
  ];

  const categories = () => [
    'all',
    ...Array.from(new Set(components.map(c => c.category)))
  ];

  const filteredComponents = createMemo(() => {
    return components.filter(component => {
      const matchesSearch = searchTerm() === '' || 
        component.title.toLowerCase().includes(searchTerm().toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm().toLowerCase()) ||
        component.searchTerms.some(term => term.toLowerCase().includes(searchTerm().toLowerCase()));
      
      const matchesCategory = selectedCategory() === 'all' || 
        component.category === selectedCategory();

      return matchesSearch && matchesCategory;
    });
  });

  const openPlayground = (componentId: string) => {
    console.log('Opening playground for:', componentId);
    // This would be handled by parent component
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  // Simple error fallback for component previews
  const PreviewErrorFallback = () => (
    <div style={{
      padding: '8px',
      'background-color': '#fff3cd',
      border: '1px solid #ffeaa7',
      'text-align': 'center',
      'font-size': '11px',
      color: '#856404'
    }}>
      Preview failed to load
    </div>
  );

  return (
    <div class="component-gallery">
      {/* Search and Filter Controls */}
      <div style={{
        padding: '16px',
        'background-color': '#c0c0c0',
        border: '2px inset #c0c0c0',
        'margin-bottom': '16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          'align-items': 'center',
          'flex-wrap': 'wrap'
        }}>
          <FieldRow>
            <label style={{ 'font-weight': 'bold', 'min-width': '50px' }}>Search:</label>
            <input 
              type="text"
              value={searchTerm()}
              onInput={(e) => setSearchTerm(e.currentTarget.value)}
              placeholder="Find components..."
              style={{ width: '200px' }}
            />
          </FieldRow>

          <FieldRow>
            <label style={{ 'font-weight': 'bold', 'min-width': '70px' }}>Category:</label>
            <Select 
              options={categories().map(cat => ({
                value: cat,
                label: cat === 'all' ? 'All Categories' : cat,
                selected: cat === selectedCategory()
              }))}
              onChange={(e) => setSelectedCategory(e.currentTarget.value)}
            />
          </FieldRow>
        </div>

        <div style={{ 'margin-top': '8px', 'font-size': '11px', color: '#666' }}>
          Showing {filteredComponents().length} of {components.length} components
        </div>
      </div>

      {/* Component Grid */}
      <div style={{
        display: 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px',
        padding: '0 16px'
      }}>
        <For each={filteredComponents()}>
          {(component) => (
            <ErrorBoundary fallback={PreviewErrorFallback}>
              <ComponentCard
                title={component.title}
                description={component.description}
                category={component.category}
                preview={
                  <ErrorBoundary fallback={PreviewErrorFallback}>
                    {component.preview()}
                  </ErrorBoundary>
                }
                codeSnippet={component.codeSnippet}
                onPlayground={() => openPlayground(component.id)}
                onCopyCode={() => copyToClipboard(component.codeSnippet)}
              />
            </ErrorBoundary>
          )}
        </For>
      </div>

      {filteredComponents().length === 0 && (
        <div style={{
          'text-align': 'center',
          padding: '40px',
          'font-size': '14px',
          color: '#666'
        }}>
          <div style={{ 'font-size': '32px', 'margin-bottom': '16px' }}>🔍</div>
          <div>No components found matching your search.</div>
          <div style={{ 'margin-top': '8px', 'font-size': '11px' }}>
            Try adjusting your search terms or category filter.
          </div>
        </div>
      )}
    </div>
  );
};