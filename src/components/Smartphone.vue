<script setup>
    import { ref } from 'vue'
    
    const props = defineProps({
    imageSrc: Text,
    url: Text
    })
</script>

<template>
    <div class="smartphone">
    <div class="camera"></div>
    <div class="speaker"></div>
    <div class="screen">
        <img :src="props.imageSrc" alt="Imagem do Site" />
    </div>
    <div class="home-button"></div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Estrutura do smartphone */
.smartphone {
  position: relative;
  width: 250px;
  height: 500px;
  background-color: #333;
  border-radius: 30px;
  padding: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Detalhe da câmera frontal */
.camera {
  position: absolute;
  top: 15px;
  left: 50%;
  width: 12px;
  height: 12px;
  background-color: #555;
  border-radius: 50%;
  transform: translateX(-50%);
}

/* Alto-falante superior */
.speaker {
  position: absolute;
  top: 35px;
  left: 50%;
  width: 60px;
  height: 5px;
  background-color: #666;
  border-radius: 5px;
  transform: translateX(-50%);
}

/* Tela do smartphone */
.screen {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.screen img{
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

/* Conteúdo interno da tela */
.app {
  text-align: center;
  font-size: 1rem;
}

/* Botão Home na parte inferior */
.home-button {
  position: absolute;
  bottom: 15px;
  left: 50%;
  width: 40px;
  height: 40px;
  background-color: #444;
  border-radius: 50%;
  transform: translateX(-50%);
}

</style>