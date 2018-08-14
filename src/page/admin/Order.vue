<style>
.user-list table {
    width: 100%;
}

.user-list table th,
.user-list table td
 {
     padding: 10px;
    border: 1px solid #000;
}
</style>

<template>
    <div>
        <div class="content">
            <div class="user-list taf">
                <div>订单号:</div>
                <table>
                    <thead>
                        <tr>
                            <th>物品</th>
                            <th>编辑</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in allList.order" :key="index">
                            <td>
                                {{item.$category && item.$category.name}}
                            </td>
                            <td>
                                {{item.name}}
                            </td>
                            <td>
                                <span @click="removeItem(item.id)">删除</span>
                                <span @click="modify(item)">修改</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import AdminPage from "../../mixsin/AdminPage";
import DropDown from "../../components/DropDown";
export default {
    components: {
        DropDown
    },
    data() {
        return {
            model: 'order',
            with: [
                {
                    relation: 'has_one',
                    model: 'category'
                }
            ]
        }
    },
    mixins: [AdminPage],
    mounted() {                
        this.readInfo();
    },
    methods: {
        setCategorylId(item) {
            this.$set(this.current, 'category_id', item.id);
        }
    }
}

</script>