import React, { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { json } from "@codemirror/lang-json";

export default function CodeEditor({ value, onChange, ...props }) {
  const editor = useRef();
  const codeMirrorRef = useRef();

  useEffect(() => {
    // Update the parent state when the editor changes
    /*const updateListenerExtension = EditorView.updateListener.of((update) => {
      if (onChange && update.docChanged) {
        onChange({ newValue: state.doc.toString() });
      }
    });*/
    const state = EditorState.create({
      doc: "",
      //extensions: [basicSetup, updateListenerExtension, json()],
      extensions: [basicSetup, json()],
    });
    const view = new EditorView({
      state,
      parent: editor.current,
    });

    codeMirrorRef.current = { view, state };
    return () => view.destroy();
  }, []);

  // Update the editor to match the parent state
  useEffect(() => {
    codeMirrorRef.current.view.dispatch({
      changes: {
        from: 0,
        to: codeMirrorRef.current.state.doc.length,
        insert: value,
      },
    });
  }, [value]);

  return <div ref={editor} {...props}></div>;
}
