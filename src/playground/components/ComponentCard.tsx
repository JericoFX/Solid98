import { Component, JSXElement } from 'solid-js';
import { SunkenPanel, Button } from '../../index';

interface ComponentCardProps {
  title: string;
  description: string;
  category: string;
  preview: JSXElement;
  codeSnippet?: string;
  onPlayground?: () => void;
  onCopyCode?: () => void;
}

export const ComponentCard: Component<ComponentCardProps> = (props) => {
  const handleCopyCode = () => {
    if (props.codeSnippet) {
      navigator.clipboard.writeText(props.codeSnippet);
      if (props.onCopyCode) {
        props.onCopyCode();
      }
    }
  };

  return (
    <div class="component-card" style={{
      border: '2px outset #c0c0c0',
      'background-color': '#c0c0c0',
      padding: '12px',
      'margin-bottom': '16px',
      'border-radius': '0'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'margin-bottom': '8px'
      }}>
        <h4 style={{
          margin: '0',
          'font-family': 'MS Sans Serif, sans-serif',
          'font-size': '12px',
          'font-weight': 'bold'
        }}>
          {props.title}
        </h4>
        <span style={{
          'font-size': '9px',
          color: '#666',
          'text-transform': 'uppercase',
          'letter-spacing': '1px'
        }}>
          {props.category}
        </span>
      </div>

      {/* Description */}
      <p style={{
        'font-size': '11px',
        'line-height': '1.3',
        'margin-bottom': '12px',
        color: '#333'
      }}>
        {props.description}
      </p>

      {/* Preview */}
      <SunkenPanel style={{ 
        'margin-bottom': '12px',
        padding: '8px',
        'min-height': '60px',
        'background-color': '#fff'
      }}>
        <div style={{
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'min-height': '44px'
        }}>
          {props.preview}
        </div>
      </SunkenPanel>

      {/* Actions */}
      <div style={{
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {props.onPlayground && (
            <Button 
              onClick={props.onPlayground}
              style={{ 'font-size': '10px', padding: '2px 8px' }}
            >
              🧪 Playground
            </Button>
          )}
          {props.codeSnippet && (
            <Button 
              onClick={handleCopyCode}
              style={{ 'font-size': '10px', padding: '2px 8px' }}
            >
              📋 Copy Code
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};