import TaskFilter from './TaskFilter';

function Footer(props) {
  return (
    <footer className="footer">
      <span className="todo-count">{props.count} items left</span>
      <TaskFilter
        filter={props.filter}
        toggleFilter={props.toggleFilter}
        editingFilter={props.editingFilter}
        editingFilterTasks={props.editingFilterTasks}
      />

      <button className="clear-completed" onClick={props.removeCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
