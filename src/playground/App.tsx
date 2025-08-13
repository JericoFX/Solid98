import { createSignal, Show, ErrorBoundary } from 'solid-js';
import { ComponentGallery } from './components/ComponentGallery';
import { QuickStart } from './components/QuickStart';
import { ComponentPlayground } from './components/ComponentPlayground';
import { Window, Button, Tabs, Tab, StatusBar, SunkenPanel } from '../index';
import './App.css';

export default function App() {
  // Navigation state
  const [activeSection, setActiveSection] = createSignal('home');
  const [playgroundComponent, setPlaygroundComponent] = createSignal<string | null>(null);

  // Error fallback component
  const ErrorFallback = (err: Error) => (
    <div style={{
      padding: '20px',
      'background-color': '#ffe6e6',
      border: '2px inset #ff9999',
      margin: '20px'
    }}>
      <h3 style={{ 'margin-top': '0', color: '#cc0000' }}>⚠️ Component Error</h3>
      <p style={{ 'font-size': '12px' }}>
        Something went wrong loading this section. Please try refreshing the page.
      </p>
      <details style={{ 'margin-top': '10px' }}>
        <summary style={{ cursor: 'pointer', 'font-size': '11px' }}>Error Details</summary>
        <pre style={{ 
          'font-size': '10px', 
          'white-space': 'pre-wrap', 
          'margin-top': '5px',
          padding: '5px',
          'background-color': '#f0f0f0',
          border: '1px inset #ccc'
        }}>
          {err.toString()}
        </pre>
      </details>
    </div>
  );

  return (
    <div class="playground-app win98-appear">
      {/* Main Application Window */}
      <Window 
        title="Windows 98 Component Library - SolidJS Edition" 
        active 
        showHelp
        onHelp={() => alert('Windows 98 Component Library\n\nA complete SolidJS wrapper for 98.css\nBuilt with modern reactivity and authentic retro styling.\n\nExplore components, try quick start templates, and build amazing Windows 98 style applications!')}
        style={{ 
          width: '100vw', 
          height: '100vh',
          margin: '0',
          'border-radius': '0'
        }}
      >
        {/* Navigation Tabs */}
        <Tabs selectedTab={activeSection()}>
          <Tab 
            id="home" 
            label="🏠 Home" 
            selected={activeSection() === 'home'}
            onClick={(id) => setActiveSection(id)}
          />
          <Tab 
            id="components" 
            label="🧩 Components"
            selected={activeSection() === 'components'}
            onClick={(id) => setActiveSection(id)}
          />
          <Tab 
            id="quickstart" 
            label="🚀 Quick Start"
            selected={activeSection() === 'quickstart'}
            onClick={(id) => setActiveSection(id)}
          />
          <Tab 
            id="examples" 
            label="📚 Examples"
            selected={activeSection() === 'examples'}
            onClick={(id) => setActiveSection(id)}
          />
        </Tabs>

        {/* Main Content Area */}
        <div style={{ 
          height: 'calc(100vh - 120px)', 
          overflow: 'auto',
          'background-color': '#c0c0c0'
        }}>
          {/* Home Section */}
          {activeSection() === 'home' && (
            <div class="home-section" style={{ padding: '20px' }}>
              {/* Hero Section */}
              <div style={{
                'text-align': 'center',
                'margin-bottom': '32px',
                padding: '24px',
                'background-color': '#008080',
                color: 'white',
                border: '2px outset #008080'
              }}>
                <h1 style={{
                  'font-size': '24px',
                  'margin-bottom': '12px',
                  'text-shadow': '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  🪟 Windows 98 Component Library
                </h1>
                <p style={{
                  'font-size': '14px',
                  'margin-bottom': '16px',
                  'line-height': '1.4',
                  'max-width': '600px',
                  margin: '0 auto 16px auto'
                }}>
                  A complete SolidJS wrapper for 98.css, bringing authentic Windows 98 
                  styling to modern web applications with reactive components.
                </p>
                <div style={{ display: 'flex', gap: '12px', 'justify-content': 'center' }}>
                  <Button 
                    variant="default" 
                    onClick={() => setActiveSection('components')}
                    style={{ 'font-size': '12px' }}
                  >
                    🧩 Browse Components
                  </Button>
                  <Button 
                    onClick={() => setActiveSection('quickstart')}
                    style={{ 'font-size': '12px' }}
                  >
                    🚀 Quick Start
                  </Button>
                </div>
              </div>

              {/* Feature Grid */}
              <div style={{
                display: 'grid',
                'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                'margin-bottom': '32px'
              }}>
                <SunkenPanel style={{ padding: '16px' }}>
                  <h3 style={{ 'margin-top': '0', 'font-size': '14px' }}>🎨 Authentic Styling</h3>
                  <p style={{ 'font-size': '11px', 'line-height': '1.4' }}>
                    Pixel-perfect Windows 98 aesthetics using the original 98.css framework. 
                    Every component matches the classic look and feel you remember.
                  </p>
                </SunkenPanel>

                <SunkenPanel style={{ padding: '16px' }}>
                  <h3 style={{ 'margin-top': '0', 'font-size': '14px' }}>⚡ Modern Reactivity</h3>
                  <p style={{ 'font-size': '11px', 'line-height': '1.4' }}>
                    Built with SolidJS for maximum performance and developer experience. 
                    Fine-grained reactivity meets retro design.
                  </p>
                </SunkenPanel>

                <SunkenPanel style={{ padding: '16px' }}>
                  <h3 style={{ 'margin-top': '0', 'font-size': '14px' }}>🧩 Complete Components</h3>
                  <p style={{ 'font-size': '11px', 'line-height': '1.4' }}>
                    Full component library including windows, dialogs, form controls, 
                    file explorers, and complex widgets.
                  </p>
                </SunkenPanel>

                <SunkenPanel style={{ padding: '16px' }}>
                  <h3 style={{ 'margin-top': '0', 'font-size': '14px' }}>🚀 Easy Integration</h3>
                  <p style={{ 'font-size': '11px', 'line-height': '1.4' }}>
                    Drop-in components with TypeScript support. Copy-paste examples 
                    and comprehensive documentation.
                  </p>
                </SunkenPanel>
              </div>

              {/* Quick Actions */}
              <div style={{
                'background-color': '#fffbf0',
                border: '2px inset #dfb',
                padding: '16px'
              }}>
                <h3 style={{ 'margin-top': '0', 'font-size': '14px' }}>🎯 Quick Actions</h3>
                <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '8px' }}>
                  <Button onClick={() => setActiveSection('components')}>
                    Browse All Components
                  </Button>
                  <Button onClick={() => setActiveSection('quickstart')}>
                    View Templates
                  </Button>
                  <Button onClick={() => {
                    setActiveSection('components');
                    setTimeout(() => setPlaygroundComponent('button'), 100);
                  }}>
                    Try Playground
                  </Button>
                  <Button onClick={() => {
                    navigator.clipboard.writeText('npm install solid-98css');
                  }}>
                    Copy Install Command
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Components Section */}
          {activeSection() === 'components' && (
            <ErrorBoundary fallback={ErrorFallback}>
              <ComponentGallery />
            </ErrorBoundary>
          )}

          {/* Quick Start Section */}
          {activeSection() === 'quickstart' && (
            <ErrorBoundary fallback={ErrorFallback}>
              <QuickStart />
            </ErrorBoundary>
          )}

          {/* Examples Section */}
          {activeSection() === 'examples' && (
            <div style={{ padding: '20px' }}>
              <h3 style={{ 'margin-top': '0' }}>📚 Example Applications</h3>
              <p style={{ 'margin-bottom': '20px', 'font-size': '12px' }}>
                Complete example applications showcasing the component library.
              </p>
              
              <div style={{
                display: 'grid',
                'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                <SunkenPanel style={{ padding: '16px' }}>
                  <h4 style={{ 'margin-top': '0', 'font-size': '12px' }}>🗂️ File Manager</h4>
                  <p style={{ 'font-size': '11px', 'margin-bottom': '12px' }}>
                    Complete file explorer with navigation, search, and file operations.
                  </p>
                  <Button style={{ 'font-size': '10px' }}>View Source</Button>
                </SunkenPanel>

                <SunkenPanel style={{ padding: '16px' }}>
                  <h4 style={{ 'margin-top': '0', 'font-size': '12px' }}>🎨 Paint Application</h4>
                  <p style={{ 'font-size': '11px', 'margin-bottom': '12px' }}>
                    MS Paint clone with drawing tools and canvas manipulation.
                  </p>
                  <Button disabled style={{ 'font-size': '10px' }}>Coming Soon</Button>
                </SunkenPanel>

                <SunkenPanel style={{ padding: '16px' }}>
                  <h4 style={{ 'margin-top': '0', 'font-size': '12px' }}>📝 Notepad</h4>
                  <p style={{ 'font-size': '11px', 'margin-bottom': '12px' }}>
                    Text editor with find/replace and file operations.
                  </p>
                  <Button style={{ 'font-size': '10px' }}>View Source</Button>
                </SunkenPanel>

                <SunkenPanel style={{ padding: '16px' }}>
                  <h4 style={{ 'margin-top': '0', 'font-size': '12px' }}>🖼️ Image Viewer</h4>
                  <p style={{ 'font-size': '11px', 'margin-bottom': '12px' }}>
                    Photo gallery with zoom, navigation, and slideshow.
                  </p>
                  <Button style={{ 'font-size': '10px' }}>View Source</Button>
                </SunkenPanel>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <StatusBar fields={[
          `Section: ${activeSection()}`,
          'SolidJS + 98.css',
          'Ready'
        ]} />
      </Window>

      {/* Component Playground Overlay */}
      <Show when={playgroundComponent()}>
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          'background-color': 'rgba(0, 0, 0, 0.3)',
          'z-index': 1000,
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center'
        }}>
          <ErrorBoundary fallback={ErrorFallback}>
            <ComponentPlayground
              componentId={playgroundComponent()!}
              onClose={() => setPlaygroundComponent(null)}
            />
          </ErrorBoundary>
        </div>
      </Show>
    </div>
  );
}