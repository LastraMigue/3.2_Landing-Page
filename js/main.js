document.addEventListener('DOMContentLoaded', () => {
  const viewerImg = document.getElementById('gallery-main-img');
  const cards = document.querySelectorAll('.gallery__card');

  if (!viewerImg || !cards.length) return;

  cards.forEach((card) => {
    const btn = card.querySelector('.gallery__thumb-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (card.classList.contains('gallery__card--active')) return;

      const newSrc = card.dataset.full;
      const newAlt = card.dataset.alt || '';

      // Transición suave de opacidad
      viewerImg.classList.add('gallery__viewer-img--fade');

      cards.forEach((c) => c.classList.remove('gallery__card--active'));
      card.classList.add('gallery__card--active');

      setTimeout(() => {
        viewerImg.src = newSrc;
        viewerImg.alt = newAlt;
        viewerImg.classList.remove('gallery__viewer-img--fade');
      }, 300);
    });
  });
});
