import "./add-brick.css";
import { useActions } from "../hooks/use-actions";

interface AddBrickProps {
  nextBrickId: string | null;
  forceVisible?: boolean;
}

const AddBrick: React.FC<AddBrickProps> = ({ nextBrickId, forceVisible }) => {
  const { insertBrickBefore } = useActions();

  return (
    <div className={`add-brick ${forceVisible ? "force-visible" : false}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBrickBefore(nextBrickId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBrickBefore(nextBrickId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default AddBrick;
