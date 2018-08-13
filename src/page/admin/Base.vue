<style scoped>
.admin-main {
    margin-top: 40px;
}

.sidebar,
.content {
    padding: 20px;
}
</style>

<template>
    <div>
        <AdminHeader defName="admin"/>
        <div class="admin-main">
            <div class="admin-container row">
                <div class="col-lg-1 sidebar">
                    <AdminSidebar/>
                </div>
                <div class="col-lg-11 content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../css/admin.css"
import api from "../../lib/api.js"
import AdminHeader from "../../components/AdminHeader"
import AdminSidebar from "../../components/AdminSidebar"
export default {
    components: {
        AdminHeader,
        AdminSidebar,
    }
};
</script>
