import { useEffect } from "react";
import { Brick } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizeable from "./resizeable";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selectors";

interface CodeBrickProps {
  brick: Brick;
}

const CodeBrick: React.FC<CodeBrickProps> = ({ brick }) => {
  const { updateBrick, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[brick.id]);

  // DEBOUNCER
  useEffect(() => {
    if (!bundle) {
      createBundle(brick.id, brick.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(brick.id, brick.content);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brick.id, brick.content, createBundle]);

  return (
    <Resizeable direction="vertical">
      <section
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizeable direction="horizontal">
          <CodeEditor
            initialValue={brick.content}
            onChange={(value) => updateBrick(brick.id, value)}
          />
        </Resizeable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </section>
    </Resizeable>
  );
};

export default CodeBrick;
