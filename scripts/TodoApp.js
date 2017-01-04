const TodoApp = (function() {
  let id = 1;
  let todos = []; //TODO get todos from local storage

  //Cache DOM
  const input = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const activeTodos = document.getElementById('active-todos');
  const list = document.getElementById('todos-list');
  const showAll = document.getElementById('show-all');
  const showActive = document.getElementById('show-active');
  const showCompleted = document.getElementById('show-completed');
  const deleteCompleted = document.getElementById('delete-completed');

  //Handlebars temlate generation
  const source = document.getElementById('template').innerHTML;
  const template = Handlebars.compile(source);


  //Bind events
  addButton.addEventListener('click', addTodo);
  list.addEventListener('click', delegateEvents);

  _render();

  function _render() {
    list.innerHTML = template({todos});
  }

  function delegateEvents(e) {
    if (e.target.classList.contains('todo-item')) {
      toggleTodo();
    } else if (e.target.id) {
      deleteTodo();
    }
  }

  function addTodo() {
    todos.push({
      id: id++,
      text: input.value,
      completed: false
    });
    _render();
  }

  function deleteTodo() {
    console.log('delete todo');
  }

  function toggleTodo() {
    console.log('toggle todo');
  }




})();
