import {
  createSignal,
  createMemo,
  mergeProps,
  splitProps,
  onMount,
  createEffect,
} from 'solid-js';
import { cn } from '../utils/cn';
import {
  NavigableFileExplorerProps,
  FileItem,
  NavigationHistoryEntry,
} from '../types';
import { Window } from './Window';
import { FileExplorer } from './FileExplorer';
import { Button } from './Button';
import { FileSystemNavigator, defaultFileSystem } from '../utils/fileSystem';

export function NavigableFileExplorer(props: NavigableFileExplorerProps) {
  const merged = mergeProps(
    {
      title: 'File Explorer',
      initialPath: '',
      viewMode: 'details' as const,
      showHidden: false,
      showSearch: true,
      showToolbar: true,
      showAddressBar: true,
      showStatusBar: true,
      width: 600,
      height: 500,
      active: true,
      resizable: true,
      showMinimize: true,
      showMaximize: true,
      showClose: true,
    },
    props
  );

  const [local, others] = splitProps(merged, [
    'title',
    'initialPath',
    'viewMode',
    'showHidden',
    'showSearch',
    'showToolbar',
    'showAddressBar',
    'showStatusBar',
    'width',
    'height',
    'active',
    'resizable',
    'showMinimize',
    'showMaximize',
    'showClose',
    'onClose',
    'onMinimize',
    'onMaximize',
    'onRestore',
    'onFileOpen',
    'onPathChange',
    'class',
  ]);

  // Navigation state
  const [currentPath, setCurrentPath] = createSignal<string>(
    local.initialPath || ''
  );
  const [navigationHistory, setNavigationHistory] = createSignal<
    NavigationHistoryEntry[]
  >([]);
  const [historyIndex, setHistoryIndex] = createSignal<number>(-1);
  const [addressBarValue, setAddressBarValue] = createSignal<string>('');
  const [isEditingAddress, setIsEditingAddress] = createSignal<boolean>(false);

  // Initialize file system navigator
  const fileSystemNavigator = new FileSystemNavigator(defaultFileSystem);

  // File data based on current path
  const currentData = createMemo(() => {
    const path = currentPath();
    return fileSystemNavigator.getItemsAtPath(path);
  });

  // Current display name for window title
  const currentDisplayName = createMemo(() => {
    const path = currentPath();
    return path ? fileSystemNavigator.getDisplayName(path) : 'My Computer';
  });

  // Navigation controls state
  const canGoBack = createMemo(() => historyIndex() > 0);
  const canGoForward = createMemo(
    () => historyIndex() < navigationHistory().length - 1
  );

  // Initialize navigation
  onMount(() => {
    const initialPath = local.initialPath || '';
    navigateToPath(initialPath, false);
  });

  // Update address bar when path changes
  createEffect(() => {
    if (!isEditingAddress()) {
      setAddressBarValue(currentPath() || 'My Computer');
    }
  });

  // Call onPathChange callback when path changes
  createEffect(() => {
    local.onPathChange?.(currentPath());
  });

  const addToHistory = (path: string) => {
    const displayName = fileSystemNavigator.getDisplayName(path);
    const entry: NavigationHistoryEntry = {
      path,
      displayName,
      timestamp: new Date(),
    };

    const history = navigationHistory();
    const currentIndex = historyIndex();

    // Remove any forward history when navigating to a new location
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(entry);

    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const navigateToPath = (path: string, addHistory: boolean = true) => {
    if (!fileSystemNavigator.pathExists(path) && path !== '') {
      return;
    }

    setCurrentPath(path);
    if (addHistory) {
      addToHistory(path);
    }
  };

  const handleNavigate = (path: string, item: FileItem) => {
    if (item.type === 'folder') {
      navigateToPath(path);
    }
  };

  const handleFileOpen = (item: FileItem) => {
    local.onFileOpen?.(item);
  };

  const navigateBack = () => {
    if (!canGoBack()) return;

    const newIndex = historyIndex() - 1;
    const entry = navigationHistory()[newIndex];
    setHistoryIndex(newIndex);
    setCurrentPath(entry.path);
  };

  const navigateForward = () => {
    if (!canGoForward()) return;

    const newIndex = historyIndex() + 1;
    const entry = navigationHistory()[newIndex];
    setHistoryIndex(newIndex);
    setCurrentPath(entry.path);
  };

  const navigateUp = () => {
    const currentPathValue = currentPath();
    const parentPath = fileSystemNavigator.getParentPath(currentPathValue);
    if (parentPath !== currentPathValue) {
      navigateToPath(parentPath);
    }
  };

  const navigateToRoot = () => {
    navigateToPath('');
  };

  const handleAddressBarKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newPath = (e.target as HTMLInputElement).value;
      if (fileSystemNavigator.pathExists(newPath)) {
        navigateToPath(newPath);
      } else {
        // Reset to current path if invalid
        setAddressBarValue(currentPath());
      }
      setIsEditingAddress(false);
      (e.target as HTMLInputElement).blur();
    } else if (e.key === 'Escape') {
      setAddressBarValue(currentPath());
      setIsEditingAddress(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleAddressBarFocus = () => {
    setIsEditingAddress(true);
  };

  const handleAddressBarBlur = () => {
    setIsEditingAddress(false);
    setAddressBarValue(currentPath());
  };

  // Breadcrumb navigation
  const breadcrumbs = createMemo(() => {
    return fileSystemNavigator.getBreadcrumbs(currentPath());
  });

  const handleBreadcrumbClick = (path: string) => {
    navigateToPath(path);
  };

  return (
    <div
      class={cn('navigable-file-explorer-container', local.class)}
      style={{
        width:
          typeof local.width === 'number' ? `${local.width}px` : local.width,
        height:
          typeof local.height === 'number' ? `${local.height}px` : local.height,
      }}
      {...others}
    >
      <Window
        title={`${currentDisplayName()} - ${local.title}`}
        active={local.active}
        resizable={local.resizable}
        showMinimize={local.showMinimize}
        showMaximize={local.showMaximize}
        showClose={local.showClose}
        onClose={local.onClose}
        onMinimize={local.onMinimize}
        onMaximize={local.onMaximize}
        onRestore={local.onRestore}
        class='navigable-file-explorer'
      >
        <div
          class='file-explorer-container'
          style={{
            display: 'flex',
            'flex-direction': 'column',
            height: '100%',
          }}
        >
          {/* Enhanced Toolbar with Navigation */}
          {local.showToolbar && (
            <div
              class='win98-toolbar'
              style={{
                display: 'flex',
                'align-items': 'center',
                gap: '4px',
                padding: '4px',
                'border-bottom': '1px solid #808080',
              }}
            >
              <Button
                onClick={navigateBack}
                disabled={!canGoBack()}
                class='toolbar-button'
                title='Back'
              >
                ← Back
              </Button>

              <Button
                onClick={navigateForward}
                disabled={!canGoForward()}
                class='toolbar-button'
                title='Forward'
              >
                Forward →
              </Button>

              <div
                class='toolbar-separator'
                style={{
                  width: '1px',
                  height: '16px',
                  'background-color': '#808080',
                  margin: '0 4px',
                }}
              ></div>

              <Button
                onClick={navigateUp}
                disabled={!currentPath()}
                class='toolbar-button'
                title='Up One Level'
              >
                ⬆ Up
              </Button>

              <Button
                onClick={navigateToRoot}
                class='toolbar-button'
                title='Go to My Computer'
              >
                🏠 Home
              </Button>

              <div
                class='toolbar-separator'
                style={{
                  width: '1px',
                  height: '16px',
                  'background-color': '#808080',
                  margin: '0 4px',
                }}
              ></div>

              <Button class='toolbar-button' title='Cut'>
                ✂️ Cut
              </Button>
              <Button class='toolbar-button' title='Copy'>
                📋 Copy
              </Button>
              <Button class='toolbar-button' title='Paste'>
                📋 Paste
              </Button>

              <div
                class='toolbar-separator'
                style={{
                  width: '1px',
                  height: '16px',
                  'background-color': '#808080',
                  margin: '0 4px',
                }}
              ></div>

              <Button class='toolbar-button' title='Properties'>
                ⚙️ Properties
              </Button>
            </div>
          )}

          {/* Enhanced Address Bar with Breadcrumbs */}
          {local.showAddressBar && (
            <div
              class='win98-address-bar'
              style={{
                display: 'flex',
                'align-items': 'center',
                gap: '8px',
                padding: '4px',
                'border-bottom': '1px solid #808080',
                'background-color': '#c0c0c0',
              }}
            >
              <label
                for='address-input'
                style={{ 'font-size': '11px', 'white-space': 'nowrap' }}
              >
                Address:
              </label>

              <div
                class='address-field'
                style={{ flex: 1, display: 'flex', 'align-items': 'center' }}
              >
                {!isEditingAddress() ? (
                  <div
                    class='breadcrumb-container'
                    style={{
                      display: 'flex',
                      'align-items': 'center',
                      'flex-wrap': 'wrap',
                      gap: '2px',
                      padding: '2px 4px',
                      'background-color': 'white',
                      border: '1px inset #c0c0c0',
                      'min-height': '20px',
                      width: '100%',
                      cursor: 'text',
                    }}
                    onClick={handleAddressBarFocus}
                  >
                    {breadcrumbs().map((crumb: { name: string; path: string }, index: number) => (
                      <>
                        <span
                          class='breadcrumb-item'
                          style={{
                            cursor: 'pointer',
                            'text-decoration': 'none',
                            color: '#0000ff',
                            'font-size': '11px',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBreadcrumbClick(crumb.path);
                          }}
                          onMouseOver={(e) => {
                            (e.target as HTMLElement).style.textDecoration =
                              'underline';
                          }}
                          onMouseOut={(e) => {
                            (e.target as HTMLElement).style.textDecoration =
                              'none';
                          }}
                        >
                          {crumb.name}
                        </span>
                        {index < breadcrumbs().length - 1 && (
                          <span
                            style={{ 'font-size': '11px', color: '#808080' }}
                          >
                            {' '}
                            /{' '}
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                ) : (
                  <input
                    id='address-input'
                    type='text'
                    value={addressBarValue()}
                    onInput={(e) => setAddressBarValue(e.currentTarget.value)}
                    onKeyDown={handleAddressBarKeyDown}
                    onBlur={handleAddressBarBlur}
                    class='address-input'
                    style={{
                      width: '100%',
                      padding: '2px 4px',
                      'font-size': '11px',
                      border: '1px inset #c0c0c0',
                    }}
                    ref={(el) => el && el.focus()}
                  />
                )}
              </div>
            </div>
          )}

          {/* File Explorer Content */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <FileExplorer
              data={currentData()}
              currentPath={currentPath()}
              viewMode={local.viewMode}
              showHidden={local.showHidden}
              showSearch={local.showSearch}
              onNavigate={handleNavigate}
              onFileOpen={handleFileOpen}
              width='100%'
              height='100%'
            />
          </div>
        </div>
      </Window>
    </div>
  );
}
