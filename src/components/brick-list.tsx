import { useTypedSelector } from "../hooks/use-typed-selectors";
import BrickListItem from "./brick-list-items";

const BrickList: React.FC = () => {
  const bricks = useTypedSelector(({ bricks: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedBricks = bricks.map((brick) => (
    <BrickListItem key={brick.id} brick={brick} />
  ));

  return <div>{renderedBricks}</div>;
};

export default BrickList;
