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
    // Responsive top bar menu toggle
    const menuIcon = document.getElementById('topBarMenuIcon');
    const topBarLinks = document.getElementById('topBarLinks');
    if(menuIcon && topBarLinks) {
      menuIcon.addEventListener('click', () => {
        topBarLinks.classList.toggle('show');
      });
    }
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.main-nav');
  if (window.scrollY > 10) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});