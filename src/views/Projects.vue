<script setup>
import { ref, computed, onMounted, onUnmounted, onBeforeMount } from 'vue'
import Navegador from '../components/Navegador.vue';
import Smartphone from '@/components/Smartphone.vue';
import Tablet from '@/components/Tablet.vue';
import {storeToRefs} from 'pinia';
import {useProjects} from '@/stores/projectStore'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {useLanguage} from '../stores/languageStore'

const uselanguage = useLanguage();
const { currentLocaleKey} = storeToRefs(uselanguage);


const useprojects = useProjects();
const {projectStore} = storeToRefs(useprojects);
const route = useRouter();
const resolucao = ref('');
const { t } = useI18n();
// const emit = defineEmits(['close'])
const currentImageIndex = ref(0)

const nextImage = () => {

  if (currentImageIndex.value < projectStore.value.imagesNavegador.length - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

function verifyData(){
  if (!projectStore.value.codigo){
    route.push('/#portfolio');
  }
}

function verifyResolution(){
  let _width = window.innerWidth;
  if (_width <= '480'){
    resolucao.value = 'Smartphone'
  } else if ( _width > '480' && _width <= '780'){
    resolucao.value = 'Tablet'
  }else{
    resolucao.value = 'Navegador'
  }

}

onUnmounted(() => {
      window.removeEventListener('resize', verifyResolution);
    });

onBeforeMount(()=>{
  verifyData();
})

onMounted(()=>{
  verifyResolution();
  window.addEventListener('resize', verifyResolution);
})
</script>

<template>
  <div class="container">
    <div class="content">
      <router-link to="/#portfolio" class="close-button"><font-awesome-icon icon="fa-solid fa-arrow-left" /></router-link>
      <div class="description">
        <Transition name="fade-blur" mode="out-in">
          <h2 :key="currentLocaleKey"> {{t(`_${projectStore.codigo}._title`)}} </h2>
        </Transition>
        <Transition name="fade-blur" mode="out-in">
          <p :key="currentLocaleKey">{{t(`_${projectStore.codigo}._details`)}}</p>
        </Transition>
        <Transition name="fade-blur" mode="out-in">
          <ul :key="currentLocaleKey">
            <li v-for="(tag, index) in projectStore.tags" :key="index">{{ tag }} </li>
          </ul>   
        </Transition>
        <Transition name="fade-blur" mode="out-in">
          <div class="links" :key="currentLocaleKey">
            <div v-for="(l,index) in projectStore.links" :key="index">
              <a :href="l.link" target="_blank" v-if="l.plataforma==='Code'"><span class="links-text"> <i class="devicon-github-original"></i> {{ l.plataforma }}</span></a>
              <a :href="l.link" target="_blank" v-else><span class="links-text"> <font-awesome-icon :icon="l.icon" />  {{ l.plataforma }}</span></a>
            </div>
          </div>  
        </Transition>
      </div>
      <div class="content-projeto" v-if="projectStore">
        <Transition name="fade-blur" mode="out-in">
          <Navegador :imageSrc = "projectStore.imagesNavegador[currentImageIndex].src" :url="projectStore.url" v-if="resolucao === 'Navegador'" :key="currentLocaleKey"/>
        </Transition>
        <Transition name="fade-blur" mode="out-in">
          <Tablet :imageSrc = "projectStore.imagesTablet[currentImageIndex].src" :url="projectStore.url" v-if="resolucao === 'Tablet'" :key="currentLocaleKey"/>
        </Transition>
        <Transition name="fade-blur" mode="out-in">
          <Smartphone :imageSrc = "projectStore.imagesSmartphone[currentImageIndex].src" :url="projectStore.url" v-if="resolucao ==='Smartphone'" :key="currentLocaleKey"/>
        </Transition>
     
        <!-- <img :key="currentImageIndex" :src="project.images[currentImageIndex]" alt="Imagem do Projeto" /> -->
         <div class="botoes" v-if="projectStore.imagesNavegador">
          <button @click="prevImage" :disabled="currentImageIndex === 0"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
          <button @click="nextImage" :disabled="currentImageIndex === projectStore.imagesNavegador.length - 1"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 300ms ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%); 
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-to, .slide-leave-from {
  opacity: 1;
  transform: translateX(0); 
}

@media screen and (max-width: 1024px){
    .content{
        flex-direction: column !important;
        
    }
    .content-projeto{
        justify-content: center;
        order: -1;
    }
    .description{
        padding: 1rem .5rem;
        height: auto;
    }
}

/* @media screen and (max-width: 480px){
    .content{
        flex-direction: column;
    }
} */

.container {
  width: 100%;
  height: 100vh;
  background-color: var(--color-backgroud);
  color: var(--color-text);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  /* position: relative; */
  align-items: center;
  padding: 72px 2rem 2rem 2rem;
}

.content-projeto{
  display: flex;
  position: relative;
  justify-content: center;
  width: clamp(380px, 100%, 910px);
}

.close-button {
  position: absolute;
  top: 82px;
  left: 1rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: var(--color-heading);
  font-size: 1.5rem;
  z-index: 200;
}

.image-slider {
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: clamp(350px, 85%, 1380px);
}

.image-slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.botoes button {
  background-color: transparent;
  color: var(--color-heading);
  font-size: 1.8rem;
  border: none;
  cursor: pointer;
  padding: 0 .5rem;
}

.botoes button:disabled {
  color: var(--color-border);
  cursor: auto;
}

.botoes {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: absolute;
  /* top: 50%; */
  top: 50%;
  left: 0;
  padding: 0;
  justify-content: space-between;
  /* z-index: 1001; */
}

.legend {
  display: flex;
  flex-direction: column;
  padding: 0 6rem;
  align-items: center;
  color: var(--color-heading);
}

.description{
  display: flex;
  flex: 1 0 380px;
  max-width: 450px;
  flex-direction: column;
  padding: 0 .5rem;
}

.description h2{
  font-size: 2rem;
  font-weight: 600;
}

.description p{
  text-align: justify;
  padding-bottom: .5rem;
}
ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  
}
ul li{
  display: inline-flex;
  flex-direction: row;
  padding: .5rem 1rem;
  margin-inline: 5px;
  text-align: center;
  border: none;
  border-radius: 16px;
  /* background-color: var(--color-backgroud-soft); */
  background-color:var(--color-background-mute); 
}

.links{
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: .5rem;
  margin-top: 2rem;
}

.links a{
  text-decoration: none;
  display: flex;
  padding: 5px 15px;
  border: solid 3px var(--color-background-soft);
  border-radius: 8px;
  background-color: var(--color-background-soft);
  cursor: pointer;
  transition: 400ms;
}

.links-text{
  color: var(--color-text);
  transition: 400ms;
}

.links a:hover{
  background-color: transparent;
  border: solid 3px var(--color-border);
}

.links a:hover .links-text{
  color: var(--color-heading);
}
</style>
