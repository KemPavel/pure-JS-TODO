const TodoApp = (function() {
  let id = JSON.parse(localStorage.getItem("id")) || 1;
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let filter = 'show-all';


  //Cache DOM
  const input = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const list = document.getElementById('todos-list');
  const showAllButton = document.getElementById('show-all');
  const showActiveButton = document.getElementById('show-active');
  const showCompletedButton = document.getElementById('show-completed');
  const deleteCompletedButton = document.getElementById('delete-completed');


  //Handlebars temlate generation
  const source = document.getElementById('template').innerHTML;
  const template = Handlebars.compile(source);


  //Bind events
  input.addEventListener('keyup', enterClick);
  addButton.addEventListener('click', addTodo);
  list.addEventListener('click', delegateEvents);
  showAllButton.addEventListener('click', setFilter);
  showActiveButton.addEventListener('click', setFilter);
  showCompletedButton.addEventListener('click', setFilter);
  deleteCompletedButton.addEventListener('click', deleteCompleted);

  //Render all todos
  render();


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
    list.innerHTML = template({data});
    pubsub.publish('todosListChanged', getActiveTodos());
    saveDataToLocalStorage();
  }

  function saveDataToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("id", JSON.stringify(id));
  }

  function setFilter(e) {
    const parentElement = e.target.parentNode;
    parentElement.querySelector('.footer__button--active').classList.remove('footer__button--active');
    e.target.classList.add('footer__button--active');
    filter = e.target.id;
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

  function deleteCompleted() {
    todos = todos.filter(todo => !todo.completed);
    render();
  }

  function enterClick(e) {
    if (e.keyCode === 13) {
      addTodo();
    }
  }

  function delegateEvents(e) {
    if (e.target.classList.contains('todo-item')) {
      toggleTodo(e);
    } else if (e.target.classList.contains('todo-item__delete-button')) {
      deleteTodo(e);
    }
  }

  function clearInput() {
    input.value = '';
  }

  function addTodo() {
    if (input.value.replace(/\s+/g, '').length !== 0) {
      todos = [...todos, {
        id: id++,
        text: input.value,
        completed: false
      }];
      render();
      clearInput();
    }
    input.focus();
  }

  function deleteTodo(e) {
    const id = Number(e.target.parentNode.id);
    todos = todos.filter(todo => todo.id !== id);
    render();
  }

  function toggleTodo(e) {
    const id = Number(e.target.id);
    todos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    render();
  }

})();
