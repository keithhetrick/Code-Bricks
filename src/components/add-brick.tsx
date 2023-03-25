import "./add-brick.css";
import { useActions } from "../hooks/use-actions";

interface AddBrickProps {
  newBrickId: string | null;
  forceVisible?: boolean;
}

const AddBrick: React.FC<AddBrickProps> = ({ newBrickId, forceVisible }) => {
  const { insertBrickAfter } = useActions();

  return (
    <div className={`add-brick ${forceVisible ? "force-visible" : false}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBrickAfter(newBrickId, "code")}
        >
          <span className="icon is-small">
            <img src="brick.svg" alt="code" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBrickAfter(newBrickId, "text")}
        >
          <span className="icon is-small">
            <img src="markdown.svg" alt="code" />
          </span>
          <span>Text</span>
        </button>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default AddBrick;
