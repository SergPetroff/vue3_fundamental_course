import { createApp } from 'vue'
import App from './App'

const app =createApp(App)

//Импортируем UI компоненты
import uicomponents from '@/components/UI'
import router from './router/router';

import directives from '@/directives'


//Делаем глобальную регистрацию
uicomponents.forEach(uicomponent => {
    app.component(uicomponent.name, uicomponent)
});

directives.forEach(mydirective => {
    app.directive(mydirective.name, mydirective)
})


app.use(router).mount('#app')
