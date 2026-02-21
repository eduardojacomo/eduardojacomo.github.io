<script setup>
  import { ref } from 'vue';
  import Hero from '../components/sections/Hero.vue'
  import About from '../components/sections/About.vue'
  import Portfolio from '../components/sections/Portfolio.vue'
  import Services from '@/components/Services.vue';
  import Contato from '@/components/Contato.vue';
  import { useParallaxReveal, useSectionShrink } from '@/composables/useSectionTransition';

  const aboutSection = ref(null);
  const portfolioRef = ref(null);
  const contactRef = ref(null);

  // Implementando o padrão de forma limpa
  // useParallaxReveal(servicesSection, {
  //   startY: 150,
  //   borderRadius: "150px",
  //   scrub: 1.5
  // });

// Revela a seção About ao subir
  useParallaxReveal(aboutSection);
 // Faz o portfolio diminuir conforme o contato sobe
  useSectionShrink(portfolioRef, contactRef);

  // Faz o contato subir com o efeito de revelação (parallax/borda superior)
  useParallaxReveal(contactRef);

</script>

<template>
  <main>
    <section id="hero" class="section hero">
      <Hero />
    </section>

    <section id="about" ref="aboutSection" class="section about">
      <About />
    </section>

   <section id="portfolio" ref="portfolioRef" class="section portfolio">
      <Portfolio />
    </section>

    <section id="contact" ref="contactRef" class="section contact">
      <Contato />
    </section>
  </main>
</template>

<style scoped>
main{
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow: visible; 
  display: block;
}


html {
  scroll-behavior: smooth;
}

.section{
  min-height: 100vh;
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
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100%;
}

.section.about {
  position: relative;
  z-index: 2; /* Garante que ela passe por cima da Hero */
  background: #0a0a0a; /* Cor levemente diferente para contraste */
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.5); /* Sombra para dar profundidade na subida */
  padding: 100px 20px;
  width: 100%;
}

.section.portfolio {
  position: sticky;
  top: 0;
  z-index: 3;
  width: 100%;
  background: #0a0a0a;
  transform-origin: center center;
  overflow: hidden;
  /* Aumente significativamente o padding bottom para dar tempo do 
     último projeto ser visto antes do Contato subir */
  padding-bottom: 75vh; 
  min-height: 170vh;
}

.section.contact {
position: relative;
  z-index: 4; /* O mais alto de todos */
  background: #000;
  min-height: 100vh;
  width: 100%;
  padding: 100px 20px;
  box-shadow: 0 -50px 100px rgba(0,0,0,0.8);
}
</style>