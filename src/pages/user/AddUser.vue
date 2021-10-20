<template>
    <div id="main" class="container-fluid" style="margin-top: 50px">
        <div class="col-md-3">
            <h2>Add New User</h2>
        </div>
        <form-user></form-user>

    </div>
</template>

<script>
import FormUser from "./includes/FormUser";

export default {
    name: "AddUser",

    components: {
        formUser: FormUser
    },
}
</script>

<style scoped>

</style>