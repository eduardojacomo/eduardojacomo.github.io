import { onMounted, onBeforeUnmount } from 'vue';

export function useCursor() {
  let mx = 0, my = 0, rx = 0, ry = 0, rafId = null;

  const onMouseMove = (e) => { mx = e.clientX; my = e.clientY; };

  const tick = (curEl, ringEl) => {
    if (!curEl || !ringEl) return;
    curEl.style.left = mx + 'px';
    curEl.style.top = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ringEl.style.left = rx + 'px';
    ringEl.style.top = ry + 'px';
    rafId = requestAnimationFrame(() => tick(curEl, ringEl));
  };

  onMounted(() => {
    const curEl = document.getElementById('ej-cur');
    const ringEl = document.getElementById('ej-ring');
    document.addEventListener('mousemove', onMouseMove);
    tick(curEl, ringEl);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onMouseMove);
    if (rafId) cancelAnimationFrame(rafId);
  });
}