<style scoped>
/* 头部综合区域 */

.bot {
    margin: 25px 0;
}

.logo,
.search,
.sgin {
    vertical-align: middle;
}

.search form {
    border: 1px solid #eee;
}

.search input,
.search button,
.select-wrap {
    border: 0;
    padding: 14px;
    font-size: 1.2rem;
}

.search input,
.select-wrap {
    border-right: 1px solid #eee;
}

.search button {
    color: #fff;
    background: #fda30e;
}

.bot .sgin li {
    padding-left: 25px;
}

.bot .sgin a {
    font-size: 1.6rem;
    padding: 1px;
    display: block;
    color: #fda30e;
}

/* 导航栏 */

.nav {
    background: #000;
}

.nav > *,
.nav a {
    color: #fff;
}

.nav li a {
    padding: 26px 20px;
    margin: 0 10px;
    display: block;
    position: relative;
}

.nav li a::before {
    content: "";
    position: absolute;
    width: 100%;
    background: #fda30e;
    height: 4px;
    bottom: 0px;
    left: 0;
    transform: scale3d(0, 1, 1);
    transform-origin: center left;
    transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
    transition-delay: 0.4s;
}

.nav li a:hover::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    bottom: 0;
    left: 0;
    transform: scale3d(1, 1, 1);
    transform-origin: center left;
    transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.menu-link a::after {
    content: "";
    position: absolute;
    background: #fda30e;
    height: 4px;
    bottom: 0px;
    left: 0;
    width: 100%;
    transform: scale3d(1, 1, 1);
    transition-delay: 0s;
}
.nav-cart {
    text-align: center;
    background: #fda30e;
}

.nav-cart p {
    padding: 8.38px;
}

.nav-cart a {
    font-size: 1rem;
    padding: 4px;
}

.modal-wrap .modal-content {
    width: 24%;
    top: 10%;
    left: 38%;
}

.signIn-link,
.signUp-link {
    color: #f44336;
}

.signIn-link:hover,
.signUp-link:hover {
    color: #fda30e;
}

.login button {
    color: #fff;
    background: #7b7b7b;
    transition: 0.5s all;
}

.login button:hover {
    background: #fda30e;
}

.login input:hover,
.login input:focus {
    border: 1px solid #fda30e;
}
</style>

<template>
    <div class="header">
        <div class="bot">
            <div class="container row">
                <div class="col-lg-3 logo tac">
                    <h2>我是LOGO啊</h2>
                </div>
                <div class="col-lg-6 search">
                    <form class="row">
                        <input class="col-lg-6" type="search">
                        <div class="col-lg-4 select-wrap">
                            <span>Select</span>
                        </div>
                        <button class="col-lg-2" type="submit">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
                <div class="col-lg-3 sgin">
                    <ul v-if="uinfo">
                        <li>
                            <a href="#">{{uinfo && uinfo.username || uinfo.phone || uinfo.mail}}</a>
                        </li>
                        <li>
                            <a @click="signOut()" href="#">
                                <i class="fa fa-sign-out" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                    <ul v-else>
                        <li>
                            <span @click="showSginIn()" @keyup.esc="hiddenModal()" href="#">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </span>
                        </li>
                        <li>
                            <a @click="showSginUp()" @keyup.esc="hiddenModal()" href="#">
                                <i class="fa fa-user-plus" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="nav">
            <div class="container row">
                <div class="nav-left col-lg-9">
                    <ul class="navbar">
                        <li @click="defName = defName" :class="{'menu-link': defName == 'home'}">
                            <router-link class="hb" to="/" href="#">首页</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../lib/api";
import GetCode from "../mixsin/GetCode";
import session from "../lib/session";
import signInRoot from "../hub/signInRoot";
export default {
    props: {
        defName: {
            default: "home"
        }
    },
    created() {},
    mixins: [GetCode],
    data() {
        return {
            modalList: signInRoot.modalList(),
            uinfo: session.uinfo('uinfo_pet_admin'),

            // 登入验证的错误信息
            signFailed: ""
        };
    },
    mounted() {
        // 登入状态
        session.uinfo('uinfo_pet_admin');
    },
    methods: {
        //用户登出
        signOut() {
            session.signOut('uinfo_pet_admin');
            this.$router.push('/adminSignIn');
        }

    }
};
</script>
