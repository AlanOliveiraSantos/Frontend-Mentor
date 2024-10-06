// script.js
function showOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }
  
  function hideOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }
  
  // Adicione este evento para esconder o overlay quando clicar fora dele
  document.getElementById('overlay').addEventListener('click', function(event) {
    if (event.target === this) {
      hideOverlay();
    }
});