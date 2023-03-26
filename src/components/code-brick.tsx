import { useEffect } from "react";
import { Brick } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selectors";

interface CodeBrickProps {
  brick: Brick;
}

const CodeBrick: React.FC<CodeBrickProps> = ({ brick }) => {
  const { updateBrick, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[brick.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.bricks;
    const orderedBricks = order.map((id) => data[id]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom'
        var show = (value) => {
          const root = document.querySelector('#root')

          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root)
            } else {
              root.innerHTML = JSON.stringify(value)
            }
          } else {
            root.innerHTML = value
          }
        }
      `;

    const showFuncNoOperation = "var show = () => {}";

    const cumulativeCode = [];
    for (let c of orderedBricks) {
      if (c.type === "code") {
        if (c.id === brick.id) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOperation);
        }

        cumulativeCode.push(c.content);
      }
      if (c.id === brick.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  // DEBOUNCER
  useEffect(() => {
    if (!bundle) {
      createBundle(brick.id, cumulativeCode.join("\n"));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(brick.id, cumulativeCode.join("\n"));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brick.id, cumulativeCode.join("\n"), createBundle]);

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
              <progress className="progress is-small is-primary" max="100">
                Loading
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
