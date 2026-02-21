<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import TextEffect from '@/components/Tools/TextEffect.vue';
import { useI18n } from 'vue-i18n';
import { useLanguage } from '@/stores/languageStore';
import { storeToRefs } from 'pinia';

import { useCursor } from '@/composables/useCursor';
import { useHeroAnimation } from '@/composables/useHeroAnimation';
const uselanguage = useLanguage();
const { currentLocaleKey } = storeToRefs(uselanguage);
const { t } = useI18n();

useCursor();
useHeroAnimation();

</script>

<template>
  <!-- Custom cursor (inject once at app level if preferred) -->
  <div id="ej-cur" class="ej-cursor"></div>
  <div id="ej-ring" class="ej-cursor-ring"></div>

  <main>
    <section class="banner">

      <!-- Background grid -->
      <div class="hero-grid" aria-hidden="true"></div>
      <!-- Glow blobs -->
      <div class="hero-blob" aria-hidden="true"></div>
      <div class="hero-blob hero-blob--sm" aria-hidden="true"></div>

      <!-- Left social strip -->
      <div class="socials">
        <div class="linha-vertical"></div>
        <a href="https://www.linkedin.com/in/eduardojacomo/" target="_blank" aria-label="LinkedIn">
          <i class="devicon-linkedin-plain"></i>
        </a>
        <a href="https://github.com/eduardojacomo/" target="_blank" aria-label="GitHub">
          <i class="devicon-github-original"></i>
        </a>
      </div>

      <!-- Main content: two-column grid -->
      <div class="hero-content">

        <!-- ── COL LEFT: nome + lead + botões ── -->
        <div class="hero-col-left">

          <p class="hero-eyebrow">
            <span class="hero-eyebrow-inner" data-text="// Full Stack Developer"></span>
          </p>

          <h1 class="hero-name">
            <span class="hero-line-wrap"><span class="hero-line-inner">Eduardo</span></span>
            <span class="hero-line-wrap"><span class="hero-line-inner hero-line-dim">Jácomo</span></span>
          </h1>

          <div class="hero-text-effect">
            <TextEffect :words="['Developer', 'FullStack', 'Freelancer']" />
          </div>

          <p class="hero-lead">
            Transformando dados complexos em experiências digitais robustas.
            Do planejamento ao deploy — soluções que escalam.
          </p>

          <div class="hero-actions">
            <a href="#projects" class="btn btn--primary">Ver Projetos ↓</a>
            <a href="#contact" class="btn btn--ghost">Fale Comigo</a>
          </div>

        </div>

        <!-- ── COL RIGHT: stats + stack + meta ── -->
        <div class="hero-col-right">

          <!-- Status badge -->
          <div class="hero-status">
            <span class="status-dot"></span>
            <span class="status-text">Disponível para projetos</span>
          </div>

          <!-- Stats -->
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="stat-num">2+</span>
              <span class="stat-label">Anos de experiência</span>
            </div>
            <div class="hero-stat">
              <span class="stat-num">20+</span>
              <span class="stat-label">Projetos entregues</span>
            </div>
            <div class="hero-stat">
              <span class="stat-num">∞</span>
              <span class="stat-label">Bugs resolvidos</span>
            </div>
          </div>

          <!-- Stack highlight -->
          <div class="hero-stack">
            <p class="stack-label">Stack principal</p>
            <div class="stack-pills">
              <span class="stack-pill">Vue.js</span>
              <span class="stack-pill">Next.js</span>
              <span class="stack-pill">Python</span>
              <span class="stack-pill">.NET</span>
              <span class="stack-pill">PostgreSQL</span>
              <span class="stack-pill">Node.js</span>
            </div>
          </div>

          <!-- Location -->
          <div class="hero-location">
            <svg class="meta-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>RJ, Brasil</span>
          </div>

        </div>

      </div>

      <!-- Scroll indicator -->
      <div class="vertical">
        <Transition name="fade-blur" mode="out-in">
          <a href="#about" class="botao-scroll hero-scroll-indicator" :key="currentLocaleKey">
            <span>{{ t('_homeMore') }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </Transition>
      </div>

    </section>
  </main>
</template>

<style scoped>

/* ── BANNER / SECTION ── */
.banner {
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 0 2rem 2rem 0;
  position: relative;
  overflow: hidden;
  align-items: flex-end;
}

.hero-line-inner {
  display: block;
  transform: translateY(105%); /* O GSAP vai levar para 0% */
}

.hero-lead, 
.hero-actions, 
.hero-col-right {
  opacity: 0;
  transform: translateY(24px); /* O GSAP vai levar para y: 0 e opacity: 1 */
}

.hero-scroll-indicator {
  opacity: 0; /* O GSAP vai levar para 1 */
}

/* ── GRID BACKGROUND ── */
.hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 70px 70px;
  mask-image: radial-gradient(ellipse 90% 70% at 50% 100%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 100%, black 10%, transparent 100%);
}

/* ── GLOW BLOBS ── */
.hero-blob {
  position: absolute;
  width: 520px; height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(77,124,255,0.09) 0%, transparent 68%);
  top: -12%; right: 0%;
  pointer-events: none;
  animation: blob 8s ease-in-out infinite;
}
.hero-blob--sm {
  width: 280px; height: 280px;
  top: auto; bottom: 5%; right: auto; left: 10%;
  background: radial-gradient(circle, rgba(77,124,255,0.06) 0%, transparent 68%);
  animation-duration: 11s;
  animation-direction: reverse;
}
@keyframes blob {
  0%, 100% { transform: scale(1) translate(0, 0); }
  50%       { transform: scale(1.12) translate(10px, -15px); }
}

/* ── SOCIALS STRIP ── */
.socials {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.65rem;
  padding: 0 0.5rem 2rem 1rem;
  font-size: 1.2rem;
  flex-shrink: 0;
  position: relative; z-index: 1;
}
.socials a {
  text-decoration: none;
  color: var(--color-text, #7a7a96);
  transition: color 0.2s;
}
.socials a:hover { color: #4d7cff; }
.linha-vertical {
  border-left: 1px solid rgba(255,255,255,0.12);
  height: 180px;
  margin: 0 0 0 8px;
}

/* ── HERO CONTENT: two-column grid ── */
.hero-content {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 4rem;
  flex: 1;
  padding: 9rem 4rem 4rem 2rem;
}

/* ── COL LEFT ── */
.hero-col-left {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* ── COL RIGHT ── */
.hero-col-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2.5rem;
  padding-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(28px);
}

/* ── EYEBROW ── */
.hero-eyebrow {
  font-family: 'DM Mono', 'Courier New', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #4d7cff;
  margin-bottom: 1.6rem;
  overflow: hidden;
}
.hero-eyebrow-inner { display: block; }

/* ── NAME — line reveal ── */
.hero-name {
  font-family: 'Syne', 'Poppins', sans-serif;
  font-size: clamp(3.5rem, 6vw, 7.5rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin-bottom: 1.6rem;
  color: var(--color-heading, #e2e2ea);
}
.hero-line-wrap {
  display: block;
  overflow: hidden;
}
.hero-line-inner {
  display: block;
  transform: translateY(105%);
}
.hero-line-dim { color: rgba(226, 226, 234, 0.32); }

/* ── TEXT EFFECT ── */
.hero-text-effect {
  font-family: 'DM Mono', monospace;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #4d7cff;
  margin-bottom: 1.8rem;
  letter-spacing: 0.08em;
}

/* ── LEAD ── */
.hero-lead {
  font-family: 'DM Mono', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.85;
  color: rgba(226, 226, 234, 0.5);
  max-width: 440px;
  margin-bottom: 2.2rem;
  opacity: 0;
  transform: translateY(24px);
}

/* ── STATUS BADGE ── */
.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(226,226,234,0.5);
  border: 1px solid rgba(255,255,255,0.07);
  padding: 0.45rem 0.9rem;
  align-self: flex-start;
}
.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #4d7cff;
  animation: blink 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px #4d7cff; }
  50%       { opacity: 0.4; box-shadow: none; }
}

/* ── STATS ── */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}
.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.2rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  transition: border-color 0.3s;
}
.hero-stat:hover { border-color: rgba(77,124,255,0.25); }
.stat-num {
  font-family: 'Syne', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #4d7cff;
  line-height: 1;
}
.stat-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(226,226,234,0.35);
}

/* ── STACK ── */
.hero-stack {}
.stack-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(226,226,234,0.3);
  margin-bottom: 0.75rem;
}
.stack-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.stack-pill {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(77,124,255,0.2);
  color: rgba(226,226,234,0.5);
  transition: border-color 0.2s, color 0.2s;
}
.stack-pill:hover { border-color: rgba(77,124,255,0.5); color: #7a9fff; }

/* ── LOCATION ── */
.hero-location {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(226,226,234,0.3);
}
.meta-icon {
  width: 13px; height: 13px;
  stroke: #4d7cff; fill: none;
  stroke-width: 1.8;
  stroke-linecap: round; stroke-linejoin: round;
  flex-shrink: 0;
}

/* ── BUTTONS ── */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(18px);
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.8rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform 0.22s, background 0.22s, border-color 0.22s, color 0.22s;
  cursor: pointer;
  border: none;
}
.btn--primary { background: #4d7cff; color: #fff; }
.btn--primary:hover { background: #6b92ff; transform: translateY(-2px); }
.btn--ghost  { background: transparent; border: 1px solid rgba(255,255,255,0.08); color: rgba(226,226,234,0.6); }
.btn--ghost:hover { border-color: rgba(77,124,255,0.5); color: #4d7cff; transform: translateY(-2px); }

/* ── SCROLL INDICATOR ── */
.vertical {
  position: absolute;
  bottom: 50px;
  right: 5px;
  display: flex;
  transform: rotate(90deg);
  padding: 0 0 5rem 10px;
}
.hero-scroll-indicator {
  opacity: 0;
}
.botao-scroll {
  padding: 10px 20px;
  text-decoration: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--color-text, #7a7a96);
  border: none;
  cursor: pointer;
  animation: moverVertical 2s infinite alternate;
  align-items: center;
}
@keyframes moverVertical {
  0%   { transform: translateX(0); }
  100% { transform: translateX(20px); }
}

/* ── TRANSITIONS ── */
.fade-blur-enter-active,
.fade-blur-leave-active { transition: all 0.4s ease; }
.fade-blur-enter-from,
.fade-blur-leave-to   { opacity: 0; filter: blur(4px); transform: translateY(6px); }

/* ── RESPONSIVE ── */
@media screen and (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    padding: 9rem 2rem 4rem 2rem;
    gap: 3rem;
  }
  .hero-col-right {
    gap: 2rem;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .hero-stats { grid-template-columns: repeat(3, auto); width: 100%; }
  .hero-stack, .hero-status, .hero-location { flex: 1 1 200px; }
  .hero-name { font-size: clamp(3rem, 9vw, 6rem); }
}

@media screen and (max-width: 780px) {
  .banner { padding: 0 1rem 2rem 0; }
  .hero-content { padding: 8rem 1.5rem 3.5rem 1.5rem; gap: 2.5rem; }
  .hero-col-right { flex-direction: column; }
  .hero-name { font-size: clamp(2.8rem, 12vw, 5rem); }
  .hero-lead { font-size: 0.82rem; }
  .hero-stats { grid-template-columns: repeat(3, 1fr); }
}

@media screen and (max-width: 480px) {
  .hero-name { font-size: clamp(2.4rem, 13vw, 4rem); }
  .socials { padding: 0 0.5rem 1.5rem 0.5rem; }
  .hero-actions { flex-direction: column; }
  .btn { justify-content: center; }
  .hero-stats { grid-template-columns: 1fr 1fr; }
  .hero-stat:last-child { grid-column: 1 / -1; }
}
</style>