import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import BrickListItem from "./brick-list-items";
import AddBrick from "./add-brick";
import "./brick-list.css";

const BrickList: React.FC = () => {
  const bricks = useTypedSelector(({ bricks: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedBricks = bricks.map((brick) => (
    <Fragment key={brick.id}>
      <BrickListItem brick={brick} />
      <AddBrick newBrickId={brick.id} />
    </Fragment>
  ));

  return (
    <section className="brick-list">
      <AddBrick forceVisible={bricks.length === 0} newBrickId={null} />
      {renderedBricks}
    </section>
  );
};

export default BrickList;
