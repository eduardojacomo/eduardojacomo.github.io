<script setup>
import { ref, computed, onMounted, onUnmounted, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useProjects } from '@/stores/projectStore';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLanguage } from '@/stores/languageStore';

const uselanguage = useLanguage();
const { currentLocaleKey } = storeToRefs(uselanguage);

const useprojects = useProjects();
const { projectStore } = storeToRefs(useprojects);
const route = useRouter();
const { t } = useI18n();

// ── Carousel ──
const activeSlide  = ref(0);
const carouselRef  = ref(null);
const isDragging   = ref(false);
const dragStartX   = ref(0);
const dragDeltaX   = ref(0);

const images = computed(() => projectStore.value?.imagesNavegador ?? []);
const total  = computed(() => images.value.length);

function goTo(i) {
  activeSlide.value = Math.max(0, Math.min(i, total.value - 1));
}
function prev() { goTo(activeSlide.value - 1); }
function next() { goTo(activeSlide.value + 1); }

// Keyboard navigation
function onKeydown(e) {
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === 'ArrowRight') next();
}

// Touch / mouse drag
function dragStart(e) {
  isDragging.value = true;
  dragStartX.value = e.touches ? e.touches[0].clientX : e.clientX;
  dragDeltaX.value = 0;
}
function dragMove(e) {
  if (!isDragging.value) return;
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  dragDeltaX.value = x - dragStartX.value;
}
function dragEnd() {
  if (!isDragging.value) return;
  isDragging.value = false;
  if (dragDeltaX.value < -50) next();
  else if (dragDeltaX.value > 50)  prev();
  dragDeltaX.value = 0;
}

function verifyData() {
  if (!projectStore.value.codigo) route.push('/#portfolio');
}

onBeforeMount(() => verifyData());
onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div class="detail-page">

    <!-- ── TOP BAR ── -->
    <header class="detail-topbar">
      <router-link to="/#portfolio" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        <span>Projetos</span>
      </router-link>

     
    </header>

    <!-- ── MAIN LAYOUT ── -->
    <div class="detail-layout">

      <!-- ══ LEFT — sticky info ══ -->
      <aside class="detail-left">
        <p class="s-label">// Detalhes</p>

        <Transition name="fade-blur" mode="out-in">
          <h1 class="detail-title" :key="currentLocaleKey">
            {{ t(`_${projectStore.codigo}._title`) }}
          </h1>
        </Transition>

        <!-- Tags -->
        <Transition name="fade-blur" mode="out-in">
          <div class="detail-tags" :key="currentLocaleKey">
            <span v-for="tag in projectStore.tags" :key="tag" class="detail-tag">{{ tag }}</span>
          </div>
        </Transition>

        <div class="detail-divider"></div>

        <!-- Short description -->
        <Transition name="fade-blur" mode="out-in">
          <p class="detail-summary" :key="currentLocaleKey">
            {{ t(`_${projectStore.codigo}._description`) }}
          </p>
        </Transition>

        <div class="detail-divider"></div>

        <!-- Meta info -->
        <div class="detail-meta">
          <div class="meta-row" v-if="projectStore.url && projectStore.url !== 'localhost'">
            <span class="meta-label">URL</span>
            <a :href="`https://${projectStore.url}`" target="_blank" class="meta-value meta-link">
              {{ projectStore.url }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" width="10" height="10">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          <div class="meta-row">
            <span class="meta-label">Stack</span>
            <span class="meta-value">{{ projectStore.tags?.join(', ') }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Imagens</span>
            <span class="meta-value">{{ projectStore.imagesNavegador?.length || 1 }}</span>
          </div>
        </div>

        <!-- Links -->
        <div class="detail-links">
          <a
            v-for="lnk in projectStore.links"
            :key="lnk.plataforma"
            :href="lnk.link"
            target="_blank"
            class="detail-link"
          >
            <i :class="lnk.plataforma === 'Code' ? 'devicon-github-original' : lnk.icon"></i>
            <span>{{ lnk.plataforma }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" width="10" height="10">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

      </aside>

      <!-- ══ RIGHT — scrollable content ══ -->
      <div class="detail-right">

        <!-- ── Full detailed description block ── -->
        <div class="content-block">
          <p class="block-label">// Sobre o projeto</p>
          <Transition name="fade-blur" mode="out-in">
            <p class="block-text" :key="currentLocaleKey">
              {{ t(`_${projectStore.codigo}._details`) }}
            </p>
          </Transition>
        </div>

        <!-- ── Carousel ── -->
        <div class="carousel-block">
          <div class="carousel-header">
            <p class="block-label">// Capturas de tela</p>
            <div class="carousel-counter">
              <span class="counter-cur">{{ String(activeSlide + 1).padStart(2, '0') }}</span>
              <span class="counter-sep"> / </span>
              <span class="counter-tot">{{ String(total).padStart(2, '0') }}</span>
            </div>
          </div>

          <!-- Slide viewport -->
          <div
            class="carousel-viewport"
            ref="carouselRef"
            @mousedown="dragStart"
            @mousemove="dragMove"
            @mouseup="dragEnd"
            @mouseleave="dragEnd"
            @touchstart.passive="dragStart"
            @touchmove.passive="dragMove"
            @touchend="dragEnd"
          >
            <!-- Track -->
            <div
              class="carousel-track"
              :style="{ transform: `translateX(calc(-${activeSlide * 100}% + ${isDragging ? dragDeltaX : 0}px))` }"
            >
              <div
                v-for="(img, i) in images"
                :key="i"
                class="carousel-slide"
              >
                <div class="slide-img-wrap">
                  <img
                    :src="img.src"
                    :alt="img.alt || `Screenshot ${i + 1}`"
                    class="slide-img"
                    draggable="false"
                  />
                  <!-- Zoom link -->
                  <div class="slide-overlay">
                    <a :href="img.src" target="_blank" class="slide-zoom" @click.stop>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                      Ver em tamanho real
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <Transition name="fade-blur" mode="out-in">
            <p
              v-if="projectStore.legend?.[activeSlide]"
              class="carousel-legend"
              :key="activeSlide"
            >{{ projectStore.legend[activeSlide] }}</p>
          </Transition>

          <!-- Controls -->
          <div class="carousel-controls">
            <!-- Prev -->
            <button class="car-btn" @click="prev" :disabled="activeSlide === 0" aria-label="Anterior">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>

            <!-- Dots -->
            <div class="car-dots">
              <button
                v-for="(_, i) in images"
                :key="i"
                class="car-dot"
                :class="{ active: i === activeSlide }"
                @click="goTo(i)"
                :aria-label="`Slide ${i + 1}`"
              ></button>
            </div>

            <!-- Next -->
            <button class="car-btn" @click="next" :disabled="activeSlide === total - 1" aria-label="Próximo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <!-- Thumbnail strip (only if > 1 image) -->
          <div class="car-thumbs" v-if="total > 1">
            <button
              v-for="(img, i) in images"
              :key="i"
              class="car-thumb"
              :class="{ active: i === activeSlide }"
              @click="goTo(i)"
            >
              <img :src="img.src" :alt="`Thumb ${i + 1}`" draggable="false" />
            </button>
          </div>

        </div>

        <!-- ── Features / highlights ── (if i18n key exists) -->
        <div class="content-block">
          <p class="block-label">// Stack utilizada</p>
          <div class="stack-grid">
            <div
              v-for="tag in projectStore.tags"
              :key="tag"
              class="stack-item"
            >
              <span class="stack-dot"></span>
              <span class="stack-name">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- ── Bottom CTA ── -->
        <div class="detail-cta-block">
          <p class="block-label">// Ver projeto</p>
          <div class="cta-links">
            <a
              v-for="lnk in projectStore.links"
              :key="lnk.plataforma"
              :href="lnk.link"
              target="_blank"
              class="cta-link"
            >
              <i :class="lnk.plataforma === 'Code' ? 'devicon-github-original' : lnk.icon"></i>
              <span>{{ lnk.plataforma }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

* {
  box-sizing: border-box;
}

.detail-page, .detail-page * {
  box-sizing: border-box;
}

.detail-page {
  overflow-x: hidden;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  background: var(--color-background, #060608);
  color: var(--color-text, #e2e2ea);
  padding-top: 58.09px;
}

.detail-topbar {
  position: fixed;
  top: 58.09px; left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  background: rgba(6,6,8,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  z-index: 500;
  gap: 2rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(226,226,234,0.38);
  flex-shrink: 0;
  transition: color 0.2s;
}
.back-btn:hover { color: var(--color-heading, #e2e2ea); }
.back-btn svg { transition: transform 0.25s; }
.back-btn:hover svg { transform: translateX(-3px); }

.topbar-title {
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-heading, #e2e2ea);
}

.topbar-links { display: flex; gap: 0.5rem; flex-shrink: 0; }
.topbar-link {
  display: inline-flex; align-items: center; gap: 0.4rem;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(226,226,234,0.35);
  border: 1px solid rgba(255,255,255,0.07);
  padding: 0.26rem 0.65rem;
  transition: color 0.2s, border-color 0.2s;
}
.topbar-link:hover { color: #4d7cff; border-color: rgba(77,124,255,0.4); }


.detail-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  margin-top: 64px;
  min-height: calc(100vh - 64px);
}


.detail-left {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  scrollbar-width: none;
  padding: 3.5rem 2.5rem;
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
.detail-left::-webkit-scrollbar { display: none; }

.s-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #4d7cff;
}

.detail-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: var(--color-heading, #e2e2ea);
}

/* Tags */
.detail-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.detail-tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  color: rgba(77,124,255,0.8);
  border: 1px solid rgba(77,124,255,0.2);
  padding: 0.18rem 0.55rem;
}

.detail-divider { height: 1px; background: rgba(255,255,255,0.06); flex-shrink: 0; }

.detail-summary {
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.85;
  color: rgba(226,226,234,0.45);
}

/* Meta */
.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.06);
}
.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.65rem 0.9rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.meta-row:last-child { border-bottom: none; }
.meta-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(226,226,234,0.25);
  flex-shrink: 0;
  width: 48px;
  padding-top: 1px;
}
.meta-value {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  color: rgba(226,226,234,0.5);
  line-height: 1.5;
  min-width: 0;
  word-break: break-all;
  overflow-wrap: break-word;
}
.meta-link {
  display: inline-flex; align-items: center; gap: 0.35rem;
  text-decoration: none; color: #4d7cff;
  transition: opacity 0.2s;
}
.meta-link:hover { opacity: 0.75; }

/* Links */
.detail-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: auto;
}
.detail-link {
  display: inline-flex; align-items: center; gap: 0.65rem;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(226,226,234,0.38);
  border: 1px solid rgba(255,255,255,0.07);
  padding: 0.65rem 1rem;
  position: relative; overflow: hidden;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.detail-link::before {
  content: '';
  position: absolute; top: 0; left: 0; bottom: 0; width: 1px;
  background: #4d7cff;
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.3s cubic-bezier(.25,.46,.45,.94);
}
.detail-link:hover::before { transform: scaleY(1); }
.detail-link:hover { color: #4d7cff; border-color: rgba(77,124,255,0.35); background: rgba(77,124,255,0.04); }
.detail-link i { font-size: 0.9rem; }
.detail-link span { flex: 1; }
.detail-link svg { opacity: 0; transform: translateX(-4px); transition: opacity 0.2s, transform 0.2s; }
.detail-link:hover svg { opacity: 1; transform: translateX(0); }


.detail-right {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Shared block label ── */
.block-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #4d7cff;
  margin-bottom: 1.5rem;
}

/* ── Description block ── */
.content-block {
  padding: 4rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.block-text {
  font-family: 'DM Mono', monospace;
  font-size: 0.88rem;
  line-height: 2;
  color: rgba(226,226,234,0.5);
  max-width: 680px;
}


.carousel-block {
  padding: 4rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.carousel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.carousel-header .block-label { margin-bottom: 0; }

.carousel-counter { font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.1em; }
.counter-cur { color: #4d7cff; font-size: 0.9rem; font-family: 'Syne', sans-serif; font-weight: 700; }
.counter-sep,
.counter-tot { color: rgba(226,226,234,0.2); }

/* Viewport */
.carousel-viewport {
  width: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  border: 1px solid rgba(255,255,255,0.06);
  background: #0c0c10;
}
.carousel-viewport:active { cursor: grabbing; }

/* Track */
.carousel-track {
  display: flex;
  width: 100%;
  transition: transform 0.5s cubic-bezier(.25,.46,.45,.94);
  will-change: transform;
}
.carousel-slide { flex: 0 0 100%; width: 100%; height: 100%; display: block; object-fit: contain;}

.slide-img-wrap { position: relative; width: 100%; overflow: hidden; }
.slide-img {
  width: 100%; display: block;
  filter: grayscale(25%);
  transition: filter 0.4s;
  pointer-events: none;
}
.carousel-viewport:hover .slide-img { filter: grayscale(0%); }

.slide-overlay {
  position: absolute; inset: 0;
  background: rgba(6,6,8,0.65);
  backdrop-filter: blur(3px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.carousel-viewport:hover .slide-overlay { opacity: 1; }

.slide-zoom {
  display: inline-flex; align-items: center; gap: 0.5rem;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: #fff; background: rgba(77,124,255,0.9);
  padding: 0.65rem 1.4rem;
  pointer-events: all;
  transition: background 0.2s;
}
.slide-zoom:hover { background: #6b92ff; }

/* Legend */
.carousel-legend {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.06em;
  color: rgba(226,226,234,0.28);
  min-height: 1.2em;
}

/* Controls row */
.carousel-controls { display: flex; align-items: center; gap: 1.2rem; }

.car-btn {
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(226,226,234,0.4);
  cursor: pointer; flex-shrink: 0;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.car-btn:hover:not(:disabled) { color: #4d7cff; border-color: rgba(77,124,255,0.45); background: rgba(77,124,255,0.06); }
.car-btn:disabled { color: rgba(226,226,234,0.1); border-color: rgba(255,255,255,0.04); cursor: default; }

/* Dots */
.car-dots { display: flex; align-items: center; gap: 0.45rem; flex: 1; }
.car-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  border: 1px solid rgba(77,124,255,0.3);
  background: transparent;
  cursor: pointer; padding: 0;
  transition: background 0.25s, width 0.3s, border-radius 0.3s, border-color 0.25s;
}
.car-dot.active { background: #4d7cff; border-color: #4d7cff; width: 20px; border-radius: 3px; }

/* Thumbnail strip */
.car-thumbs {
  display: flex; gap: 4px;
  overflow-x: auto; scrollbar-width: none; padding-bottom: 2px;
  flex-wrap: wrap;
}
.car-thumbs::-webkit-scrollbar { display: none; }

.car-thumb {
  flex: 0 0 80px; height: 52px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  background: #0c0c10;
  cursor: pointer; padding: 0;
  opacity: 0.45;
  transition: opacity 0.25s, border-color 0.25s;
}
.car-thumb.active { opacity: 1; border-color: #4d7cff; }
.car-thumb:hover { opacity: 0.8; }
.car-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }

/* ── Stack grid ── */
.stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 2px;
}
.stack-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  transition: border-color 0.25s, background 0.25s;
}
.stack-item:hover {
  border-color: rgba(77,124,255,0.2);
  background: rgba(77,124,255,0.04);
}
.stack-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #4d7cff;
  flex-shrink: 0;
}
.stack-name {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: rgba(226,226,234,0.45);
}

.detail-cta-block {
  padding: 4rem;
}
.cta-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.cta-link {
  display: inline-flex; align-items: center; gap: 0.7rem;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--color-heading, #e2e2ea);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.9rem 1.8rem;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
  position: relative; overflow: hidden;
}
.cta-link::before {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: #4d7cff;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(.25,.46,.45,.94);
}
.cta-link:hover::before { transform: scaleX(1); }
.cta-link:hover { background: rgba(77,124,255,0.06); border-color: rgba(77,124,255,0.3); }
.cta-link i { font-size: 1rem; }

/* ── TRANSITIONS ── */
.fade-blur-enter-active, .fade-blur-leave-active { transition: all 0.35s ease; }
.fade-blur-enter-from,  .fade-blur-leave-to { opacity: 0; filter: blur(5px); transform: translateY(5px); }

/* ── RESPONSIVE ── */
@media screen and (max-width: 1024px) {
  .detail-layout { grid-template-columns: 280px 1fr; }
  .content-block, .carousel-block, .detail-cta-block { padding: 3rem 2.5rem; }
}

@media screen and (max-width: 768px) {
  .detail-layout { grid-template-columns: 1fr; }
  .detail-left {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    overflow-y: visible;
    padding: 2.5rem 1.5rem;
    gap: 1.2rem;
  }
  .detail-links { margin-top: 0; }
  .content-block, .carousel-block, .detail-cta-block { padding: 2.5rem 1.5rem; }
  
  .detail-topbar { padding: 0 1.5rem; }
  .topbar-title { display: none; }
}

@media screen and (max-width: 480px) {
  .detail-topbar { padding: 0 1rem; }
  .topbar-links { display: none; }
  .stack-grid { grid-template-columns: 1fr; }
  .stack-item {
    min-width: 0;
  }
  .stack-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

.content-block, 
.carousel-block, 
.detail-cta-block,
.detail-left {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box; 
}

.carousel-viewport {
  width: 100%;
  max-width: 100%;
  overflow: hidden; 
  position: relative;
  display: block;
}

.carousel-track {
  display: flex;
  
}

.carousel-slide {
  flex: 0 0 100%; 
  width: 100%;
  max-width: 100%;
}

}
</style>