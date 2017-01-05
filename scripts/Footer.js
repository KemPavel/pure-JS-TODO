const footer = (function() {

  //Cache DOM
  const showAllButton = document.getElementById('show-all');
  const showActiveButton = document.getElementById('show-active');
  const showCompletedButton = document.getElementById('show-completed');
  const deleteCompletedButton = document.getElementById('delete-completed');


  //Bind events
  showAllButton.addEventListener('click', setFilter);
  showActiveButton.addEventListener('click', setFilter);
  showCompletedButton.addEventListener('click', setFilter);
  deleteCompletedButton.addEventListener('click', deleteCompleted);

  function setFilter(e) {
    pubsub.publish('setVisibilityFilter', e);
  }

  function deleteCompleted() {
    pubsub.publish('deleteCompletedTodos', null);
  }

})();
