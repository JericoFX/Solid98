import { Component, createSignal } from 'solid-js';
import { Window, Button } from '../../index';

export const HelloWorld: Component = () => {
  const [message, setMessage] = createSignal('Hello Windows 98!');
  const [clickCount, setClickCount] = createSignal(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    setMessage(`Button clicked ${clickCount() + 1} time${clickCount() + 1 === 1 ? '' : 's'}!`);
  };

  return (
    <Window title="Hello World" active>
      <div style={{ padding: '16px' }}>
        <p style={{ 'margin-bottom': '12px' }}>{message()}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="default" onClick={handleClick}>
            Click Me!
          </Button>
          <Button onClick={() => {
            setMessage('Hello Windows 98!');
            setClickCount(0);
          }}>
            Reset
          </Button>
        </div>
      </div>
    </Window>
  );
};