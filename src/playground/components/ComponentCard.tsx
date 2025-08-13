import { Component, JSXElement } from 'solid-js';
import { SunkenPanel, Button } from '../../index';

interface ComponentCardProps {
  title: string;
  description: string;
  category: string;
  complexity?: 'Simple' | 'Moderate' | 'Advanced';
  status?: 'Stable' | 'Experimental' | 'Deprecated';
  accessibility?: 'Full' | 'Partial' | 'Basic';
  tags?: string[];
  commonUseCase?: string;
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
        'margin-bottom': '8px'
      }}>
        <div style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          'margin-bottom': '4px'
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
        
        {/* Metadata badges */}
        <div style={{ display: 'flex', gap: '4px', 'flex-wrap': 'wrap' }}>
          {props.complexity && (
            <span style={{
              'font-size': '8px',
              padding: '1px 4px',
              'background-color': props.complexity === 'Simple' ? '#90ee90' : props.complexity === 'Moderate' ? '#ffd700' : '#ff6b6b',
              border: '1px inset',
              color: '#000'
            }}>
              {props.complexity}
            </span>
          )}
          {props.status && (
            <span style={{
              'font-size': '8px',
              padding: '1px 4px',
              'background-color': props.status === 'Stable' ? '#87ceeb' : props.status === 'Experimental' ? '#dda0dd' : '#f0a0a0',
              border: '1px inset',
              color: '#000'
            }}>
              {props.status}
            </span>
          )}
          {props.accessibility && (
            <span style={{
              'font-size': '8px',
              padding: '1px 4px',
              'background-color': props.accessibility === 'Full' ? '#98fb98' : props.accessibility === 'Partial' ? '#f0e68c' : '#ffa07a',
              border: '1px inset',
              color: '#000'
            }}>
              A11Y: {props.accessibility}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{ 'margin-bottom': '12px' }}>
        <p style={{
          'font-size': '11px',
          'line-height': '1.3',
          'margin-bottom': props.commonUseCase ? '4px' : '0',
          color: '#333'
        }}>
          {props.description}
        </p>
        {props.commonUseCase && (
          <p style={{
            'font-size': '10px',
            'line-height': '1.2',
            color: '#666',
            'font-style': 'italic',
            margin: '0'
          }}>
            💡 Common use: {props.commonUseCase}
          </p>
        )}
        {props.tags && props.tags.length > 0 && (
          <div style={{ 'margin-top': '4px' }}>
            {props.tags.map(tag => (
              <span style={{
                'font-size': '8px',
                padding: '1px 3px',
                'background-color': '#f0f0f0',
                border: '1px solid #ccc',
                'margin-right': '2px',
                color: '#555'
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

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