<style>
.page {
    color: red;
}
</style>

<template>
    <div>
        <div class="pagination">
            <button @click="change(1)">首页</button>
            <button @click="prev()">上一页</button>
            <span>
                <button  v-for="(page, index) in lastPage" :key="index"
                @click="change(page)"
                v-if="Math.abs(page - currentPage) < limit"
                 :class="{'page': currentPage == page}">{{page}}</button>
            </span>
            <button @click="next()">下一页</button>
            <button @click="change(lastPage)">尾页</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            limit: {
                defalt: 1
            },
        onChange: {
            default() {

            }
        },
        totalCount: {
            default: 0
        },
        searchCurrentPage: {
            default: 1
        }
    },
    data() {
        return {
            currentPage: 1
        }
    },
    computed: {
        lastPage() {
            return Math.ceil(this.totalCount / this.limit);
        },
        isFirstPage() {
            return this.currentPage == 1;
        },
        isLastPage() {
            return this.currentPage == this.lastPage;
        }
    },
    mounted() {
        this.currentPage = this.searchCurrentPage;
    },
    methods: {
        change(page) {
            if(this.onChange) {
                this.onChange(page)
            }
            this.currentPage = page;
        },
        prev() {
            if(this.isFirstPage) {
                return;
            }

            this.change(--this.currentPage)
        },
        next() {
            if(this.isLastPage) {
                return;
            }
            
            this.change(++this.currentPage)
        }
    },
    watch: {
        searchCurrentPage(page) {
            this.currentPage = page;
        }
    }
}
</script>

