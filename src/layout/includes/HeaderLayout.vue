<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Your Company</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'users'}" class="nav-link">Users</router-link>
                    </li>
                </ul>
                Hello, {{ me.name }} <a href="#" @click.prevent="logoutUser" class="nav-link">(Logout)</a>
            </div>
        </nav>

    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "HeaderLayout",

    computed: {
        ...mapState({
            me: state => state.auth.me
        })
    },

    methods: {
        ...mapActions([
            'logout'
        ]),

        logoutUser() {
            this.logout()
                .then(response => {
                    this.$router.push({ name: 'login' })
                })
        }
    }
}
</script>

<style scoped>
    .nav-link {
        color: #a5a6a9;
    }
    .navbar-nav .nav-link {
        color: #a5a6a9;
    }
    .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {
        color: #ff8000;
    }
    .img {
        width: 100%;
    }
    .navbar-brand {
        width: 150px;
    }
</style>