<script setup>
  import { ref, onMounted } from 'vue';
  import Hero from '../components/sections/Hero.vue'
  import About from '../components/sections/About.vue'
  import Portfolio from '../components/sections/Portfolio.vue'
  import Services from '@/components/sections/Services.vue';
  import Contato from '@/components/sections/Contato.vue';
  import { useParallaxReveal, useSectionShrink } from '@/composables/useSectionTransition';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';


  const heroRef = ref(null);
  const aboutSection = ref(null);
  const portfolioRef = ref(null);
  const contactRef = ref(null);
  const servicesSection = ref(null);
  // Implementando o padrão de forma limpa
  // useParallaxReveal(servicesSection, {
  //   startY: 150,
  //   borderRadius: "150px",
  //   scrub: 1.5
  // });

// Revela a seção About ao subir
  useParallaxReveal(aboutSection, { hasBorder: true });
 // Faz o portfolio diminuir conforme o contato sobe
  useSectionShrink(servicesSection, contactRef);

  // Faz o contato subir com o efeito de revelação (parallax/borda superior)
  useParallaxReveal(contactRef);


  onMounted(() => {
    gsap.to(heroRef.value, {
      opacity: 0,
      scrollTrigger: {
        trigger: aboutSection.value,
        start: "top bottom", 
        end: "top top",
        scrub: true,
      }
    });
  });

</script>

<template>
  <main>
    <section id="hero" ref="heroRef" class="section hero">
      <Hero />
    </section>

    <section id="about" ref="aboutSection" class="section about">
      <About />
    </section>

   <section id="portfolio" ref="portfolioRef" class="section portfolio">
      <Portfolio />
    </section>
    
     <section id="services" ref="servicesSection" class="section services">
      <Services />
    </section>

    <section id="contact" ref="contactRef" class="section contact">
      <Contato />
    </section>
  </main>
</template>

<style scoped>
main{
  background-color: #000; 
  position: relative;
  width: 100%;
}


html {
  scroll-behavior: smooth;
}

.section{
  min-height: 100vh;
  width: 100%;
}

@media screen and (max-width: 480px){
  .section{
  min-height: auto;
}
}


.section.hero {
  position: sticky; 
  top: 0;
  height: 100vh;
  z-index: 1;
  width: 100%;
}

.section.about, .section.portfolio {
  position: relative;
  z-index: 2; 
  background: #0a0a0a; /* Cor levemente diferente para contraste */
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.5); /* Sombra para dar profundidade na subida */
  padding: 100px 20px;
  width: 100%;
}

.section.services {
  position: relative;
  z-index: 3;
  width: 100%;
  background: #0a0a0a;  
  transform-origin: top center; 
  overflow: hidden;
  /* transition: border-radius 0.2s;  */
}

.section.contact {
position: relative;
  z-index: 4; 
  background: #000;
  min-height: 100vh;
  width: 100%;
}
</style>