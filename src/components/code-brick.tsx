import { useEffect, useState } from "react";
import bundle from "../bundler";
import { Brick } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizeable from "./resizeable";
import { useActions } from "../hooks/use-actions";

interface CodeBrickProps {
  brick: Brick;
}

const CodeBrick: React.FC<CodeBrickProps> = ({ brick }) => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");

  const { updateBrick } = useActions();

  // DEBOUNCER
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(brick.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [brick.content]);

  return (
    <Resizeable direction="vertical">
      <section
        style={{ height: "100%", display: "flex", flexDirection: "row" }}
      >
        <Resizeable direction="horizontal">
          <CodeEditor
            initialValue={brick.content}
            onChange={(value) => updateBrick(brick.id, value)}
          />
        </Resizeable>
        <Preview code={code} err={err} />
      </section>
    </Resizeable>
  );
};

export default CodeBrick;
