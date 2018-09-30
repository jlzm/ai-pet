<script>
import api from "../lib/api"
    export default {
        methods: {
            gReadInfo(model, condition, between) {
                condition = condition || null;
            api.api(`${model}/read`, condition, between).then(res => {
                this.$set(this.allList, model, res.data);
            });
        },
        }
    }
</script>