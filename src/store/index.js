import { createStore } from "vuex";
import { postModule } from "@/store/postModule";


export default createStore({

    //Модули для разбивки данных что бы не было мусора
    modules:{
        post:postModule
    }
})