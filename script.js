/* Amit Chandran — Portfolio V4.0
   Media carousel for project pages. No dependencies. */

document.querySelectorAll('[data-carousel]').forEach(function (root) {
  var thumbs = Array.prototype.slice.call(root.querySelectorAll('.carousel-thumb'));
  if (!thumbs.length) return;

  var img = root.querySelector('.carousel-stage img');
  var cap = root.querySelector('.carousel-cap');
  var count = root.querySelector('.carousel-count');
  var full = root.querySelector('.carousel-full');
  var index = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function show(i) {
    index = (i + thumbs.length) % thumbs.length;
    var t = thumbs[index];
    img.src = t.getAttribute('data-src');
    img.alt = t.getAttribute('data-caption');
    cap.textContent = t.getAttribute('data-caption');
    count.textContent = pad(index + 1) + ' / ' + pad(thumbs.length);
    full.href = t.getAttribute('data-src');
    thumbs.forEach(function (el, k) {
      el.classList.toggle('is-current', k === index);
      el.setAttribute('aria-current', k === index ? 'true' : 'false');
    });
    t.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  thumbs.forEach(function (t, k) {
    t.addEventListener('click', function () { show(k); });
  });
  root.querySelector('.carousel-btn.prev').addEventListener('click', function () { show(index - 1); });
  root.querySelector('.carousel-btn.next').addEventListener('click', function () { show(index + 1); });

  // Arrow keys work while focus is inside the carousel
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });

  // Touch swipe on the image
  var startX = null;
  var stage = root.querySelector('.carousel-stage');
  stage.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
});
