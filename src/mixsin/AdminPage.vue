

<script>
import api from "../lib/api.js";
import ReadInfo from "./ReadInfo";
import DropDown from "../components/DropDown";
import Pagination from "../components/Pagination";

export default {
    components: {
        DropDown,
        Pagination
    },
    mixins: [ReadInfo],
    data() {
        return {
            allList: {},
            current: {},
            modal: false,
            total: 0,
            currentPage: null, //当前页
            lastPage: null, //最后一页
            limit: 5
        };
    },
    methods: {
        changPage(page) {
            this.readInfo(page);
        },
        readInfo(page = 1) {
            if (page == this.currentPage && page != 1) return;
            api
                .api(`${this.model}/read`, {
                    limit: this.limit,
                    page: page,
                    with: this.with
                })
                .then(res => {
                    this.$set(this.allList, this.model, res.data);
                    this.total = res.total;
                    this.lastPage = res.last_page;
                    this.currentPage = res.current_page;
                });
        },
        createInfo() {
            let action = this.current.id ? "update" : "create";

            api.api(`${this.model}/${action}`, this.current).then(res => {
                this.readInfo();

                this.current = {};
            });
        },
        removeItem(id) {
            if (!confirm("确认删除？")) return;

            api.api(`${this.model}/delete`, { id }).then(res => {
                this.readInfo();
            });
        },
        modify(item) {
            this.current = item;
            this.showModal();
        },
        showModal() {
            this.modal = true;
        },
        hiddenModal() {
            this.modal = false;
        }
    }
};
</script>