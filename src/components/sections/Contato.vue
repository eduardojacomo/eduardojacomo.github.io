<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguage } from '@/stores/languageStore';
import { storeToRefs } from 'pinia';

const uselanguage = useLanguage();
const { currentLocaleKey } = storeToRefs(uselanguage);
const { t } = useI18n();

onMounted(() => {
  const els = document.querySelectorAll('.ct-animate');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('ct-in-view');
      else e.target.classList.remove('ct-in-view');
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
});
</script>

<template>
  <section id="contact" class="contact-section">

    <!-- Header -->
    <div class="ct-header ct-animate">
      <p class="s-label">// 05 — Contato</p>
      <Transition name="fade-blur" mode="out-in">
        <h2 class="s-title" :key="currentLocaleKey">{{ t('_contactTitle') }}</h2>
      </Transition>
    </div>

    <!-- Two-column layout -->
    <div class="ct-grid">

      <!-- ── LEFT: CTA block ── -->
      <div class="ct-left">

        <Transition name="fade-blur" mode="out-in">
          <p class="ct-desc" :key="currentLocaleKey">{{ t('_contactDescription') }}</p>
        </Transition>

        <!-- WhatsApp CTA -->
        <a
          href="https://api.whatsapp.com/send/?phone=5524992397625&text&type=phone_number&app_absent=0"
          target="_blank"
          class="ct-cta ct-animate"
        >
          <svg class="ct-cta-icon" viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          <Transition name="fade-blur" mode="out-in">
            <span :key="currentLocaleKey">{{ t('_contactButton') }}</span>
          </Transition>
          <svg class="ct-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>

        <!-- Email direct link -->
        <a href="mailto:eduardo.jacomo@gmail.com" class="ct-email ct-animate">
          eduardo.jacomo@gmail.com
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>

      </div>

      <!-- ── RIGHT: info blocks ── -->
      <div class="ct-right">

        <!-- Social -->
        <div class="ct-block ct-animate">
          <Transition name="fade-blur" mode="out-in">
            <p class="ct-block-label" :key="currentLocaleKey">{{ t('_contactSubTitle1') }}</p>
          </Transition>
          <div class="ct-socials">
            <a href="https://www.linkedin.com/in/eduardojacomo/" target="_blank" class="ct-social-link">
              <i class="devicon-linkedin-plain"></i>
              <span>LinkedIn</span>
              <svg class="ct-social-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="https://github.com/eduardojacomo/" target="_blank" class="ct-social-link">
              <i class="devicon-github-original"></i>
              <span>GitHub</span>
              <svg class="ct-social-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="10" height="10">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Phone / Email -->
        <div class="ct-block ct-animate">
          <Transition name="fade-blur" mode="out-in">
            <p class="ct-block-label" :key="currentLocaleKey">{{ t('_contactSubTitle2') }}</p>
          </Transition>
          <div class="ct-info-list">
            <span class="ct-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
              </svg>
              +55 24 99239-7625
            </span>
            <span class="ct-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              eduardo.jacomo@gmail.com
            </span>
          </div>
        </div>

        <!-- Location -->
        <div class="ct-block ct-animate">
          <Transition name="fade-blur" mode="out-in">
            <p class="ct-block-label" :key="currentLocaleKey">{{ t('_contactSubTitle3') }}</p>
          </Transition>
          <div class="ct-info-list">
            <span class="ct-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Rio de Janeiro, RJ
            </span>
            <span class="ct-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Brasil
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer strip -->
    <div class="ct-footer ct-animate">
      <span class="ct-footer-copy">© {{ new Date().getFullYear() }} Eduardo Jácomo</span>
      <span class="ct-footer-sep">—</span>
      <span class="ct-footer-note">Feito com Vue.js</span>
    </div>

  </section>
</template>

<style scoped>
/* ── SECTION ── */
.contact-section {
  padding: 8rem 4rem 4rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  width: 100%;
}

/* ── HEADER ── */
.ct-header { margin-bottom: 2rem; }
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

/* ── TWO-COLUMN GRID ── */
.ct-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
  margin-bottom: 6rem;
}

.ct-left {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.ct-desc {
  font-family: 'DM Mono', monospace;
  font-size: 0.88rem;
  line-height: 1.95;
  color: rgba(226,226,234,0.5);
}


.ct-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 1.1rem 1.8rem;
  background: rgba(255,255,255,0.02);
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-heading, #e2e2ea);
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s;
  align-self: flex-start;
}
.ct-cta::before {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 2px;
  background: #4d7cff;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.35s cubic-bezier(.25,.46,.45,.94);
}
.ct-cta:hover::before { transform: scaleY(1); }
.ct-cta:hover {
  border-color: rgba(77,124,255,0.3);
  background: rgba(77,124,255,0.05);
}

.ct-cta-icon {
  width: 18px; height: 18px;
  fill: rgba(226,226,234,0.5);
  flex-shrink: 0;
  transition: fill 0.25s;
}
.ct-cta:hover .ct-cta-icon { fill: #4d7cff; }

.ct-cta-arrow {
  width: 14px; height: 14px;
  margin-left: auto;
  transition: transform 0.3s cubic-bezier(.25,.46,.45,.94);
  flex-shrink: 0;
}
.ct-cta:hover .ct-cta-arrow { transform: translateX(4px); }

/* Email link */
.ct-email {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: rgba(226,226,234,0.35);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding-bottom: 0.3rem;
  align-self: flex-start;
  transition: color 0.2s, border-color 0.2s;
}
.ct-email:hover { color: #4d7cff; border-color: rgba(77,124,255,0.4); }

.ct-right {
  display: flex;
  flex-direction: column;
  gap: 2px; /* flush blocks separated only by border */
}

.ct-block {
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  padding: 1.5rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s;
}
.ct-block::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: #4d7cff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(.25,.46,.45,.94);
}
.ct-block:hover::before { transform: scaleX(1); }
.ct-block:hover {
  border-color: rgba(77,124,255,0.15);
  background: rgba(77,124,255,0.03);
}

.ct-block-label {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4d7cff;
}

/* Social links */
.ct-socials {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ct-social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: rgba(226,226,234,0.45);
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: color 0.2s, padding-left 0.2s;
}
.ct-social-link:last-child { border-bottom: none; }
.ct-social-link:hover { color: var(--color-heading, #e2e2ea); padding-left: 6px; }
.ct-social-link i { font-size: 1rem; color: inherit; }
.ct-social-link span { flex: 1; }
.ct-social-arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.2s;
}
.ct-social-link:hover .ct-social-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Info list (phone, email, location) */
.ct-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.ct-info-item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: rgba(226,226,234,0.45);
}
.ct-info-item svg { color: #4d7cff; flex-shrink: 0; }

/* Stagger */
.ct-block:nth-child(1) { transition-delay: 0.05s; }
.ct-block:nth-child(2) { transition-delay: 0.12s; }
.ct-block:nth-child(3) { transition-delay: 0.19s; }

/* ── FOOTER STRIP ── */
.ct-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.ct-footer-copy,
.ct-footer-note {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: rgba(226,226,234,0.2);
}
.ct-footer-sep {
  color: rgba(226,226,234,0.1);
  font-size: 0.6rem;
}

/* ── REVEAL ── */
.ct-animate {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(.25,.46,.45,.94),
              transform 0.8s cubic-bezier(.25,.46,.45,.94);
}
.ct-in-view { opacity: 1; transform: translateY(0); }

/* ── FADE-BLUR ── */
.fade-blur-enter-active, .fade-blur-leave-active { transition: all 0.35s ease; }
.fade-blur-enter-from,  .fade-blur-leave-to { opacity: 0; filter: blur(4px); transform: translateY(5px); }

/* ── RESPONSIVE ── */
@media screen and (max-width: 1100px) {
  .contact-section { padding: 7rem 3rem 3rem; }
  .ct-grid { gap: 3.5rem; }
}

@media screen and (max-width: 860px) {
  .contact-section { padding: 5rem 2rem 3rem; }
  .ct-grid { grid-template-columns: 1fr; gap: 3rem; }
}

@media screen and (max-width: 480px) {
  .contact-section { padding: 4rem 1rem 2rem; }
  .ct-header { margin-bottom: 3rem; }
  .ct-cta { padding: 0.9rem 1.2rem; font-size: 0.7rem; }
  .ct-block { padding: 1.2rem; }
  .ct-footer { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
}
</style>