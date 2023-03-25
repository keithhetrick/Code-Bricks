import { Brick } from "../state";
import CodeBrick from "./code-brick";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";

interface BrickListItemProps {
  brick: Brick;
}

const BrickListItem: React.FC<BrickListItemProps> = ({ brick }) => {
  let child: JSX.Element;
  if (brick.type === "code") {
    child = <CodeBrick brick={brick} />;
  } else {
    child = <TextEditor brick={brick} />;
  }

  return (
    <div>
      <ActionBar id={brick.id} />
      {child}
    </div>
  );
};

export default BrickListItem;
