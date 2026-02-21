<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLanguage } from '../stores/languageStore';
import { storeToRefs } from 'pinia';

const uselanguage = useLanguage();
const { locale, currentLocaleKey } = storeToRefs(uselanguage);

function setLanguage() {
  uselanguage.setLanguage();
}

const { t, locale: i18nLocale } = useI18n();

const isOpen = ref(false);
const navbarRef = ref(null);
const scrolled = ref(false);
const route = useRoute();
const isHomePage = computed(() => route.path === '/' || route.path === '/home');

const scrollTo = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    isOpen.value = false;
  }
};

const toggleMenu = () => { isOpen.value = !isOpen.value; };
const closeMenu = () => { isOpen.value = false; };

const handleClickOutside = (event) => {
  if (navbarRef.value && !navbarRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 60;
};

watch(locale, (newLocale) => {
  i18nLocale.value = newLocale;
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="navbar" :class="{ scrolled }" ref="navbarRef">

    <!-- Logo -->
    <a href="#" class="nav-logo">EJ<span>.</span></a>

    <!-- Desktop links -->
    <ul class="nav-links-desktop">
      <template v-if="isHomePage">
        <li><a @click.prevent="scrollTo('home')">{{ t('_nav._home') }}</a></li>
        <li><a @click.prevent="scrollTo('services')">{{ t('_nav._services') }}</a></li>
        <li><a @click.prevent="scrollTo('about')">{{ t('_nav._about') }}</a></li>
        <li><a @click.prevent="scrollTo('portfolio')">{{ t('_nav._projects') }}</a></li>
        <li><a @click.prevent="scrollTo('contact')">{{ t('_nav._contact') }}</a></li>
      </template>
      <template v-else>
        <li><router-link to="/">{{ t('_nav._home') }}</router-link></li>
        <li><router-link to="/#services">{{ t('_nav._services') }}</router-link></li>
        <li><router-link to="/#about">{{ t('_nav._about') }}</router-link></li>
        <li><router-link to="/#portfolio">{{ t('_nav._projects') }}</router-link></li>
        <li><router-link to="/#contact">{{ t('_nav._contact') }}</router-link></li>
      </template>
    </ul>

    <!-- Right side: language + hamburger -->
    <div class="nav-right">
      <button class="lang-btn" @click="setLanguage" :title="locale === 'pt' ? 'Switch to English' : 'Mudar para Português'">
        <svg class="lang-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>{{ locale === 'pt' ? 'PT-BR' : 'EN' }}</span>
      </button>

      <button class="hamburger" @click="toggleMenu" :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'">
        <span class="ham-bar" :class="{ open: isOpen }"></span>
        <span class="ham-bar" :class="{ open: isOpen }"></span>
        <span class="ham-bar" :class="{ open: isOpen }"></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="isOpen" class="nav-drawer">
        <ul class="nav-links-mobile">
          <template v-if="isHomePage">
            <li><a @click.prevent="scrollTo('home')">{{ t('_nav._home') }}</a></li>
            <li><a @click.prevent="scrollTo('services')">{{ t('_nav._services') }}</a></li>
            <li><a @click.prevent="scrollTo('about')">{{ t('_nav._about') }}</a></li>
            <li><a @click.prevent="scrollTo('portfolio')">{{ t('_nav._projects') }}</a></li>
            <li><a @click.prevent="scrollTo('contact')">{{ t('_nav._contact') }}</a></li>
          </template>
          <template v-else>
            <li><router-link to="/" @click="closeMenu">{{ t('_nav._home') }}</router-link></li>
            <li><router-link to="/#services" @click="closeMenu">{{ t('_nav._services') }}</router-link></li>
            <li><router-link to="/#about" @click="closeMenu">{{ t('_nav._about') }}</router-link></li>
            <li><router-link to="/#portfolio" @click="closeMenu">{{ t('_nav._projects') }}</router-link></li>
            <li><router-link to="/#contact" @click="closeMenu">{{ t('_nav._contact') }}</router-link></li>
          </template>
        </ul>
      </div>
    </Transition>

  </nav>
</template>

<style scoped>
/* ── BASE ── */
nav, .navbar { 
  z-index: 9999 !important; /* Valor bem alto para ficar acima de tudo */
  position: fixed; /* ou sticky, dependendo do seu design */
  top: 0;
  width: 100%;
}

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 2000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 4rem;
  border-bottom: 1px solid transparent;
  transition:
    background 0.45s ease,
    border-color 0.45s ease,
    backdrop-filter 0.45s ease,
    padding 0.35s ease;
}

/* scrolled state */
.navbar.scrolled {
  background: rgba(6, 6, 8, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-color: rgba(255, 255, 255, 0.06);
  padding: 1rem 4rem;
}

/* ── LOGO ── */
.nav-logo { font-size: .98rem; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; text-decoration: none; color: var(--text); }
.nav-logo span { color: var(--accent); }

/* ── DESKTOP LINKS ── */
.nav-links-desktop {
  display: flex;
  list-style: none;
  gap: 2.8rem;
  align-items: center;
}
.nav-links-desktop li a,
.nav-links-desktop li .router-link-active {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(226, 226, 234, 0.45);
  text-decoration: none;
  cursor: pointer;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.nav-links-desktop li a:hover,
.nav-links-desktop li .router-link-active:hover {
  color: #4d7cff;
  border-color: #4d7cff;
}
.nav-links-desktop li .router-link-exact-active {
  color: #4d7cff;
  border-color: #4d7cff;
}

/* ── RIGHT SIDE ── */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;
}

/* ── LANGUAGE BUTTON ── */
.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(226, 226, 234, 0.4);
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.lang-btn:hover {
  border-color: rgba(77, 124, 255, 0.45);
  color: #4d7cff;
}
.lang-icon {
  width: 13px; height: 13px;
  stroke: currentColor; fill: none;
  stroke-width: 1.6;
  stroke-linecap: round; stroke-linejoin: round;
  flex-shrink: 0;
}

/* ── HAMBURGER ── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  width: 32px;
}
.ham-bar {
  display: block;
  width: 100%;
  height: 1px;
  background: rgba(226, 226, 234, 0.5);
  transition: transform 0.35s cubic-bezier(.25,.46,.45,.94), opacity 0.3s, width 0.3s;
  transform-origin: center;
}
/* X state */
.ham-bar:nth-child(1).open { transform: translateY(6px) rotate(45deg); background: #4d7cff; }
.ham-bar:nth-child(2).open { opacity: 0; width: 0; }
.ham-bar:nth-child(3).open { transform: translateY(-6px) rotate(-45deg); background: #4d7cff; }

/* ── MOBILE DRAWER ── */
.nav-drawer {
  position: fixed;
  top: 0; right: 0;
  width: 280px;
  height: 100vh;
  background: rgba(10, 10, 14, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 1999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-links-mobile {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  padding: 2rem 0;
}
.nav-links-mobile li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.nav-links-mobile li:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.nav-links-mobile li a {
  display: flex;
  align-items: center;
  padding: 1.1rem 2.5rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(226, 226, 234, 0.45);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s, padding-left 0.25s;
}
.nav-links-mobile li a:hover {
  color: #4d7cff;
  padding-left: 3rem;
}
.nav-links-mobile li a::before {
  content: '//';
  font-size: 0.55rem;
  color: #4d7cff;
  margin-right: 0.7rem;
  opacity: 0;
  transition: opacity 0.2s;
}
.nav-links-mobile li a:hover::before { opacity: 1; }

/* ── DRAWER TRANSITION ── */
.drawer-enter-active { transition: transform 0.4s cubic-bezier(.25,.46,.45,.94), opacity 0.3s ease; }
.drawer-leave-active { transition: transform 0.35s cubic-bezier(.55,0,1,.45), opacity 0.25s ease; }
.drawer-enter-from  { transform: translateX(100%); opacity: 0; }
.drawer-leave-to    { transform: translateX(100%); opacity: 0; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .navbar { padding: 1.2rem 2rem; }
  .navbar.scrolled { padding: 0.9rem 2rem; }
  .nav-links-desktop { display: none; }
  .hamburger { display: flex; }
}

@media (max-width: 480px) {
  .navbar { padding: 1rem 1.2rem; }
  .navbar.scrolled { padding: 0.8rem 1.2rem; }
  .nav-drawer { width: 100%; border-left: none; }
}
</style>