import "../styles/app.scss";
const TodoItem = ({
  title,
  description,
  isCompleted,
  handleComplete,
  handleDelete,
  id,
}) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input
          onChange={handleComplete}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={handleDelete} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
