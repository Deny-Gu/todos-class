function TaskFilter(props) {
  const handleClick = (e) => {
    props.editingFilter(e.target.innerHTML);
  };

  return (
    <ul className="filters">
      <li>
        <button
          className={props.filter === 'All' ? 'selected' : null}
          onClick={(e) => handleClick(e)}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={props.filter === 'Active' ? 'selected' : null}
          onClick={(e) => handleClick(e)}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={props.filter === 'Completed' ? 'selected' : null}
          onClick={(e) => handleClick(e)}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TaskFilter;
