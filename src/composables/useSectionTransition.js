import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export function useParallaxReveal(targetRef, options = {}) {
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      let fromVars = { y: "0" };

      if (options && options.hasBorder) {
        fromVars = { 
          y: "20vh", 
          borderTopLeftRadius: "100px", 
          borderTopRightRadius: "100px" 
        };
      }

      gsap.fromTo(targetRef.value, 
        fromVars, 
        { 
          y: 0, 
          borderTopLeftRadius: "0px", 
          borderTopRightRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: targetRef.value,
            start: "top bottom", 
            end: "top top",
            scrub: true,
          }
        }
      );
    });
  });

  onUnmounted(() => ctx && ctx.revert());
}

export function useSectionShrink(sectionExit, sectionEnter) {
  let ctx;
  onMounted(() => {
    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEnter.value,
          start: "top bottom", 
          end: "top 20%",
          scrub: 1.5,
        }
      });

      tl.to(sectionExit.value, {
        // Em vez de scale, usamos clip-path ou padding para ser sutil
        // Aqui usamos padding lateral para dar o efeito de 2rem
        paddingLeft: "2rem",
        paddingRight: "2rem",
        
        // Se quiser que a seção inteira "estreite", o scale deve ser quase 1
        scale: 0.98, 
        
        borderBottomLeftRadius: "80px",
        borderBottomRightRadius: "80px",
        y: "-20px", // Subida mais sutil
        ease: "power1.inOut"
      });
    });
  });
  onUnmounted(() => ctx && ctx.revert());
}