<style scoped>
.admin-signIn {
    max-width: 360px;
    margin: 180px auto;
    border: 1px solid #000;
}

.admin-signIn .signIn-form {
    padding: 10px;
}

.admin-signIn .title {
    margin-top: 15px;
}

.admin-signIn .input-group {
    margin-bottom: 10px;
}

.input-group input,
.btn-group button {
    padding: 11px;
    margin-bottom: 5px;
}
</style>


<template>
    <div class="admin-mian">
        <div class="admin-signIn">
            <form @submit.prevent="submitSginIn()" action="" class="signIn-form">
                <div class="title tac">
                    <h2>管理员登入</h2>
                </div>
                <div class="input-group">
                    <label for="" class="col-lg-12">账号</label>
                    <input type="text" class="col-lg-12" v-model="current.$unique" placeholder="admin">
                </div>
                <div class="input-group">
                    <label for="" class="col-lg-12">密码</label>
                    <input type="password" class="col-lg-12" v-model="current.password" placeholder="admin123">
                </div>
                <div class="btn-group">
                    <button class="col-lg-12">登入</button>
                </div>
                <div class="btn-group">
                    <button @click="cancelSginIn()" type="button" class="col-lg-12">取消</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api from "../lib/api";
import session from "../lib/session";

export default {
    data() {
        return {
            admin: {},
            current: {},
            uinfo: session.uinfo("uinfo_pet_admin")
        };
    },
    mounted() {
        // 登入状态
        session.uinfo("uinfo_pet_admin");
    },
    methods: {
        // 取消登入
        cancelSginIn() {
            this.$router.push('/adminSignIn');
        },
        //管理员登入
        submitSginIn() {
            let unique, password;

            if (
                !(unique = this.current.$unique) ||
                !(password = this.current.password)
            ) {
                this.signFailed = "账号密码不能为空";
                alert("账号或密码不能为空");
                return;
            }

            api
                .api("admin/read", {
                    where: {
                        or: [["username", "=", unique], ["password", "=", password]]
                    }
                })
                .then(res => {
                    let item;
                    // console.log("res.data:", res.data);

                    if (!res.data || !(item = res.data[0]) || item.password != password) {
                        this.signFailed = "账号密码错误";
                        alert("账号密码错误");
                        return;
                    }

                    this.signFailed = false;

                    session.signIn(item, "uinfo_pet_admin");
                    this.uinfo = session.uinfo("uinfo_pet_admin");
                    alert('成功登入');
                    
                    this.$router.push("/admin");
                });
        }
    }
};
</script>
