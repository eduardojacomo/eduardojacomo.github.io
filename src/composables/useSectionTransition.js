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
    // Criamos o contexto com matchMedia para lidar com a responsividade
    ctx = gsap.matchMedia();

    ctx.add({
      // Define as condições (ajuste os pixels se necessário)
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      // Extraímos as condições para facilitar o uso
      const { isDesktop } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEnter.value,
          start: "top bottom",
          end: "top 20%",
          scrub: 1.5,
        }
      });

      tl.to(sectionExit.value, {
        // Lógica condicional para o padding
        paddingLeft: isDesktop ? "2rem" : "0.5rem",
        paddingRight: isDesktop ? "2rem" : "0.5rem",
        
        scale: 0.98, 
        borderBottomLeftRadius: isDesktop ? "80px" : "40px", // Reduzido no mobile para harmonia
        borderBottomRightRadius: isDesktop ? "80px" : "40px",
        y: isDesktop ? "-20px" : "-10px",
        ease: "power1.inOut"
      });
    });
  });

  onUnmounted(() => ctx && ctx.revert());
}