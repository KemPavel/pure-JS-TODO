const header = (function() {

  //Cache DOM
  const activeTodos = document.getElementById('active-todos');

  //Subscribe to pubsub events
  pubsub.subscribe('showActiveTodos', showNumberOfAciveTodos);

  function showNumberOfAciveTodos(num) {
    activeTodos.innerHTML = num.length;
  }

})();
