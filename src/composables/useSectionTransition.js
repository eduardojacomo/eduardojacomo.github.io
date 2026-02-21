import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export function useParallaxReveal(targetRef) {
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(targetRef.value, 
        { 
          y: "20vh", // Começa um pouco abaixo
          borderTopLeftRadius: "100px", 
          borderTopRightRadius: "100px",
        }, 
        { 
          y: 0, 
          borderTopLeftRadius: "0px", 
          borderTopRightRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: targetRef.value,
            start: "top bottom", // Quando o topo da seção encosta no fim da tela
            end: "top top",    // Quando o topo da seção encosta no topo da tela
            scrub: true,
          }
        }
      );
    });
  });

  onUnmounted(() => ctx && ctx.revert());
}

export function useSectionShrink(portfolioRef, contactRef) {
  let ctx;
  onMounted(() => {
    ctx = gsap.context(() => {
      // Timeline para sincronizar os dois movimentos
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.value, // O gatilho é a entrada do contato
          start: "top 80%",          // Começa quando o contato está quase entrando
          end: "top 10%",            // Termina quando o contato cobriu quase tudo
          scrub: 1.5,
        }
      });

      tl.to(portfolioRef.value, {
        width: "80%",
        scale: 0.9,
        borderBottomLeftRadius: "100px",
        borderBottomRightRadius: "100px",
        y: "-50px", // Leve subida para efeito de profundidade
        ease: "none"
      });
    });
  });
  onUnmounted(() => ctx && ctx.revert());
}