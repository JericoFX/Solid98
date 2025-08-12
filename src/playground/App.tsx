import { createSignal } from 'solid-js';
import { 
  Window, 
  WindowHeader, 
  Button, 
  StatusBar, 
  FieldRow, 
  Checkbox, 
  Radio, 
  Select, 
  Slider, 
  ProgressBar, 
  SunkenPanel, 
  TreeView, 
  Tabs, 
  Tab,
  Modal,
  Table,
  Alert,
  showError,
  showWarning,
  showInfo,
  showConfirm,
  FileExplorer,
  ImageViewer,
  Notepad
} from '../index';
import { TreeNode, TableColumn } from '../types';
import './App.css';

export default function App() {
  const [sliderValue, setSliderValue] = createSignal(50);
  const [progressValue, setProgressValue] = createSignal(75);
  const [selectedTab, setSelectedTab] = createSignal('tab1');
  const [checkboxChecked, setCheckboxChecked] = createSignal(false);
  const [radioValue, setRadioValue] = createSignal('option1');
  const [modalOpen, setModalOpen] = createSignal(false);
  const [tableSelectedRow, setTableSelectedRow] = createSignal<number | undefined>(undefined);
  const [tableSortBy, setTableSortBy] = createSignal<string>('');
  const [tableSortOrder, setTableSortOrder] = createSignal<'asc' | 'desc'>('asc');
  
  // Alert states
  const [errorAlert, setErrorAlert] = createSignal(false);
  const [warningAlert, setWarningAlert] = createSignal(false);
  const [infoAlert, setInfoAlert] = createSignal(false);
  const [confirmAlert, setConfirmAlert] = createSignal(false);
  
  // Interaction logs
  const [interactionLog, setInteractionLog] = createSignal<string[]>([]);

  const treeData: TreeNode[] = [
    {
      id: '1',
      label: 'Documents',
      expanded: true,
      children: [
        { id: '1-1', label: 'My Documents', selected: true },
        { id: '1-2', label: 'Shared Documents' },
      ]
    },
    {
      id: '2', 
      label: 'Programs',
      children: [
        { id: '2-1', label: 'Microsoft Office' },
        { id: '2-2', label: 'Games' },
      ]
    }
  ];

  interface FileData {
    name: string;
    type: string;
    size: string;
    modified: string;
  }

  const tableData: FileData[] = [
    { name: 'autoexec.bat', type: 'MS-DOS Batch File', size: '1 KB', modified: '12/7/1998' },
    { name: 'config.sys', type: 'System File', size: '2 KB', modified: '12/7/1998' },
    { name: 'My Documents', type: 'File Folder', size: '—', modified: '1/15/1999' },
    { name: 'Program Files', type: 'File Folder', size: '—', modified: '12/7/1998' },
    { name: 'Windows', type: 'File Folder', size: '—', modified: '12/7/1998' },
    { name: 'readme.txt', type: 'Text Document', size: '4 KB', modified: '11/20/1998' },
  ];

  const tableColumns: TableColumn<FileData>[] = [
    { key: 'name', header: 'Name', sortable: true, width: '40%' },
    { key: 'type', header: 'Type', sortable: true, width: '30%' },
    { key: 'size', header: 'Size', sortable: true, width: '15%' },
    { key: 'modified', header: 'Date Modified', sortable: true, width: '15%' }
  ];

  const handleTableSort = (column: string) => {
    if (tableSortBy() === column) {
      setTableSortOrder(tableSortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      setTableSortBy(column);
      setTableSortOrder('asc');
    }
  };

  const handleRowClick = (item: FileData, index: number) => {
    setTableSelectedRow(tableSelectedRow() === index ? undefined : index);
    addLog(`Table row clicked: ${item.name}`);
  };

  const handleRowDoubleClick = (item: FileData, index: number) => {
    addLog(`Table row double-clicked: ${item.name} - Opening...`);
  };

  const handleNodeClick = (node: TreeNode) => {
    addLog(`Tree node clicked: ${node.label}`);
  };

  const handleNodeDoubleClick = (node: TreeNode) => {
    addLog(`Tree node double-clicked: ${node.label} - Opening...`);
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setInteractionLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const handleConfirmAlert = () => {
    addLog('User confirmed the action');
    setConfirmAlert(false);
  };

  const handleCancelAlert = () => {
    addLog('User cancelled the action');
    setConfirmAlert(false);
  };

  return (
    <div class="playground-container">
      {/* Windows Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Windows</h3>
        <Window title="Example Window" active>
          <p>This is a Windows 98 style window with SolidJS!</p>
          <Button variant="default">Default Button</Button>
          <Button>Normal Button</Button>
        </Window>
        
        <br />
        
        <Window title="Inactive Window" active={false}>
          <p>This window is inactive.</p>
        </Window>
      </div>

      {/* Form Controls Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Form Controls</h3>
        
        <FieldRow>
          <Checkbox 
            id="demo-checkbox"
            label="Check me!"
            checked={checkboxChecked()}
            onChange={(e) => setCheckboxChecked(e.currentTarget.checked)}
          />
        </FieldRow>
        
        <FieldRow>
          <Radio 
            id="radio1" 
            name="demo-radio" 
            value="option1" 
            label="Option 1"
            checked={radioValue() === 'option1'}
            onChange={() => setRadioValue('option1')}
          />
          <Radio 
            id="radio2" 
            name="demo-radio" 
            value="option2" 
            label="Option 2"
            checked={radioValue() === 'option2'} 
            onChange={() => setRadioValue('option2')}
          />
        </FieldRow>

        <FieldRow>
          <Select options={[
            { value: 'option1', label: 'First Option' },
            { value: 'option2', label: 'Second Option', selected: true },
            { value: 'option3', label: 'Third Option' }
          ]} />
        </FieldRow>

        <FieldRow>
          <label>Slider: {sliderValue()}</label>
          <Slider 
            value={sliderValue()}
            onInput={(e) => setSliderValue(parseInt(e.currentTarget.value))}
          />
        </FieldRow>

        <FieldRow>
          <label>Box Indicator Slider:</label>
          <Slider boxIndicator value={25} />
        </FieldRow>
      </div>

      {/* Progress and Status Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Progress & Status</h3>
        
        <ProgressBar value={progressValue()} />
        <br />
        <ProgressBar value={60} segmented />
        
        <Button onClick={() => setProgressValue(Math.random() * 100)}>
          Random Progress
        </Button>
        
        <br /><br />
        
        <StatusBar fields={['Ready', 'NUM', 'CAPS']} />
      </div>

      {/* Panels and Containers Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Panels & Containers</h3>
        
        <SunkenPanel>
          <p>This is a sunken panel with some content inside.</p>
        </SunkenPanel>
        
        <br />
        
        <SunkenPanel interactive>
          <p>This is an interactive sunken panel.</p>
        </SunkenPanel>
      </div>

      {/* Tree View Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Tree View</h3>
        
        <TreeView 
          data={treeData}
          onNodeClick={handleNodeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
        />
        
        <p style={{ 'font-size': '10px', 'margin-top': '10px', color: '#666' }}>
          Click to select, double-click to open
        </p>
      </div>

      {/* Tabs Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Tabs</h3>
        
        <Tabs selectedTab={selectedTab()}>
          <Tab 
            id="tab1" 
            label="Desktop" 
            selected={selectedTab() === 'tab1'}
            onClick={(id) => setSelectedTab(id)}
          />
          <Tab 
            id="tab2" 
            label="My Computer"
            selected={selectedTab() === 'tab2'}
            onClick={(id) => setSelectedTab(id)}
          />
          <Tab 
            id="tab3" 
            label="Control Panel"
            selected={selectedTab() === 'tab3'}
            onClick={(id) => setSelectedTab(id)}
          />
        </Tabs>
        
        <div class="window" role="tabpanel">
          <div class="window-body">
            {selectedTab() === 'tab1' && (
              <div>
                <h4>Desktop</h4>
                <p>The desktop tab content with typical Windows 98 styling.</p>
              </div>
            )}
            {selectedTab() === 'tab2' && (
              <div>
                <h4>My Computer</h4>
                <p>Computer management and file system access.</p>
              </div>
            )}
            {selectedTab() === 'tab3' && (
              <div>
                <h4>Control Panel</h4>
                <p>System settings and configuration options.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Table Component</h3>
        
        <h4>File Manager Style Table</h4>
        <Table
          data={tableData}
          columns={tableColumns}
          striped
          hoverable
          sortBy={tableSortBy()}
          sortOrder={tableSortOrder()}
          onSort={handleTableSort}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
          selectedRow={tableSelectedRow()}
        />
        
        <Button onClick={() => setTableSelectedRow(undefined)}>
          Clear Selection
        </Button>
        
        <p style={{ 'font-size': '10px', 'margin-top': '10px', color: '#666' }}>
          Click to select, double-click to open
        </p>
      </div>

      {/* Modal Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Modal Dialog</h3>
        
        <Button onClick={() => setModalOpen(true)}>
          Open Dialog
        </Button>
        
        <Modal
          open={modalOpen()}
          title="About Windows 98"
          onClose={() => setModalOpen(false)}
          width={400}
          height={300}
        >
          <div style={{ padding: '10px' }}>
            <p>Microsoft Windows 98 is a graphical operating system developed by Microsoft.</p>
            <br />
            <p>Key features include:</p>
            <ul style={{ 'margin-left': '20px' }}>
              <li>Enhanced Internet integration</li>
              <li>USB support</li>
              <li>FAT32 file system</li>
              <li>Multiple display support</li>
            </ul>
            <br />
            <FieldRow>
              <Button variant="default" onClick={() => setModalOpen(false)}>
                OK
              </Button>
              <Button onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </FieldRow>
          </div>
        </Modal>
      </div>

      {/* Alert Dialogs Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Alert Dialogs</h3>
        
        <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '8px', 'margin-bottom': '16px' }}>
          <Button onClick={() => setErrorAlert(true)}>
            Error Alert
          </Button>
          <Button onClick={() => setWarningAlert(true)}>
            Warning Alert  
          </Button>
          <Button onClick={() => setInfoAlert(true)}>
            Info Alert
          </Button>
          <Button onClick={() => setConfirmAlert(true)}>
            Confirm Dialog
          </Button>
        </div>

        {/* Alert Components */}
        <Alert
          open={errorAlert()}
          type="error"
          title="Error"
          message="This operation cannot be completed. The file you selected is corrupted or in use by another application."
          onConfirm={() => {
            addLog('Error dialog acknowledged');
            setErrorAlert(false);
          }}
        />

        <Alert
          open={warningAlert()}
          type="warning"
          title="Warning"
          message="You are about to delete important system files. This action cannot be undone and may cause system instability."
          onConfirm={() => {
            addLog('Warning dialog acknowledged');
            setWarningAlert(false);
          }}
        />

        <Alert
          open={infoAlert()}
          type="info"
          title="Information"
          message="The operation completed successfully. 5 files were copied to the destination folder."
          onConfirm={() => {
            addLog('Info dialog acknowledged');
            setInfoAlert(false);
          }}
        />

        <Alert
          open={confirmAlert()}
          type="question"
          title="Confirm Action"
          message="Are you sure you want to permanently delete the selected files? This action cannot be undone."
          showCancel={true}
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleConfirmAlert}
          onCancel={handleCancelAlert}
        />
      </div>

      {/* Interaction Log Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Interaction Log</h3>
        
        <SunkenPanel>
          <div style={{ 'max-height': '200px', overflow: 'auto', padding: '8px', 'font-family': 'monospace', 'font-size': '10px' }}>
            {interactionLog().length === 0 ? (
              <p style={{ color: '#666', 'font-style': 'italic' }}>
                Interact with components above to see events logged here...
              </p>
            ) : (
              interactionLog().map((log, index) => (
                <div style={{ 'margin-bottom': '2px' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </SunkenPanel>
        
        <div style={{ 'margin-top': '8px' }}>
          <Button onClick={() => setInteractionLog([])}>
            Clear Log
          </Button>
        </div>
      </div>

      {/* Complex Window Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Complex Window</h3>
        
        <Window 
          title="My Application"
          showHelp
          onClose={() => alert('Close clicked!')}
          onMinimize={() => alert('Minimize clicked!')}
          onMaximize={() => alert('Maximize clicked!')}
          onHelp={() => alert('Help clicked!')}
        >
          
          <div style={{ padding: '10px' }}>
            <FieldRow>
              <label>Name:</label>
              <input type="text" value="John Doe" />
            </FieldRow>
            
            <FieldRow>
              <label>Email:</label>
              <input type="email" value="john@example.com" />
            </FieldRow>
            
            <FieldRow stacked>
              <label>Description:</label>
              <textarea rows={3}>Enter description here...</textarea>
            </FieldRow>
            
            <FieldRow>
              <Button variant="default">Save</Button>
              <Button>Cancel</Button>
            </FieldRow>
          </div>
          
          <StatusBar>Ready</StatusBar>
        </Window>
      </div>

      {/* Applications Demo */}
      <div class="demo-section">
        <h3 class="demo-title">Windows 98 Applications</h3>
        
        <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '20px', 'margin-bottom': '20px' }}>
          <div style={{ height: '400px' }}>
            <h4>File Explorer</h4>
            <FileExplorer title="My Computer" />
          </div>
          
          <div style={{ height: '400px' }}>
            <h4>Image Viewer (Multiple Images)</h4>
            <ImageViewer title="Photo Gallery" />
          </div>
        </div>
        
        <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '20px', 'margin-bottom': '20px' }}>
          <div style={{ height: '400px' }}>
            <h4>Single Image Viewer (No Carousel)</h4>
            <ImageViewer 
              title="Single Photo" 
              images={[{
                id: '1', 
                name: 'single-photo.jpg', 
                src: 'https://picsum.photos/800/600?random=99',
                width: 800,
                height: 600,
                size: 345760,
                modified: '12/16/2024'
              }]}
            />
          </div>
          
          <div style={{ height: '400px' }}>
            <h4>File Properties</h4>
            <div style="background: #c0c0c0; border: 2px inset; padding: 16px; height: 100%;">
              <p>Click on folders in File Explorer to navigate:</p>
              <ul>
                <li>My Documents → Letters, Projects, files</li>
                <li>My Pictures → Vacation, Family folders</li>
                <li>Desktop → Shortcuts and temp files</li>
                <li>Program Files → Software folders</li>
                <li>Windows → System folders</li>
              </ul>
              <br />
              <p>Click images to view full size modal!</p>
            </div>
          </div>
        </div>
        
        <div style={{ height: '400px', 'margin-bottom': '20px' }}>
          <h4>Notepad</h4>
          <Notepad 
            title="Untitled - Notepad" 
            initialContent="Welcome to Windows 98 Notepad!

This is a fully functional notepad application built with SolidJS and styled with 98.css.

Features:
• Text editing with word wrap
• Find and replace functionality  
• Status bar with line/column information
• File operations (New, Open, Save)
• Character and line counting

Try typing some text, using the find feature, or toggling word wrap!"
          />
        </div>
      </div>
    </div>
  );
}