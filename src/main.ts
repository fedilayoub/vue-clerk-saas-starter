import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './assets/index.css';
import { clerkPlugin } from '@clerk/vue';
import { i18n } from './plugins/i18n';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}

const app = createApp(App);
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });
app.use(router);
app.use(i18n);

app.mount('#app');

// Hide the fallback loader after Vue is mounted and ready
router.isReady().then(() => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.classList.add('fade-out');
    // Remove loader from DOM after transition
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
});

