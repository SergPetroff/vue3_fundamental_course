import { createApp } from 'vue'
import App from './App'

const app =createApp(App)

//Импортируем UI компоненты
import uicomponents from '@/components/UI'

//Делаем глобальную регистрацию
uicomponents.forEach(uicomponent => {
    app.component(uicomponent.name, uicomponent)
});

app.mount('#app')
