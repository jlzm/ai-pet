import Vue from "vue";

import api from "../lib/api";

import session from "../lib/session";
import signInRoot from '../hub/signInRoot';



const list = {
    cart: []
};

const total = {
    count: 0,
    price: 0
}

const cartList = () => {
    return list;
}

const cartTotal = ()=> {
    return total;
}


const read = () => {
    api.api('cart/read', {
        key_by: 'id',
        with: 'has_one:pet'
    }).then(res => {
        Vue.set(list, 'cart', res.data);
    })
}

const add = (petId, count) => {
    if (!session.uinfo()) {
        let modalList = signInRoot.modalList();
        modalList.modal = true;
        modalList.signIn = true;
        modalList.signUp = false;
        return;
    }
    count = count || 1;
    api.api('cart/create', {
        pet_id: petId,
        count
    }).then(res => {
        read();
    })
}

const remove = (id) => {

    api.api('cart/delete', {
        id
    }).then(res => {
        read();
    })
}



export default {

    cartList,
    cartTotal,
    read,
    add,
    remove
}

const init = () => {
    read();
}

init();