import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
