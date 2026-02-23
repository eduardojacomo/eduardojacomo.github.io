<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useLanguage } from '@/stores/languageStore';

const uselanguage = useLanguage();
const { currentLocaleKey } = storeToRefs(uselanguage);
const { t, locale } = useI18n();

const skills = ref([
  { icon: 'devicon-html5-plain',              label: 'HTML',       group: 'Front-End'  },
  { icon: 'devicon-css3-plain',               label: 'CSS',        group: 'Front-End'  },
  { icon: 'devicon-javascript-plain',         label: 'JavaScript', group: 'Front-End'  },
  { icon: 'devicon-vuejs-plain',              label: 'Vue',        group: 'Framework'  },
  { icon: 'devicon-bootstrap-plain',          label: 'Bootstrap',  group: 'Framework'  },
  { icon: 'devicon-bulma-plain',              label: 'Bulma',      group: 'Framework'  },
  { icon: 'devicon-dotnetcore-plain',         label: '.NET',       group: 'Back-End'   },
  { icon: 'devicon-python-plain',             label: 'Python',     group: 'Back-End'   },
  { icon: 'devicon-nextjs-original-wordmark', label: 'Next.js',    group: 'Back-End'   },
  { icon: 'devicon-microsoftsqlserver-plain', label: 'SQL Server', group: 'Database'   },
  { icon: 'devicon-postgresql-plain',         label: 'PostgreSQL', group: 'Database'   },
  { icon: 'devicon-mongodb-plain',            label: 'MongoDB',    group: 'Database'   },
]);

const groupedSkills = computed(() => {
  const groups = {};
  skills.value.forEach(skill => {
    if (!groups[skill.group]) groups[skill.group] = [];
    groups[skill.group].push(skill);
  });
  return groups;
});

const groupIcons = {
  'Front-End': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'Framework': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  'Back-End':  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  'Database':  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
};

watch(locale, () => {});

onMounted(() => {
  const els = document.querySelectorAll('.abt-animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('abt-in-view');
      else entry.target.classList.remove('abt-in-view');
    });
  }, { threshold: 0.08 });
  els.forEach(el => observer.observe(el));
});
</script>

<template>
  <section id="about" class="about-section">

    <!-- Header -->
    <div class="about-header abt-animate">
      <p class="s-label">// 01 — Sobre</p>
      <Transition name="fade-blur" mode="out-in">
        <h2 class="s-title" :key="currentLocaleKey">{{ t('_aboutTitle') }}</h2>
      </Transition>
    </div>

    <!-- ── 3-COLUMN GRID ── -->
    <div class="about-grid">

      <!-- ── COL 1: foto + bio ── -->
      <div class="col-identity">

        <div class="photo-wrap abt-animate">
          <img src="../../assets/about.webp" alt="Eduardo Jácomo" />
          <!-- badge sobreposto na foto -->
          <div class="photo-badge">
            <span class="badge-dot"></span>
            <span class="badge-text">Disponível</span>
          </div>
        </div>

        
      </div>
      
      <div class="about-bio abt-animate">
        <Transition name="fade-blur" mode="out-in">
          <p :key="currentLocaleKey">{{ t('_aboutDescription') }}</p>
        </Transition>
      </div>
      <!-- ── COL 2: serviços ── -->
      <!-- <div class="col-services">
        <p class="s-label abt-animate">O que eu ofereço</p>

        <div class="svc-list">
          <div class="svc-card abt-animate">
            <div class="svc-card-header">
              <svg class="svc-icon" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              <span class="svc-name">APP</span>
              <span class="svc-num">01</span>
            </div>
            <p class="svc-desc">Criação de aplicativos móveis (iOS, Android) e web, desde o design até a publicação.</p>
          </div>

          <div class="svc-card abt-animate">
            <div class="svc-card-header">
              <svg class="svc-icon" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span class="svc-name">Developer</span>
              <span class="svc-num">02</span>
            </div>
            <p class="svc-desc">Desenvolvimento personalizado: soluções sob medida para cada cliente.</p>
          </div>

          <div class="svc-card abt-animate">
            <div class="svc-card-header">
              <svg class="svc-icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/></svg>
              <span class="svc-name">BOT</span>
              <span class="svc-num">03</span>
            </div>
            <p class="svc-desc">Chatbots e assistentes virtuais para WhatsApp, Messenger e outras plataformas.</p>
          </div>

          <div class="svc-card abt-animate">
            <div class="svc-card-header">
              <svg class="svc-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span class="svc-name">Web Solutions</span>
              <span class="svc-num">04</span>
            </div>
            <p class="svc-desc">Sites, plataformas, e-commerce, CMS responsivos e otimizados para SEO.</p>
          </div>
        </div>
      </div> -->



    </div>
          <!-- ── COL 3: skills ── -->
      <div class="col-skills">
        <p class="s-label abt-animate">Skills</p>

        <div class="skill-groups">
          <div
            v-for="(groupSkills, groupName) in groupedSkills"
            :key="groupName"
            class="skill-group abt-animate"
          >
            <div class="group-header">
              <span class="group-icon" v-html="groupIcons[groupName]"></span>
              <span class="group-name">{{ groupName }}</span>
            </div>
            <div class="group-skills">
              <div
                v-for="skill in groupSkills"
                :key="skill.label"
                class="skill-item"
              >
                <i :class="[skill.icon, 'skill-devicon']"></i>
                <span class="skill-label">{{ skill.label }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
  </section>
</template>

<style scoped>
/* ── SECTION ── */
.about-section {
  padding: 5rem 4rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  width: 100%;
}

/* ── HEADER ── */
.about-header { margin-bottom: 3rem; }

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

/* ── 3-COLUMN GRID ── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4.5rem;
  align-items: start;
}

/* ═══════════════════════════
   COL 1 — IDENTIDADE
═══════════════════════════ */
.col-identity {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

/* Foto */
.photo-wrap {
  position: relative;
  width: 100%;
}
.photo-wrap img {
  width: 100%;
  display: block;
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}
.photo-wrap:hover img { filter: grayscale(40%); }

/* Borda decorativa offset */
.photo-wrap::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(77,124,255,0.2);
  pointer-events: none;
  transition: border-color 0.3s;
}
.photo-wrap:hover::after { border-color: rgba(77,124,255,0.45); }

/* Badge "Disponível" sobre a foto */
.photo-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(6, 6, 8, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(77,124,255,0.25);
  padding: 0.3rem 0.7rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(226,226,234,0.6);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #4d7cff;
  animation: blink 2s ease-in-out infinite;
  flex-shrink: 0;
}
.badge-text { line-height: 1; }
@keyframes blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(77,124,255,0.7); }
  50%       { opacity: 0.4; box-shadow: none; }
}

/* Bio */
.about-bio p {
  font-family: 'DM Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.9;
  color: rgba(226, 226, 234, 0.5);
  text-align: justify;
}

/* ═══════════════════════════
   COL 2 — SERVIÇOS
═══════════════════════════ */
.col-services {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.svc-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.svc-card {
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  padding: 1.1rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s;
  cursor: default;
}
/* Linha lateral azul no hover */
.svc-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 1px;
  background: #4d7cff;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.35s cubic-bezier(.25,.46,.45,.94);
}
.svc-card:hover::before { transform: scaleY(1); }
.svc-card:hover {
  border-color: rgba(77,124,255,0.18);
  background: rgba(77,124,255,0.03);
}

.svc-card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.svc-icon {
  width: 14px; height: 14px;
  stroke: #4d7cff; fill: none;
  stroke-width: 1.7;
  stroke-linecap: round; stroke-linejoin: round;
  flex-shrink: 0;
  transition: transform 0.3s;
}
.svc-card:hover .svc-icon { transform: scale(1.15); }
.svc-name {
  font-family: 'Syne', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-heading, #e2e2ea);
  flex: 1;
  letter-spacing: -0.01em;
}
.svc-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.56rem;
  letter-spacing: 0.12em;
  color: rgba(226,226,234,0.18);
}
.svc-desc {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  line-height: 1.7;
  color: rgba(226,226,234,0.38);
  padding-left: 1.5rem;
}

/* ═══════════════════════════
   COL 3 — SKILLS
═══════════════════════════ */
.col-skills {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 3rem;
}

.skill-groups {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.skill-group {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s;
}
.skill-group::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: #4d7cff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(.25,.46,.45,.94);
}
.skill-group:hover::before { transform: scaleX(1); }
.skill-group:hover {
  border-color: rgba(77,124,255,0.15);
  background: rgba(77,124,255,0.03);
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.group-icon {
  width: 13px; height: 13px;
  color: #4d7cff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.group-icon :deep(svg) { width: 13px; height: 13px; }
.group-name {
  font-family: 'DM Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #4d7cff;
}

.group-skills {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.skill-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.28rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: padding-left 0.2s;
}
.skill-item:last-child { border-bottom: none; }
.skill-item:hover { padding-left: 4px; }
.skill-devicon {
  font-size: 1rem;
  color: rgba(226, 226, 234, 0.35);
  width: 18px; text-align: center;
  transition: color 0.2s;
}
.skill-item:hover .skill-devicon { color: rgba(226,226,234,0.7); }
.skill-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: rgba(226,226,234,0.4);
  transition: color 0.2s;
}
.skill-item:hover .skill-label { color: rgba(226,226,234,0.7); }

/* Stagger delay por grupo */
.skill-group:nth-child(1) { transition-delay: 0.04s; }
.skill-group:nth-child(2) { transition-delay: 0.10s; }
.skill-group:nth-child(3) { transition-delay: 0.16s; }
.skill-group:nth-child(4) { transition-delay: 0.22s; }

/* ── REVEAL ── */
.abt-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(.25,.46,.45,.94),
              transform 0.8s cubic-bezier(.25,.46,.45,.94);
}
.abt-in-view { opacity: 1; transform: translateY(0); }

/* ── FADE-BLUR TRANSITION ── */
.fade-blur-enter-active,
.fade-blur-leave-active { transition: all 0.4s ease; }
.fade-blur-enter-from,
.fade-blur-leave-to { opacity: 0; filter: blur(4px); transform: translateY(6px); }

/* ── RESPONSIVE ── */
@media screen and (max-width: 1200px) {
  .about-grid {
    grid-template-columns: 240px 1fr 1fr;
    gap: 2.5rem;
  }
}

@media screen and (max-width: 1024px) {
  .about-section { padding: 6rem 2.5rem; }
  /* foto + bio em cima, serviços e skills lado a lado em baixo */
  .about-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 2.5rem;
  }
  .col-identity {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2rem;
    align-items: start;
  }
  .photo-wrap { width: 220px; }
}

@media screen and (max-width: 768px) {
  .about-section { padding: 5rem 1.5rem; }
  .about-grid { grid-template-columns: 1fr; }
  .col-identity {
    grid-template-columns: 160px 1fr;
    gap: 1.5rem;
  }
  .photo-wrap { width: 160px; }
  .skill-groups { grid-template-columns: 1fr 1fr; }
}

@media screen and (max-width: 480px) {
  .about-section { padding: 4rem 1rem; }
  .about-header { margin-bottom: 3rem; }
  .col-identity { grid-template-columns: 1fr; }
  .photo-wrap { width: 100%; max-width: 280px; }
  .skill-groups { grid-template-columns: 1fr; }
}
</style>