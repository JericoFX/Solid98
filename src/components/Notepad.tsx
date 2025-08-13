import { createSignal, mergeProps, splitProps, Show } from 'solid-js';
import { cn } from '../utils/cn';
import { Window } from './Window';
import { StatusBar } from './StatusBar';
import { Button } from './Button';
import type { JSX } from 'solid-js';

interface NotepadProps {
  title?: string;
  initialContent?: string;
  fileName?: string;
  class?: string;
  children?: JSX.Element;
}

export function Notepad(props: NotepadProps) {
  const merged = mergeProps({
    title: 'Untitled - Notepad',
    initialContent: '',
    fileName: ''
  }, props);
  
  const [local, others] = splitProps(merged, ['title', 'initialContent', 'fileName', 'class']);
  
  const [content, setContent] = createSignal(local.initialContent);
  const [fileName, setFileName] = createSignal(local.fileName);
  const [modified, setModified] = createSignal(false);
  const [wordWrap, setWordWrap] = createSignal(true);
  const [statusBar, setStatusBar] = createSignal(true);
  const [findText, setFindText] = createSignal('');
  const [showFind, setShowFind] = createSignal(false);
  const [selectionEnd, setSelectionEnd] = createSignal(0);
  
  let textareaRef: HTMLTextAreaElement | undefined;
  
  const updateTitle = () => {
    const baseTitle = fileName() || 'Untitled';
    return `${modified() ? '* ' : ''}${baseTitle} - Notepad`;
  };
  
  const handleTextChange = (value: string) => {
    setContent(value);
    setModified(true);
  };
  
  const handleNew = () => {
    if (modified()) {
      const confirmed = confirm('Do you want to save changes to the current document?');
      if (confirmed) {
        handleSave();
      }
    }
    
    setContent('');
    setFileName('');
    setModified(false);
  };
  
  const handleOpen = () => {
    // Simulate file opening
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.md';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setContent(text);
          setFileName(file.name);
          setModified(false);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  
  const handleSave = () => {
    // Simulate file saving
    const blob = new Blob([content()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName() || 'untitled.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setModified(false);
  };
  
  const handleFind = () => {
    setShowFind(!showFind());
  };
  
  const findNext = () => {
    const text = content().toLowerCase();
    const search = findText().toLowerCase();
    if (!search) return;
    
    const startPos = selectionEnd() > 0 ? selectionEnd() : 0;
    const index = text.indexOf(search, startPos);
    
    if (index === -1) {
      // Search from beginning
      const beginIndex = text.indexOf(search, 0);
      if (beginIndex !== -1) {
        setSelectionEnd(beginIndex + search.length);
        textareaRef?.setSelectionRange(beginIndex, beginIndex + search.length);
        textareaRef?.focus();
      }
    } else {
      setSelectionEnd(index + search.length);
      textareaRef?.setSelectionRange(index, index + search.length);
      textareaRef?.focus();
    }
  };
  
  const getLineCount = () => {
    return content().split('\n').length;
  };
  
  const getCurrentLineColumn = () => {
    const textarea = textareaRef;
    if (!textarea) return { line: 1, column: 1 };
    
    const pos = textarea.selectionStart;
    const textBeforeCursor = content().substring(0, pos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    return { line, column };
  };
  
  const handleSelectionChange = () => {
    if (textareaRef) {
      setSelectionEnd(textareaRef.selectionEnd);
    }
  };

  return (
    <Window 
      title={updateTitle()} 
      class={cn('notepad', local.class)} 
      {...others}
    >
      {/* Toolbar */}
      <div style="display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; border-bottom: 1px solid #c0c0c0; background: #c0c0c0; min-height: 32px;">
        <Button onClick={handleNew}>New</Button>
        <Button onClick={handleOpen}>Open</Button>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleFind}>Find</Button>
        <Button onClick={() => setWordWrap(!wordWrap())}>
          {wordWrap() ? 'No Wrap' : 'Word Wrap'}
        </Button>
        <Button onClick={() => setStatusBar(!statusBar())}>
          {statusBar() ? 'Hide Status' : 'Show Status'}
        </Button>
      </div>
      
      {/* Find Dialog */}
      <Show when={showFind()}>
        <div class="field-row" style="margin: 4px; padding: 4px; border: 1px inset #c0c0c0; background: #c0c0c0;">
          <label for="find-text">Find:</label>
          <input 
            id="find-text"
            type="text" 
            value={findText()} 
            onInput={(e) => setFindText(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && findNext()}
          />
          <Button onClick={findNext}>Find Next</Button>
          <Button onClick={() => setShowFind(false)}>Close</Button>
        </div>
      </Show>
      
      {/* Text Editor */}
      <div class="sunken-field" style="flex: 1; margin: 4px; padding: 0; background: white;">
        <textarea
          ref={textareaRef}
          value={content()}
          onInput={(e) => handleTextChange(e.currentTarget.value)}
          onSelect={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          onClick={handleSelectionChange}
          style={`
            width: 100%; 
            height: 100%; 
            border: none; 
            padding: 8px; 
            font-family: 'Courier New', monospace; 
            font-size: 12px; 
            resize: none;
            outline: none;
            background: white;
            color: black;
            white-space: ${wordWrap() ? 'pre-wrap' : 'pre'};
            overflow: ${wordWrap() ? 'auto' : 'scroll'};
          `}
          placeholder="Type your text here..."
        />
      </div>
      
      <Show when={statusBar()}>
        <StatusBar fields={[
          `Ln ${getCurrentLineColumn().line}, Col ${getCurrentLineColumn().column}`,
          `${content().length} characters`,
          `${getLineCount()} lines`,
          wordWrap() ? 'Word Wrap' : 'No Wrap',
          modified() ? 'Modified' : 'Saved'
        ]} />
      </Show>
    </Window>
  );
}