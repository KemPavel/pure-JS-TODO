const inputForm = (function() {

  //Cache DOM
  const input = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');

  //Bind events
  input.addEventListener('keyup', enterClick);
  addButton.addEventListener('click', addTodo);

  function addTodo() {
    if (input.value.replace(/\s+/g, '').length) {
      pubsub.publish('addNewTodo', input.value);
      clearInput();
    }
    input.focus();
  }

  function enterClick(e) {
    if (e.keyCode === 13) {
      addTodo();
    }
  }

  function clearInput() {
    input.value = '';
  }

})();
