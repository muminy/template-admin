import React, { memo, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools";

/**
 *
 * @param {EditorJS.Tool[]} toolsList
 * @param {*} param1
 * @param {EditorJS.EditorConfig} options
 */
export const useEditor = (
  toolsList,
  { data, editorRef },
  options = {},
  holderName = "editor-js",
  placeholder
) => {
  const [editorInstance, setEditor] = useState(null);
  const { data: ignoreData, tools: ignoreTools, holder: ignoreHolder, ...editorOptions } = options;

  // initialize
  useEffect(() => {
    // create instance
    const editor = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: holderName,
      minHeight: 0,
      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: toolsList,

      /**
       * Previously saved data that should be rendered
       */
      data: data || {},

      initialBlock: "paragraph",

      // Override editor options
      ...editorOptions,
      placeholder: placeholder,
    });

    setEditor(editor);

    // cleanup
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          setEditor(null);
        })
        .catch((e) => console.error("ERROR editor cleanup", e));
    };
  }, [toolsList]);

  // set reference
  useEffect(() => {
    if (!editorInstance) {
      return;
    }
    // Send instance to the parent
    if (editorRef) {
      editorRef(editorInstance);
    }
  }, [editorInstance, editorRef]);

  return { editor: editorInstance };
};

export const EditorContainer = memo(
  ({ editorRef, children, data, options, holderName, placeholder }) => {
    useEditor(tools, { data, editorRef }, options, holderName, placeholder);

    return (
      <React.Fragment>
        {!children && <div id="editor-js"></div>}
        {children}
      </React.Fragment>
    );
  }
);