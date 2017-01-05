const todosList = (function() {
  let id = JSON.parse(localStorage.getItem("id")) || 1;
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let filter = 'show-all';


  //Cache DOM
  const list = document.getElementById('todos-list');


  //Handlebars temlate generation
  const source = document.getElementById('template').innerHTML;
  const template = Handlebars.compile(source);


  //Bind events
  list.addEventListener('click', delegateEvents);


  //Subscribe to pubsub events
  pubsub.subscribe('addNewTodo', addTodo);
  pubsub.subscribe('setVisibilityFilter', setFilter);
  pubsub.subscribe('deleteCompletedTodos', deleteCompleted);


  //Render all todos
  render();

  function delegateEvents(e) {
    if (e.target.classList.contains('todo-item')) {
      toggleTodo(e.target.id);
    } else if (e.target.classList.contains('todo-item__name')) {
      toggleTodo(e.target.parentNode.id);
    } else if (e.target.classList.contains('todo-item__delete-button')) {
      deleteTodo(e.target.parentNode.id);
    }
  }

  function toggleTodo(targetId) {
    const id = Number(targetId);
    todos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    render();
  }

  function deleteTodo(targetId) {
    const id = Number(targetId);
    todos = todos.filter(todo => todo.id !== id);
    render();
  }

  function addTodo(value) {
      todos = [...todos, {
        id: id++,
        text: value,
        completed: false
      }];
      render();
  }

  function render() {
    let data;
    switch (filter) {
      case 'show-active':
        data = getActiveTodos();
        break;
      case 'show-completed':
        data = getCompletedTodos();
        break;
      case 'show-all':
      default:
        data = todos;
    }
    pubsub.publish('showActiveTodos', getActiveTodos());
    saveDataToLocalStorage();
    list.innerHTML = template({data});
  }

  function setFilter(e) {
    const parentElement = e.target.parentNode;
    parentElement.querySelector('.footer__button--active').classList.remove('footer__button--active');
    e.target.classList.add('footer__button--active');
    filter = e.target.id;
    render();
  }

  function deleteCompleted() {
    todos = todos.filter(todo => !todo.completed);
    render();
  }

  function getActiveTodos() {
    const activeTodos = todos.filter(todo => !todo.completed);
    return activeTodos;
  }

  function getCompletedTodos() {
    const completedTodos = todos.filter(todo => todo.completed);
    return completedTodos;
  }

    function saveDataToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("id", JSON.stringify(id));
    }

})();
