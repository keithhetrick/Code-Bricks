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
      <AddBrick nextBrickId={brick.id} />
      <BrickListItem brick={brick} />
    </Fragment>
  ));

  return (
    <section>
      {renderedBricks}
      <AddBrick forceVisible={bricks.length === 0} nextBrickId={null} />
    </section>
  );
};

export default BrickList;
