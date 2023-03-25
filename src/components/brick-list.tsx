import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selectors";
import BrickListItem from "./brick-list-items";
import AddBrick from "./add-brick";

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
    <section>
      <AddBrick forceVisible={bricks.length === 0} newBrickId={null} />
      {renderedBricks}
    </section>
  );
};

export default BrickList;
