<template>
    <div id="main" class="container-fluid" style="margin-top: 50px">
        <div class="col-md-3">
            <h2>Edit User</h2>
        </div>
        <form-user
            :user="user"
            :updating="true">
        </form-user>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import FormUser from "./includes/FormUser";

export default {
    name: "EditUser",

    props: {
        id: {
            require: true
        }
    },

    components: {
        formUser: FormUser
    },

    created () {
        this.getUser(this.id)
            .then(response => {
                this.user = response.data.data
            })
            .catch(response => {
                this.$vToastify.error('Error to load User')
            })
    },

    data () {
        return {
            user: {}
        }
    },

    methods: {
        ...mapActions([
            'getUser'
        ]),


    }
}
</script>

<style scoped>

</style>