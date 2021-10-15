<template>
    <div class="preloader" v-if="preLoader">
        <img src="../../src/assets/images/preloader.gif" alt="Loading...">
        <p>{{ textPreloader }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Preloader",
    computed: {
        ...mapState({
            preLoader: state => state.preLoader,
            textPreloader: state => state.textPreloader
        })
    }
}
</script>

<style scoped>
    .preloader {
        position: absolute;
        background: #000;
        opacity: .8;
        width: 100%;
        height: 100%;
        z-index: 999999999999;
        text-align: center;
    }

    .preloader img {
        width: 100px;
        margin-top: 10%;
    }
</style>