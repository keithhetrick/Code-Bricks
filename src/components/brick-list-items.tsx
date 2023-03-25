import { Brick } from "../state";
import CodeBrick from "./code-brick";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import "./brick-list-item.css";

interface BrickListItemProps {
  brick: Brick;
}

const BrickListItem: React.FC<BrickListItemProps> = ({ brick }) => {
  let child: JSX.Element;
  if (brick.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={brick.id} />
        </div>
        <CodeBrick brick={brick} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor brick={brick} />
        <ActionBar id={brick.id} />
      </>
    );
  }

  return <div className="brick-list-item">{child}</div>;
};

export default BrickListItem;
