<style>

</style>


<template>
    <div class="admin-mian">
        <form action="">
            <div class="input-group">
                <label for="">用户名</label>
                <input type="text" v-model="current.unique">
            </div>
            <div class="input-group">
                <label for="">密码</label>
                <input type="password" v-model="current.password">
            </div>
            <div class="btn-group">
                <button>登入</button>
            </div>
            <div class="btn-group">
                <button>取消</button>
            </div>
        </form>
    </div>
</template>

<script>
    import api from "../lib/api";
    import session from "../lib/session";

    export default {
        data() {
            return {
                admin: {},
                current: {}
            }
        },
        submitSginIn() {
            let unique, password;
            
            if(!(unique = this.current.$unique) || !(password = this.current.password)){
                this.signFailed = '账号密码不能为空';
                alert("账号或密码不能为空");
                return;
            }

            api.api('admin')
        }
    }
</script>
