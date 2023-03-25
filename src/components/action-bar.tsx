import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveBrick, deleteBrick } = useActions();

  return (
    <div>
      <button onClick={() => moveBrick(id, "up")}>Up</button>
      <button onClick={() => moveBrick(id, "down")}>Down</button>
      <button onClick={() => deleteBrick(id)}>Delete</button>
    </div>
  );
};

export default ActionBar;
