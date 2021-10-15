<template>
    <div>
        <preloader-component></preloader-component>
        <header-layout></header-layout>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderLayout from "./includes/HeaderLayout";

export default {
    name: "DefaultTemplate",
    components: {
        HeaderLayout: HeaderLayout
    }
}
</script>

<style scoped>

</style>