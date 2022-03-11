import { createApp } from 'vue'
import App from './App'

const app =createApp(App)

//Импортируем UI компоненты
import uicomponents from '@/components/UI'
import router from './router/router';

//Делаем глобальную регистрацию
uicomponents.forEach(uicomponent => {
    app.component(uicomponent.name, uicomponent)
});

app.use(router).mount('#app')
