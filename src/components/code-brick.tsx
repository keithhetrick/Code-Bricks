import { useEffect, useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizeable from "./resizeable";

const CodeBrick = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");

  // DEBOUNCER
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizeable direction="vertical">
      <section
        style={{ height: "100%", display: "flex", flexDirection: "row" }}
      >
        <Resizeable direction="horizontal">
          <CodeEditor
            initialValue="console.log('Hello World!')"
            onChange={(value) => setInput(value)}
          />
        </Resizeable>
        <Preview code={code} err={err} />
      </section>
    </Resizeable>
  );
};

export default CodeBrick;