import { Component, createSignal } from 'solid-js';
import { Button, Window, SunkenPanel } from '../../index';

interface QuickStartTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  code: string;
  preview: () => any;
}

export const QuickStart: Component = () => {
  const [selectedTemplate, setSelectedTemplate] = createSignal<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = createSignal<string | null>(null);

  const templates: QuickStartTemplate[] = [
    {
      id: 'hello-world',
      title: 'Hello World',
      description: 'A simple window with a button - perfect for getting started.',
      icon: '🪟',
      code: `import { Window, Button } from 'solid-98css';

export default function HelloWorld() {
  const [message, setMessage] = createSignal('Hello Windows 98!');

  return (
    <Window title="Hello World" active>
      <div style={{ padding: '16px' }}>
        <p>{message()}</p>
        <Button 
          variant="default" 
          onClick={() => setMessage('Button clicked!')}
        >
          Click Me!
        </Button>
      </div>
    </Window>
  );
}`,
      preview: () => (
        <div style={{ transform: 'scale(0.8)', 'transform-origin': 'top left' }}>
          <Window title="Hello World" active style={{ width: '200px', height: '120px' }}>
            <div style={{ padding: '12px' }}>
              <p style={{ 'margin-bottom': '8px', 'font-size': '11px' }}>Hello Windows 98!</p>
              <Button variant="default" style={{ 'font-size': '10px' }}>Click Me!</Button>
            </div>
          </Window>
        </div>
      )
    },
    {
      id: 'dialog-app',
      title: 'Dialog Application',
      description: 'Modal dialogs and alert system for user interactions.',
      icon: '💬',
      code: `import { Window, Button, Modal, Alert, FieldRow, createSignal } from 'solid-98css';

export default function DialogApp() {
  const [modalOpen, setModalOpen] = createSignal(false);
  const [alertOpen, setAlertOpen] = createSignal(false);

  return (
    <Window title="Dialog Demo" active>
      <div style={{ padding: '16px' }}>
        <FieldRow>
          <Button onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Button onClick={() => setAlertOpen(true)}>
            Show Alert
          </Button>
        </FieldRow>

        <Modal
          open={modalOpen()}
          title="Settings"
          onClose={() => setModalOpen(false)}
        >
          <div style={{ padding: '16px' }}>
            <p>Modal dialog content here.</p>
            <Button variant="default" onClick={() => setModalOpen(false)}>
              OK
            </Button>
          </div>
        </Modal>

        <Alert
          open={alertOpen()}
          type="info"
          title="Information"
          message="This is an info alert."
          onConfirm={() => setAlertOpen(false)}
        />
      </div>
    </Window>
  );
}`,
      preview: () => (
        <div style={{ transform: 'scale(0.8)', 'transform-origin': 'top left' }}>
          <Window title="Dialog Demo" active style={{ width: '180px', height: '100px' }}>
            <div style={{ padding: '8px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <Button style={{ 'font-size': '9px', padding: '2px 4px' }}>Modal</Button>
                <Button style={{ 'font-size': '9px', padding: '2px 4px' }}>Alert</Button>
              </div>
            </div>
          </Window>
        </div>
      )
    },
    {
      id: 'file-manager',
      title: 'File Manager',
      description: 'File explorer with navigation and directory browsing.',
      icon: '📁',
      code: `import { Window, FileExplorer, StatusBar, createSignal } from 'solid-98css';

export default function FileManager() {
  const [currentPath, setCurrentPath] = createSignal('');
  const [selectedFiles, setSelectedFiles] = createSignal([]);

  const fileData = [
    { name: 'Documents', type: 'folder', modified: new Date('2024-01-15') },
    { name: 'Pictures', type: 'folder', modified: new Date('2024-01-10') },
    { name: 'readme.txt', type: 'file', size: 1024, modified: new Date('2024-01-08') }
  ];

  return (
    <Window title="File Explorer" active>
      <FileExplorer
        data={fileData}
        currentPath={currentPath()}
        onNavigate={(path, item) => setCurrentPath(path)}
        onFileSelect={(item, selected) => setSelectedFiles(selected)}
      />
      <StatusBar fields={[\`\${selectedFiles().length} items selected\`, 'Ready']} />
    </Window>
  );
}`,
      preview: () => (
        <div style={{ transform: 'scale(0.7)', 'transform-origin': 'top left' }}>
          <Window title="File Explorer" active style={{ width: '220px', height: '140px' }}>
            <div style={{ padding: '4px', 'font-size': '9px' }}>
              <div style={{ 'margin-bottom': '4px' }}>📁 Documents</div>
              <div style={{ 'margin-bottom': '4px' }}>📁 Pictures</div>
              <div style={{ 'margin-bottom': '4px' }}>📄 readme.txt</div>
            </div>
            <div style={{ 
              'background-color': '#c0c0c0', 
              border: '1px inset #c0c0c0',
              padding: '2px 4px',
              'font-size': '8px'
            }}>
              Ready
            </div>
          </Window>
        </div>
      )
    },
    {
      id: 'form-demo',
      title: 'Form Application',
      description: 'Complete form with various input controls.',
      icon: '📝',
      code: `import { Window, FieldRow, Button, Checkbox, Radio, Select, createSignal } from 'solid-98css';

export default function FormApp() {
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    subscribe: false,
    plan: 'basic'
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData());
  };

  return (
    <Window title="User Registration" active>
      <div style={{ padding: '16px' }}>
        <FieldRow>
          <label>Name:</label>
          <input 
            type="text" 
            value={formData().name}
            onInput={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </FieldRow>

        <FieldRow>
          <label>Email:</label>
          <input type="email" />
        </FieldRow>

        <FieldRow>
          <Checkbox id="subscribe" label="Subscribe to newsletter" />
        </FieldRow>

        <FieldRow>
          <label>Plan:</label>
          <Select options={[
            { value: 'basic', label: 'Basic' },
            { value: 'premium', label: 'Premium' }
          ]} />
        </FieldRow>

        <FieldRow>
          <Button variant="default" onClick={handleSubmit}>Submit</Button>
          <Button>Cancel</Button>
        </FieldRow>
      </div>
    </Window>
  );
}`,
      preview: () => (
        <div style={{ transform: 'scale(0.7)', 'transform-origin': 'top left' }}>
          <Window title="User Registration" active style={{ width: '200px', height: '160px' }}>
            <div style={{ padding: '8px', 'font-size': '9px' }}>
              <div style={{ 'margin-bottom': '6px' }}>
                <label style={{ 'margin-right': '4px' }}>Name:</label>
                <input type="text" style={{ width: '80px', height: '14px' }} />
              </div>
              <div style={{ 'margin-bottom': '6px' }}>
                <label style={{ 'margin-right': '4px' }}>Email:</label>
                <input type="email" style={{ width: '80px', height: '14px' }} />
              </div>
              <div style={{ 'margin-bottom': '8px', display: 'flex', 'align-items': 'center' }}>
                <input type="checkbox" style={{ 'margin-right': '4px' }} />
                <label>Subscribe</label>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <Button variant="default" style={{ 'font-size': '8px', padding: '2px 4px' }}>Submit</Button>
                <Button style={{ 'font-size': '8px', padding: '2px 4px' }}>Cancel</Button>
              </div>
            </div>
          </Window>
        </div>
      )
    }
  ];

  const copyToClipboard = (code: string, templateId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTemplate(templateId);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  return (
    <div class="quick-start">
      {/* Header */}
      <div style={{
        padding: '16px',
        'background-color': '#c0c0c0',
        border: '2px inset #c0c0c0',
        'margin-bottom': '16px'
      }}>
        <h3 style={{
          margin: '0 0 8px 0',
          'font-family': 'MS Sans Serif, sans-serif',
          'font-size': '14px'
        }}>
          🚀 Quick Start Templates
        </h3>
        <p style={{
          margin: '0',
          'font-size': '11px',
          'line-height': '1.4',
          color: '#333'
        }}>
          Get started quickly with these pre-built templates. Copy the code and customize to your needs.
        </p>
      </div>

      {/* Template Grid */}
      <div style={{
        display: 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        padding: '0 16px'
      }}>
        {templates.map(template => (
          <div 
            class="template-card"
            style={{
              border: '2px outset #c0c0c0',
              'background-color': '#c0c0c0',
              padding: '12px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedTemplate(
              selectedTemplate() === template.id ? null : template.id
            )}
          >
            {/* Template Header */}
            <div style={{
              display: 'flex',
              'align-items': 'center',
              'margin-bottom': '8px'
            }}>
              <span style={{ 'font-size': '20px', 'margin-right': '8px' }}>
                {template.icon}
              </span>
              <h4 style={{
                margin: '0',
                'font-family': 'MS Sans Serif, sans-serif',
                'font-size': '12px',
                'font-weight': 'bold'
              }}>
                {template.title}
              </h4>
            </div>

            {/* Description */}
            <p style={{
              'font-size': '11px',
              'line-height': '1.3',
              'margin-bottom': '12px',
              color: '#333'
            }}>
              {template.description}
            </p>

            {/* Preview */}
            <SunkenPanel style={{ 
              'margin-bottom': '12px',
              padding: '8px',
              'background-color': '#fff',
              'min-height': '100px',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center'
            }}>
              {template.preview()}
            </SunkenPanel>

            {/* Actions */}
            <div style={{
              display: 'flex',
              'justify-content': 'space-between',
              'align-items': 'center'
            }}>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(template.code, template.id);
                }}
                style={{ 'font-size': '10px', padding: '2px 8px' }}
              >
                {copiedTemplate() === template.id ? '✅ Copied!' : '📋 Copy Code'}
              </Button>
              <span style={{ 'font-size': '9px', color: '#666' }}>
                {selectedTemplate() === template.id ? '👆 Click to collapse' : '👆 Click to expand'}
              </span>
            </div>

            {/* Expanded Code View */}
            {selectedTemplate() === template.id && (
              <SunkenPanel style={{ 
                'margin-top': '12px',
                padding: '8px',
                'background-color': '#fff'
              }}>
                <pre style={{
                  'font-family': 'monospace',
                  'font-size': '9px',
                  'line-height': '1.3',
                  margin: '0',
                  'white-space': 'pre-wrap',
                  'max-height': '300px',
                  overflow: 'auto'
                }}>
                  {template.code}
                </pre>
              </SunkenPanel>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};