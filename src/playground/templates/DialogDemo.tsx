import { Component, createSignal } from 'solid-js';
import { Window, Button, Modal, Alert, FieldRow, StatusBar } from '../../index';

export const DialogDemo: Component = () => {
  const [modalOpen, setModalOpen] = createSignal(false);
  const [settingsModalOpen, setSettingsModalOpen] = createSignal(false);
  const [alertOpen, setAlertOpen] = createSignal(false);
  const [warningOpen, setWarningOpen] = createSignal(false);
  const [confirmOpen, setConfirmOpen] = createSignal(false);
  const [lastAction, setLastAction] = createSignal('Ready');

  // Settings state
  const [settings, setSettings] = createSignal({
    notifications: true,
    autoSave: false,
    theme: 'classic'
  });

  const showModal = () => {
    setModalOpen(true);
    setLastAction('Opened modal dialog');
  };

  const showSettingsModal = () => {
    setSettingsModalOpen(true);
    setLastAction('Opened settings dialog');
  };

  const showAlert = () => {
    setAlertOpen(true);
    setLastAction('Showed info alert');
  };

  const showWarning = () => {
    setWarningOpen(true);
    setLastAction('Showed warning alert');
  };

  const showConfirm = () => {
    setConfirmOpen(true);
    setLastAction('Showed confirmation dialog');
  };

  const handleConfirm = () => {
    setLastAction('User confirmed action');
    setConfirmOpen(false);
  };

  const handleCancel = () => {
    setLastAction('User cancelled action');
    setConfirmOpen(false);
  };

  const saveSettings = () => {
    setLastAction('Settings saved successfully');
    setSettingsModalOpen(false);
  };

  return (
    <div style={{ width: '500px', height: '400px' }}>
      <Window title="Dialog Demo Application" active>
        <div style={{ padding: '16px' }}>
          <h3 style={{ 'margin-top': '0', 'margin-bottom': '16px' }}>Dialog Examples</h3>
          
          <div style={{ 'margin-bottom': '24px' }}>
            <h4 style={{ 'margin-bottom': '8px' }}>Modal Dialogs</h4>
            <FieldRow>
              <Button onClick={showModal}>
                📋 Basic Modal
              </Button>
              <Button onClick={showSettingsModal}>
                ⚙️ Settings Modal
              </Button>
            </FieldRow>
          </div>

          <div style={{ 'margin-bottom': '24px' }}>
            <h4 style={{ 'margin-bottom': '8px' }}>Alert Dialogs</h4>
            <FieldRow>
              <Button onClick={showAlert}>
                ℹ️ Info Alert
              </Button>
              <Button onClick={showWarning}>
                ⚠️ Warning Alert
              </Button>
              <Button onClick={showConfirm}>
                ❓ Confirm Dialog
              </Button>
            </FieldRow>
          </div>

          <div style={{ 'margin-bottom': '16px' }}>
            <h4 style={{ 'margin-bottom': '8px' }}>Last Action</h4>
            <div style={{
              padding: '8px',
              'background-color': '#fff',
              border: '2px inset #c0c0c0',
              'font-family': 'monospace',
              'font-size': '11px'
            }}>
              {lastAction()}
            </div>
          </div>
        </div>

        {/* Basic Modal */}
        <Modal
          open={modalOpen()}
          title="About This Application"
          onClose={() => setModalOpen(false)}
          width={350}
          height={250}
        >
          <div style={{ padding: '16px' }}>
            <p style={{ 'margin-bottom': '12px' }}>
              This is a demonstration of modal dialogs in the Windows 98 Component Library.
            </p>
            <p style={{ 'margin-bottom': '16px' }}>
              Features demonstrated:
            </p>
            <ul style={{ 'margin-left': '20px', 'margin-bottom': '16px' }}>
              <li>Modal dialogs with custom content</li>
              <li>Alert dialogs for notifications</li>
              <li>Confirmation dialogs for user actions</li>
              <li>Settings forms with state management</li>
            </ul>
            <FieldRow>
              <Button variant="default" onClick={() => setModalOpen(false)}>
                OK
              </Button>
            </FieldRow>
          </div>
        </Modal>

        {/* Settings Modal */}
        <Modal
          open={settingsModalOpen()}
          title="Application Settings"
          onClose={() => setSettingsModalOpen(false)}
          width={400}
          height={300}
        >
          <div style={{ padding: '16px' }}>
            <div style={{ 'margin-bottom': '16px' }}>
              <label style={{ 'font-weight': 'bold', 'margin-bottom': '8px', display: 'block' }}>
                Preferences
              </label>
              
              <FieldRow>
                <input 
                  type="checkbox" 
                  id="notifications"
                  checked={settings().notifications}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    notifications: e.currentTarget.checked 
                  }))}
                />
                <label for="notifications">Enable notifications</label>
              </FieldRow>

              <FieldRow>
                <input 
                  type="checkbox" 
                  id="autosave"
                  checked={settings().autoSave}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    autoSave: e.currentTarget.checked 
                  }))}
                />
                <label for="autosave">Auto-save documents</label>
              </FieldRow>

              <FieldRow>
                <label for="theme">Theme:</label>
                <select 
                  id="theme"
                  value={settings().theme}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    theme: e.currentTarget.value 
                  }))}
                >
                  <option value="classic">Classic</option>
                  <option value="high-contrast">High Contrast</option>
                  <option value="large-fonts">Large Fonts</option>
                </select>
              </FieldRow>
            </div>

            <FieldRow>
              <Button variant="default" onClick={saveSettings}>
                OK
              </Button>
              <Button onClick={() => setSettingsModalOpen(false)}>
                Cancel
              </Button>
            </FieldRow>
          </div>
        </Modal>

        {/* Alert Dialogs */}
        <Alert
          open={alertOpen()}
          type="info"
          title="Information"
          message="This is an informational alert. It provides the user with helpful information about the current state or action."
          onConfirm={() => {
            setLastAction('Info alert acknowledged');
            setAlertOpen(false);
          }}
        />

        <Alert
          open={warningOpen()}
          type="warning"
          title="Warning"
          message="This is a warning alert. It notifies the user about something that requires attention but is not critical."
          onConfirm={() => {
            setLastAction('Warning acknowledged');
            setWarningOpen(false);
          }}
        />

        <Alert
          open={confirmOpen()}
          type="question"
          title="Confirm Action"
          message="Are you sure you want to proceed with this action? This operation cannot be undone."
          showCancel={true}
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />

        <StatusBar fields={[lastAction(), 'Ready']} />
      </Window>
    </div>
  );
};