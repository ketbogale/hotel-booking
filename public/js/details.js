document.getElementById('openMenu').onclick = function() {
  document.getElementById('sideMenu').classList.add('open');
  document.getElementById('sideMenuOverlay').classList.add('open');
};
document.getElementById('closeMenu').onclick = function() {
  document.getElementById('sideMenu').classList.remove('open');
  document.getElementById('sideMenuOverlay').classList.remove('open');
};
document.getElementById('sideMenuOverlay').onclick = function() {
  document.getElementById('sideMenu').classList.remove('open');
  document.getElementById('sideMenuOverlay').classList.remove('open');
};
// Toggle amenities list for each room card
document.querySelectorAll('.amenities-toggle').forEach(btn => {
  btn.addEventListener('click', function() {
    const list = this.nextElementSibling;
    const icon = this.querySelector('.fa-chevron-down, .fa-chevron-up');
    if (list.style.display === 'block') {
      list.style.display = 'none';
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    } else {
      list.style.display = 'block';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    }
  });
});
