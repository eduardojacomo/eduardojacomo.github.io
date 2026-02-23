<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguage } from '@/stores/languageStore';
import { storeToRefs } from 'pinia';

const uselanguage = useLanguage();
const { currentLocaleKey } = storeToRefs(uselanguage);
const { t } = useI18n();

const services = [
  {
    num: '01',
    key: 'APP',
    route: '/mobile',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>`,
  },
  {
    num: '02',
    key: 'Developer',
    route: '/developer',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  {
    num: '03',
    key: 'BOT',
    route: '/bots',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/></svg>`,
  },
  {
    num: '04',
    key: 'WebSolutions',
    route: '/websolutions',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
];

onMounted(() => {
  const els = document.querySelectorAll('.svc-animate');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('svc-in-view');
      else e.target.classList.remove('svc-in-view');
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
});
</script>

<template>
  <section id="services" class="services-section">

    <!-- Header -->
    <div class="svc-header svc-animate">
      <p class="s-label">// 02 — Serviços</p>
      <Transition name="fade-blur" mode="out-in">
        <h2 class="s-title" :key="currentLocaleKey">{{ t('_servicesTitle') }}</h2>
      </Transition>
    </div>

    <!-- Vertical list -->
    <div class="svc-list">
      <router-link
        v-for="svc in services"
        :key="svc.num"
        :to="svc.route"
        class="svc-row svc-animate"
      >
        <!-- LEFT: number + name -->
        <div class="svc-row-left">
          <span class="svc-num">{{ svc.num }}</span>
          <Transition name="fade-blur" mode="out-in">
            <h3 class="svc-name" :key="currentLocaleKey">
              {{ t(`_service${svc.key}Title`) }}
            </h3>
          </Transition>
        </div>

        <!-- CENTER: description -->
        <div class="svc-row-center">
          <Transition name="fade-blur" mode="out-in">
            <p class="svc-desc" :key="currentLocaleKey">
              {{ t(`_service${svc.key}`) }}
            </p>
          </Transition>
        </div>

        <!-- RIGHT: icon + arrow -->
        <div class="svc-row-right">
          <span class="svc-icon" v-html="svc.icon"></span>
          <span class="svc-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>

        <!-- Hover fill line -->
        <span class="svc-row-line" aria-hidden="true"></span>
      </router-link>
    </div>

  </section>
</template>

<style scoped>

main {
  background-color: #0a0a0a; /* Mesma cor das seções para não ver o Hero no fundo */
  position: relative;
  z-index: 0;
}
/* ── SECTION ── */
.services-section {
  padding: 8rem 4rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  width: 100%;
}

/* ── HEADER ── */
.svc-header { margin-bottom: 5rem; }
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

/* ── LIST ── */
.svc-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* ── ROW ── */
.svc-row {
  display: grid;
  grid-template-columns: 280px 1fr 120px;
  align-items: center;
  gap: 3rem;
  padding: 2.2rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: padding-left 0.35s cubic-bezier(.25,.46,.45,.94);
}

/* Bottom fill line that slides in from left on hover */
.svc-row-line {
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 1px;
  background: #4d7cff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(.25,.46,.45,.94);
}
.svc-row:hover .svc-row-line { transform: scaleX(1); }
.svc-row:hover { padding-left: 1rem; }

/* LEFT */
.svc-row-left {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  flex-shrink: 0;
}
.svc-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  color: rgba(226,226,234,0.2);
  flex-shrink: 0;
  transition: color 0.25s;
}
.svc-row:hover .svc-num { color: #4d7cff; }

.svc-name {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.3rem, 2vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-heading, #e2e2ea);
  line-height: 1.1;
  transition: color 0.25s;
  white-space: nowrap;
}
.svc-row:hover .svc-name { color: #fff; }

/* CENTER */
.svc-row-center { min-width: 0; }
.svc-desc {
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.8;
  color: rgba(226,226,234,0.38);
  transition: color 0.25s;
}
.svc-row:hover .svc-desc { color: rgba(226,226,234,0.6); }

/* RIGHT */
.svc-row-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  flex-shrink: 0;
}
.svc-icon {
  display: flex;
  align-items: center;
  color: rgba(226,226,234,0.2);
  transition: color 0.25s, transform 0.35s;
}
.svc-icon :deep(svg) {
  width: 22px; height: 22px;
}
.svc-row:hover .svc-icon {
  color: #4d7cff;
  transform: scale(1.15);
}

.svc-arrow {
  display: flex;
  align-items: center;
  color: rgba(226,226,234,0.2);
  transition: color 0.25s, transform 0.35s cubic-bezier(.25,.46,.45,.94);
}
.svc-row:hover .svc-arrow {
  color: #4d7cff;
  transform: translateX(6px);
}

/* Stagger */
.svc-row:nth-child(1) { transition-delay: 0.04s; }
.svc-row:nth-child(2) { transition-delay: 0.10s; }
.svc-row:nth-child(3) { transition-delay: 0.16s; }
.svc-row:nth-child(4) { transition-delay: 0.22s; }

/* ── REVEAL ── */
.svc-animate {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(.25,.46,.45,.94),
              transform 0.8s cubic-bezier(.25,.46,.45,.94);
}
.svc-in-view { opacity: 1; transform: translateY(0); }

/* ── FADE-BLUR ── */
.fade-blur-enter-active, .fade-blur-leave-active { transition: all 0.35s ease; }
.fade-blur-enter-from,  .fade-blur-leave-to { opacity: 0; filter: blur(4px); transform: translateY(5px); }

/* ── RESPONSIVE ── */
@media screen and (max-width: 1100px) {
  .services-section { padding: 7rem 3rem; }
  .svc-row { grid-template-columns: 220px 1fr 80px; gap: 2rem; }
}

@media screen and (max-width: 860px) {
  .services-section { padding: 6rem 2rem; }
  /* Hide description, keep name + right */
  .svc-row {
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
    padding: 1.8rem 0;
  }
  .svc-row-center { display: none; }
  .svc-row-right { gap: 0.6rem; }
  .svc-name { font-size: 1.2rem; white-space: normal; }
}

@media screen and (max-width: 540px) {
  .services-section { padding: 4rem 1rem; }
  .svc-header { margin-bottom: 3rem; }
  .svc-row { padding: 1.5rem 0; gap: 1rem; }
  .svc-name { font-size: 1.05rem; }
  .svc-icon { display: none; }
}
</style>