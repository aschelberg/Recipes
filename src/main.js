import '@/assets/styles.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { firebaseApp } from '@/services/firebase.js'
import { VueFire, VueFireAuth } from 'vuefire';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
});
app.use(router);

app.mount("#app");