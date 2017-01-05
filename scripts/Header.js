const header = (function() {

  //Cache DOM
  const activeTodos = document.getElementById('active-todos');

  //Subscribe to pubsub
  pubsub.subscribe('todosListChanged', showNumberOfAciveTodos);

  function showNumberOfAciveTodos(num) {
    activeTodos.innerHTML = num.length;
  }
})();
