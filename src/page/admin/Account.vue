<style scoped>
.user-list table {
    width: 100%;
}y

.user-list table th,
.user-list table td {
    padding: 10px;
    border: 1px solid #000;
}

</style>

<template>
    <div>
        <div class="content">
            <div class="title-area">
                <h2>管理员账户管理</h2>
            </div>
            <div class="add-info">
                <button @click="modal = true">添加管理员</button>
            </div>
            <div v-if="modal" @click.self="hiddenModal()" class="modal-wrap">
                <div class="modal-content info-wrap">
                    <div class="modal-header tar">
                        <span @click="hiddenModal()" class="cancel cp">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                    <form @submit.prevent="createInfo()">
                        <div class="col-lg-12 input-group">
                            <label for="">描述</label>
                            <input class="col-lg-12" type="text" v-model="current.description">
                        </div>
                        <div class="col-lg-12 input-group">
                            <label for="">账号</label>
                            <input class="col-lg-12" type="text" v-model="current.username">
                        </div>
                        <div class="col-lg-12 input-group">
                            <label for="">密码</label>
                            <input class="col-lg-12" type="text" v-model="current.password">
                        </div>
                        <div class="col-lg-12 input-group">
                            <label for="">权限</label>
                            <input class="col-lg-12" type="number" v-model="current.permissions">
                        </div>
                        <div class="btn-wrap row">
                            <div class="btn-group col-lg-6">
                                <button class="col-lg-12" type="submit">确认添加</button>
                            </div>
                            <div class="btn-group col-lg-6">
                                <button @click="hiddenModal()" class="col-lg-12" type="button">取消</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="user-list taf">
                <table>
                    <thead>
                        <tr>
                            <th>描述</th>
                            <th>账号</th>
                            <th>密码</th>
                            <th>权限</th>
                            <th>编辑</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in allList.admin" :key="index">
                            <td>
                                {{item.description}}
                            </td>
                            <td>
                                {{item.username}}
                            </td>
                            <td>
                                {{item.password}}
                            </td>
                            <td>
                                {{item.permissions}}
                            </td>
                            <td>
                                <span @click="removeItem(item.id)">删除</span>
                                <span @click="modify(item)">修改</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :limit="limit" :totalCount="total" :onChange="changPage"/>

        </div>
    </div>
</template>

<script>
import AdminPage from "../../mixsin/AdminPage";
export default {
    mixins: [AdminPage],
    data() {
        return {
            model: "admin",
        };
    },
    mounted() {
        this.readInfo();
    },
    methods: {
    }
};
</script>