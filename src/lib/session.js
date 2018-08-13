import api from './api';


export default {
    uinfo(role) {
        role = role || 'uinfo_pet';
        return JSON.parse(localStorage.getItem(role));  
    },

    signIn(item, role) {
        this.replaceUnifo(item, role);
        // location.href = url || '/';
    },

    replaceUnifo(item, role) {
        role = role || 'uinfo_pet';
        delete item.password;
        localStorage.setItem(role, JSON.stringify(item));
        this.uinfo(role);
    },


    signOut(role) {
        role = role || 'uinfo_pet';
        localStorage.removeItem(role);

    },

    isAdmin() {
        let info = this.uinfo();
        return info && this.uinfo().isAdmin;
    },

    signUped(role) {
        return !!this.hisId(role);
    },

    hisId(role) {
        let info = this.uinfo(role);
        return info && this.uinfo(role).id;
    }
}