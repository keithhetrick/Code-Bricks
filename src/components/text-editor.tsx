import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { Brick } from "../state";
import "./text-editor.css";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  brick: Brick;
}

const TextEditor: React.FC<TextEditorProps> = ({ brick }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateBrick } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={brick.content}
          onChange={(v) => updateBrick(brick.id, v || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={brick.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
