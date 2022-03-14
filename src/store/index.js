import { createStore } from "vuex";

export default createStore({
    //Данные
    state:{
          likes:0,
          isAuth:false
    },
    //вычисляемые свойства
    getters:{
            doubleLikes(state){
                return state.likes *2
            }
    },
    //мутации для изменения состояния
    mutations:{
        incrementLikes(state){
            state.likes +=1
        },
        decrementLikes(state){
            state.likes -=1
        }

    },
    //Методы которые используют мутации для изменения состояния
    actions:{

    },
    //Модули для разбивки данных что бы не было мусора
    modules:{

    }
})