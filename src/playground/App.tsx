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
  Tab 
} from '../index';
import { TreeNode } from '../types';
import './App.css';

export default function App() {
  const [sliderValue, setSliderValue] = createSignal(50);
  const [progressValue, setProgressValue] = createSignal(75);
  const [selectedTab, setSelectedTab] = createSignal('tab1');
  const [checkboxChecked, setCheckboxChecked] = createSignal(false);
  const [radioValue, setRadioValue] = createSignal('option1');

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
        
        <TreeView data={treeData} />
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
    </div>
  );
}