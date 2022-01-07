import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel'; // enables prettier support for advanced JS code (es2015+)

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    
    // not sure why this tabSize option is inside the onEditorDidMount callback - is it not possible as a prop to MonacoEditor?
    monacoEditor.getModel().updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();
    // format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      semi: true,
      singleQuote: true
    }).replace(/\n$/, ''); // prettier automatically inserts a new line after the last line of code so we remove it

    // set the formatted value back in the editor 
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button 
        className="button button-format is-primary is-small" 
        onClick={onFormatClick}
      >Format</button>

      <MonacoEditor 
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark" 
        language="javascript" 
        height="100%" 
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          fontSize: 17,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;