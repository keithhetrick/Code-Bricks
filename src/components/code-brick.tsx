import { useEffect } from "react";
import { Brick } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
import './code-brick.css'

interface CodeBrickProps {
  brick: Brick;
}

const CodeBrick: React.FC<CodeBrickProps> = ({ brick }) => {
  const { updateBrick, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[brick.id]);
  const cumulativeCode = useCumulativeCode(brick.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(brick.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(brick.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, brick.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <section
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={brick.content}
            onChange={(value) => updateBrick(brick.id, value)}
          />
        </Resizable>

        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress id="progress-bar" className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>

      </section>
    </Resizable>
  );
};

export default CodeBrick;
