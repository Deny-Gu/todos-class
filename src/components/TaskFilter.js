function TaskFilter(props) {
  return (
    <ul className="filters">
      <li>
        <button
          className={props.filter === 'All' ? 'selected' : null}
          onClick={(e) => props.toggleFilter(e.target.innerHTML)}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={props.filter === 'Active' ? 'selected' : null}
          onClick={(e) => props.toggleFilter(e.target.innerHTML)}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={props.filter === 'Completed' ? 'selected' : null}
          onClick={(e) => props.toggleFilter(e.target.innerHTML)}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TaskFilter;
