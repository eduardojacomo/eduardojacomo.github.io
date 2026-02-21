<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useProjects } from '@/stores/projectStore';
import { useLanguage } from '@/stores/languageStore';

const uselanguage = useLanguage();
const { currentLocaleKey } = storeToRefs(uselanguage);

const router = useRouter();
const useprojects = useProjects();
const { projectStore } = storeToRefs(useprojects);
const resolucao = ref('Navegador');
const { t } = useI18n();

const projects = ref([
  {
    codigo: 'p1',
    title: 'Site para Psicóloga Renata',
    links: [{ plataforma: 'Preview', link: 'https://www.psirenatamachado.com', icon: 'fa-solid fa-eye' }],
    tags: ['HTML', 'CSS', 'JavaScript', 'Vue'],
    imagesNavegador: [{ src: new URL('/src/assets/psirenatamachado.png', import.meta.url).href, alt: 'Image 1' }],
    imagesTablet:    [{ src: new URL('/src/assets/psirenatamachado.png', import.meta.url).href, alt: 'Image 1' }],
    imagesSmartphone:[{ src: new URL('/src/assets/psirenatamachado.png', import.meta.url).href, alt: 'Image 1' }],
  },
  {
    codigo: 'p2',
    title: 'Church Site',
    links: [
      { plataforma: 'Preview', link: 'https://www.lifeandspiritchurch.com', icon: 'fa-solid fa-eye' },
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Firebase'],
    imagesNavegador: [{ src: new URL('/src/assets/lifeandspiritchurch.png', import.meta.url).href, alt: 'Image 1' }],
    imagesTablet:    [{ src: new URL('/src/assets/lifeandspiritchurch_tablet.png', import.meta.url).href, alt: 'Image 1' }],
    imagesSmartphone:[{ src: new URL('/src/assets/lifeandspiritchurch_mobile.png', import.meta.url).href, alt: 'Image 1' }],
  },
  {
    codigo: 'p3',
    title: 'CourseAPI',
    links: [{ plataforma: 'Code', link: 'https://github.com/eduardojacomo/CoursesAPI', icon: 'fa-brands fa-github' }],
    tags: ['.NET', 'SQL Server', 'Entity Framework', 'Swagger'],
    imagesNavegador: [{ src: new URL('/src/assets/CourseAPI.png', import.meta.url).href, alt: 'Image 1' }],
    imagesTablet:    [{ src: new URL('/src/assets/apiCourseTablet.jpeg', import.meta.url).href, alt: 'Image 1' }],
    imagesSmartphone:[{ src: new URL('/src/assets/apiCourseSmartphone.jpeg', import.meta.url).href, alt: 'Image 1' }],
  },
  {
    codigo: 'p4',
    title: 'BlogApi',
    links: [
      { plataforma: 'Code',    link: 'https://github.com/eduardojacomo/BlogAPI',    icon: 'fa-brands fa-github' },
    ],
    tags: ['JavaScript', 'ExpressJs', 'MongoDB', 'JWT'],
    imagesNavegador: [{ src: new URL('/src/assets/blogapi.png', import.meta.url).href, alt: 'Image 1' }],
    imagesTablet:    [{ src: new URL('/src/assets/blogapi.png', import.meta.url).href, alt: 'Image 1' }],
    imagesSmartphone:[{ src: new URL('/src/assets/blogapi.png', import.meta.url).href, alt: 'Image 1' }],
  },
  {
    codigo: 'p5',
    title: 'Sistema de Pedidos',
    links: [
      { plataforma: 'Code',    link: 'https://github.com/eduardojacomo',    icon: 'fa-brands fa-github' },
      { plataforma: 'Preview', link: 'https://www.psirenatamachado.com', icon: 'fa-solid fa-eye' },
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Vue'],
    imagesNavegador: [{ src: new URL('/src/assets/makeburguer_home.png', import.meta.url).href, alt: 'Image 1' }],
    imagesTablet:    [{ src: new URL('/src/assets/make-burguer-capa-ipad.jpeg', import.meta.url).href, alt: 'Image 1' }],
    imagesSmartphone:[{ src: new URL('/src/assets/make-burguer-capa-smartphone.jpeg', import.meta.url).href, alt: 'Image 1' }],
  },
]);

const activeIndex  = ref(0);
const projectRefs  = ref([]);
const scrollerRef  = ref(null);   // ref to the horizontal scroll container (mobile)
const isMobile     = ref(false);
let   ioObservers  = [];

function getImage(project) {
  if (resolucao.value === 'Smartphone') return project.imagesSmartphone[0];
  if (resolucao.value === 'Tablet')     return project.imagesTablet[0];
  return project.imagesNavegador[0];
}

function setProjectDetail(project) {
  projectStore.value = project;
  router.push({ name: 'projects' });
}

// Desktop: scroll the right column vertically to the item
// Mobile:  scroll the horizontal strip to the card
function scrollToProject(index) {
  if (isMobile.value && scrollerRef.value) {
    const card = projectRefs.value[index];
    if (!card) return;
    // Scroll the strip so this card is at the left edge (snap)
    scrollerRef.value.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  } else {
    projectRefs.value[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function verifyResolution() {
  const w = window.innerWidth;
  isMobile.value  = w <= 860;
  resolucao.value = w <= 480 ? 'Smartphone' : w <= 780 ? 'Tablet' : 'Navegador';

  // Re-bind observers when layout mode switches
  setTimeout(bindObservers, 80);
}

// Called on horizontal scroll (mobile) — update activeIndex from scrollLeft
function onHorizontalScroll() {
  const scroller = scrollerRef.value;
  if (!scroller) return;
  const cardWidth = scroller.clientWidth;          // each card snaps to 100vw-ish
  const idx = Math.round(scroller.scrollLeft / cardWidth);
  activeIndex.value = Math.min(Math.max(idx, 0), projects.value.length - 1);
}

function bindObservers() {
  ioObservers.forEach(o => o.disconnect());
  ioObservers = [];

  if (isMobile.value) {
    // Código mobile mantido...
    if (scrollerRef.value) {
      scrollerRef.value.removeEventListener('scroll', onHorizontalScroll);
      scrollerRef.value.addEventListener('scroll', onHorizontalScroll, { passive: true });
    }
  } else {
    // DESKTOP: Ajuste fino para sincronização
    projectRefs.value.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { 
          // Se o elemento estiver cruzando a parte superior da tela
          if (entry.isIntersecting) {
            activeIndex.value = i; 
          }
        },
        { 
          // rootMargin: "0px 0px -50% 0px" faz o "gatilho" ser o meio da tela
          // threshold: 0.2 detecta assim que uma parte pequena aparece
          rootMargin: "-20% 0px -60% 0px", 
          threshold: 0 
        }
      );
      obs.observe(el);
      ioObservers.push(obs);
    });
  }

  // Reveal animation — always
  document.querySelectorAll('.proj-animate').forEach(el => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('proj-in-view'); },
      { threshold: 0.06 }
    );
    obs.observe(el);
    ioObservers.push(obs);
  });
}

onMounted(() => {
  verifyResolution();
  window.addEventListener('resize', verifyResolution);
  setTimeout(bindObservers, 120);
});

onUnmounted(() => {
  window.removeEventListener('resize', verifyResolution);
  scrollerRef.value?.removeEventListener('scroll', onHorizontalScroll);
  ioObservers.forEach(o => o.disconnect());
});
</script>

<template>
  <section id="portfolio" class="projects-section">

    <!-- Header -->
    <div class="proj-header proj-animate">
      <p class="s-label">// 04 — Projetos</p>
      <Transition name="fade-blur" mode="out-in">
        <h2 class="s-title" :key="currentLocaleKey">{{ t('_projectsTitle') }}</h2>
      </Transition>
    </div>

    <!-- ── TWO-COLUMN LAYOUT ── -->
    <div class="proj-layout">

      <!-- ══ LEFT sticky nav ══ -->
      <aside class="proj-nav">

        <!-- Big animated number -->
        <div class="proj-big-num" aria-hidden="true">
          <Transition name="num-up" mode="out-in">
            <span class="num-value" :key="activeIndex">
              {{ String(activeIndex + 1).padStart(2, '0') }}
            </span>
          </Transition>
          <span class="num-total">/ {{ String(projects.length).padStart(2, '0') }}</span>
        </div>

        <!-- Clickable list -->
        <nav class="proj-list" aria-label="Lista de projetos">
          <button
            v-for="(project, i) in projects"
            :key="i"
            class="proj-list-btn"
            :class="{ 'is-active': activeIndex === i }"
            @click="scrollToProject(i)"
          >
            <span class="btn-bar"></span>
            <span class="btn-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="btn-label">
              <Transition name="fade-blur" mode="out-in">
                <span :key="currentLocaleKey">{{ t(`_${project.codigo}._title`) }}</span>
              </Transition>
            </span>
          </button>
        </nav>

        <!-- Active project tags -->
        <Transition name="fade-blur" mode="out-in">
          <div class="proj-active-tags" :key="activeIndex">
            <span v-for="tag in projects[activeIndex].tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </Transition>

        <!-- Mobile dot indicators -->
        <div class="proj-dots" aria-hidden="true">
          <span
            v-for="(_, i) in projects"
            :key="i"
            class="proj-dot"
            :class="{ 'proj-dot--active': activeIndex === i }"
            @click="scrollToProject(i)"
          ></span>
        </div>

      </aside>

      <!-- ══ RIGHT scrollable items ══ -->
      <div class="proj-items" ref="scrollerRef">

        <article
          v-for="(project, i) in projects"
          :key="i"
          :ref="el => projectRefs[i] = el"
          class="proj-item proj-animate"
        >
          <!-- ── Image ── -->
          <div class="proj-thumb">
            <Transition name="fade-blur" mode="out-in">
              <img :src="getImage(project).src" :alt="getImage(project).alt" :key="currentLocaleKey" />
            </Transition>
            <div class="proj-thumb-overlay">
              <button class="proj-cta" @click="setProjectDetail(project)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Ver detalhes
              </button>
            </div>
          </div>

          <!-- ── Info bar below image ── -->
          <div class="proj-info">

            <div class="proj-info-row proj-info-top">
              <Transition name="fade-blur" mode="out-in">
                <h3 class="proj-title" :key="currentLocaleKey">
                  {{ t(`_${project.codigo}._title`) }}
                </h3>
              </Transition>
              <span class="proj-idx">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>

            <Transition name="fade-blur" mode="out-in">
              <p class="proj-desc" :key="currentLocaleKey">
                {{ t(`_${project.codigo}._description`) }}
              </p>
            </Transition>

            <div class="proj-info-row proj-info-footer">
              <div class="tag-row">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="proj-links">
                <a
                  v-for="lnk in project.links"
                  :key="lnk.plataforma"
                  :href="lnk.link"
                  target="_blank"
                  class="proj-ext-link"
                >
                  <i :class="lnk.icon"></i>
                  <span>{{ lnk.plataforma }}</span>
                </a>
                <button class="proj-more-btn" @click="setProjectDetail(project)">
                  Ver mais
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" width="11" height="11">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </article>

      </div>
    </div>
  </section>
</template>

<style scoped>
main{
  width: 100%;
  display: flex;
  justify-content: center;
}

/* ── SECTION ── */
.projects-section {
  padding: 8rem 4rem 15rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  width: 100%;
}

/* ── HEADER ── */
.proj-header { margin-bottom: 5rem; }
.s-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #4d7cff;
  margin-bottom: 0.8rem;
}
.s-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: var(--color-heading, #e2e2ea);
}

/* ══════════════════════════════
   TWO-COLUMN
══════════════════════════════ */
.proj-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 5rem;
  align-items: start;
}

/* ══════════════════════════════
   LEFT — STICKY
══════════════════════════════ */
.proj-nav {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Big number */
.proj-big-num {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  overflow: hidden;
}
.num-value {
  font-family: 'Syne', sans-serif;
  font-size: clamp(5rem, 7vw, 9rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #4d7cff;
  line-height: 1;
  display: block;
}
.num-total {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: rgba(226,226,234,0.2);
  padding-bottom: 0.5rem;
}

/* Number transition — slides up */
.num-up-enter-active { transition: all 0.4s cubic-bezier(.25,.46,.45,.94); }
.num-up-leave-active { transition: all 0.25s cubic-bezier(.55,0,1,.45); }
.num-up-enter-from   { opacity: 0; transform: translateY(50px); }
.num-up-leave-to     { opacity: 0; transform: translateY(-35px); }

/* List */
.proj-list {
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(255,255,255,0.06);
}
.proj-list-btn {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: background 0.25s;
}
.proj-list-btn:hover { background: rgba(77,124,255,0.04); }
.proj-list-btn.is-active { background: rgba(77,124,255,0.07); }

/* Animated left bar */
.btn-bar {
  position: absolute;
  left: -1px; top: 0; bottom: 0;
  width: 2px;
  background: #4d7cff;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.35s cubic-bezier(.25,.46,.45,.94);
}
.proj-list-btn.is-active .btn-bar { transform: scaleY(1); }

.btn-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.56rem;
  letter-spacing: 0.12em;
  color: rgba(226,226,234,0.18);
  flex-shrink: 0;
  transition: color 0.25s;
}
.proj-list-btn.is-active .btn-num,
.proj-list-btn:hover    .btn-num { color: #4d7cff; }

.btn-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: rgba(226,226,234,0.32);
  transition: color 0.25s;
  line-height: 1.4;
}
.proj-list-btn.is-active .btn-label,
.proj-list-btn:hover     .btn-label { color: var(--color-heading, #e2e2ea); }

/* Active tags */
.proj-active-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: rgba(77,124,255,0.75);
  border: 1px solid rgba(77,124,255,0.2);
  padding: 0.2rem 0.55rem;
}

/* ══════════════════════════════
   RIGHT — SCROLL
══════════════════════════════ */
.proj-items {
  display: flex;
  flex-direction: column;
  gap: 15vh; /* Aumentar o gap ajuda o Observer a ser mais preciso */
  padding-bottom: 10vh;
}

.proj-item {
  min-height: 70vh; 
}

/* Thumbnail */
.proj-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0c0c10;
}
.proj-thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(55%);
  transition: transform 0.55s ease, filter 0.4s ease;
}
.proj-item:hover .proj-thumb img {
  transform: scale(1.035);
  filter: grayscale(10%);
}

/* Overlay */
.proj-thumb-overlay {
  position: absolute; inset: 0;
  background: rgba(6,6,8,0.76);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity 0.32s ease;
}
.proj-item:hover .proj-thumb-overlay { opacity: 1; }

.proj-cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #4d7cff; color: #fff; border: none;
  padding: 0.75rem 1.6rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.proj-cta:hover { background: #6b92ff; transform: translateY(-2px); }

/* Info */
.proj-info {
  border: 1px solid rgba(255,255,255,0.06);
  border-top: none;
  padding: 1.8rem 2rem;
  display: flex; flex-direction: column; gap: 1rem;
  background: rgba(255,255,255,0.015);
  transition: border-color 0.3s;
}
.proj-item:hover .proj-info { border-color: rgba(77,124,255,0.2); }

.proj-info-row { display: flex; align-items: flex-start; }
.proj-info-top  { justify-content: space-between; gap: 1rem; }

.proj-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.1rem; font-weight: 700;
  letter-spacing: -0.015em; line-height: 1.25;
  color: var(--color-heading, #e2e2ea);
}
.proj-idx {
  font-family: 'DM Mono', monospace;
  font-size: 0.56rem; letter-spacing: 0.1em;
  color: rgba(226,226,234,0.14);
  flex-shrink: 0; padding-top: 4px;
}
.proj-desc {
  font-family: 'DM Mono', monospace;
  font-size: 0.8rem; line-height: 1.82;
  color: rgba(226,226,234,0.4);
}

.proj-info-footer {
  justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.proj-links { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }

.proj-ext-link {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(226,226,234,0.38); text-decoration: none;
  border: 1px solid rgba(255,255,255,0.07);
  padding: 0.28rem 0.6rem;
  transition: color 0.2s, border-color 0.2s;
}
.proj-ext-link:hover { color: #4d7cff; border-color: rgba(77,124,255,0.4); }

.proj-more-btn {
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: transparent; border: none;
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(226,226,234,0.32); cursor: pointer;
  transition: color 0.2s, gap 0.2s; padding: 0;
}
.proj-more-btn:hover { color: #4d7cff; gap: 0.65rem; }

/* ── MOBILE DOTS (hidden on desktop) ── */
.proj-dots { display: none; }

/* ── REVEAL ── */
.proj-animate {
  opacity: 0; transform: translateY(32px);
  transition: opacity 0.8s cubic-bezier(.25,.46,.45,.94),
              transform 0.8s cubic-bezier(.25,.46,.45,.94);
}
.proj-in-view { opacity: 1; transform: translateY(0); }
.proj-item:nth-child(2) { transition-delay: 0.08s; }
.proj-item:nth-child(3) { transition-delay: 0.16s; }

/* ── TRANSITIONS ── */
.fade-blur-enter-active, .fade-blur-leave-active { transition: all 0.35s ease; }
.fade-blur-enter-from,  .fade-blur-leave-to      { opacity: 0; filter: blur(4px); transform: translateY(5px); }

/* ══════════════════════════════
   RESPONSIVE
══════════════════════════════ */
@media screen and (max-width: 1100px) {
  .projects-section { padding: 7rem 3rem; }
  .proj-layout { grid-template-columns: 240px 1fr; gap: 3.5rem; }
}

/* ── TABLET + MOBILE: horizontal scroll ── */
@media screen and (max-width: 860px) {
  .projects-section {
    padding: 5rem 0;       /* zero horizontal — items go edge-to-edge */
    overflow: hidden;
  }

  /* Header keeps padding */
  .proj-header {
    padding: 0 2rem;
    margin-bottom: 3rem;
  }

  /* Stack nav above the strip */
  .proj-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }

  /* ── LEFT: compact horizontal bar ── */
  .proj-nav {
    position: static;
    padding: 0 2rem 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  /* Number shrinks */
  .num-value { font-size: 3.5rem; }
  .proj-big-num { gap: 0.3rem; }

  /* List becomes a horizontal row of short buttons */
  .proj-list {
    flex-direction: row;
    flex-wrap: wrap;
    border-left: none;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }
  .proj-list-btn {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
    padding: 0.6rem 0.85rem;
    flex: 1;
    min-width: 80px;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 0;
  }
  .btn-bar {
    /* Becomes a top line instead of left line */
    top: -1px; left: 0; right: 0; bottom: auto;
    width: auto; height: 2px;
    transform: scaleX(0);
    transform-origin: left;
  }
  .proj-list-btn.is-active .btn-bar { transform: scaleX(1); }
  .btn-label { font-size: 0.62rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 110px; }

  /* Tags stay below the list, full width */
  .proj-active-tags {
    width: 100%;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  /* Show dots */
  .proj-dots {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding-top: 0.25rem;
    width: 100%;
  }
  .proj-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    border: 1px solid rgba(77,124,255,0.35);
    background: transparent;
    cursor: pointer;
    transition: background 0.25s, border-color 0.25s, width 0.3s;
    flex-shrink: 0;
  }
  .proj-dot--active {
    background: #4d7cff;
    border-color: #4d7cff;
    width: 18px;
    border-radius: 3px;
  }

  /* ── RIGHT: HORIZONTAL SCROLL STRIP ── */
  .proj-items {
    display: flex;
    flex-direction: row;          /* cards side by side */
    gap: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;        /* hide scrollbar Firefox */
    /* Reveal animation reset — cards are always visible horizontally */
  }
  .proj-items::-webkit-scrollbar { display: none; }  /* hide scrollbar Chrome */

  .proj-item {
    flex: 0 0 100%;               /* each card = full viewport width */
    width: 100%;
    scroll-snap-align: start;
    /* remove vertical reveal since they're side by side */
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  /* Image taller on mobile */
  .proj-thumb { aspect-ratio: 4 / 3; }

  /* Info inside card gets padding back */
  .proj-info { padding: 1.5rem 2rem; }
  .proj-items { gap: 0; }
}

@media screen and (max-width: 480px) {
  .proj-nav { padding: 0 1rem 1.5rem; gap: 1rem; }
  .proj-info { padding: 1.2rem 1rem; }
  .num-value { font-size: 3rem; }
  .btn-label { max-width: 70px; font-size: 0.58rem; }
}

</style>