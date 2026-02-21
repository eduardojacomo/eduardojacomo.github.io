import { onMounted } from 'vue';
import gsap from 'gsap';

export function useHeroAnimation() {
  onMounted(() => {
    // 1. Efeito Typewriter no Eyebrow
    const eyebrow = document.querySelector('.hero-eyebrow-inner');
    if (eyebrow) {
      const fullText = eyebrow.dataset.text || "";
      eyebrow.textContent = '';
      let i = 0;
      const type = () => {
        if (i < fullText.length) {
          eyebrow.textContent += fullText[i++];
          setTimeout(type, 42);
        }
      };
      setTimeout(type, 300);
    }

    // 2. Timeline Principal GSAP
    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out', duration: 1 } 
    });

    tl.to('.hero-line-inner', { y: '0%', stagger: 0.13, delay: 0.25 })
      .to('.hero-lead', { opacity: 1, y: 0, duration: 0.9 }, '-=0.55')
      .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.45')
      .to('.hero-col-right', { opacity: 1, y: 0, duration: 1.0 }, '-=0.7')
      .to('.hero-scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');

    // 3. Loop do Pulse no indicador de scroll
    gsap.to('.scroll-line-fill', {
      scaleY: 1,
      duration: 1.4,
      repeat: -1,
      ease: 'power1.inOut',
      transformOrigin: 'top center',
      delay: 1.8
    });
  });
}