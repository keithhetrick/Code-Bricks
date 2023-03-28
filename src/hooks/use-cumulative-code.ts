import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (brickId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.bricks;
    const orderedBricks = order.map((id) => data[id]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom'
        var print = (value) => {
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

    const showFuncNoOperation = "var print = () => {}";

    const cumulativeCode = [];
    for (let c of orderedBricks) {
      if (c.type === "code") {
        if (c.id === brickId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOperation);
        }

        cumulativeCode.push(c.content);
      }
      if (c.id === brickId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
