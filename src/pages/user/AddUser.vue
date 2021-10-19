<template>
    <div id="main" class="container-fluid" style="margin-top: 50px">
        <div class="col-md-3">
            <h2>Add New User</h2>
        </div>
        <form action="" method="post">
            <div class="form-group">
                <div class="text-danger" v-if="errors.name != ''">
                    {{ errors.name[0] || '' }}
                </div>
                <input type="text" v-model:src="formData.name" name="name" id="inputName"  placeholder="Your Name" autofocus
                       :class="['form-control', {'id-invalid' : errors.name != ''}]" >
            </div>

            <div class="form-group">
                <div class="text-danger" v-if="errors.email != ''">
                    {{ errors.email[0] || '' }}
                </div>
                <input type="email" v-model:src="formData.email" name="email" id="inputEmail" placeholder="Email address" required autofocus
                       :class="['form-control', {'id-invalid' : errors.email != ''}]">
            </div>

            <div class="form-group">
                <div class="text-danger" v-if="errors.password != ''">
                    {{ errors.password[0] || '' }}
                </div>
                <input type="password" v-model:src="formData.password" name="password" id="inputPassword" placeholder="Password" required
                       :class="['form-control', {'id-invalid' : errors.password != ''}]">
            </div>

            <div class="form-group">
                <button class="btn btn-lg btn-primary btn-block" type="submit"
                        @click.prevent="add" :disabled="loading">
                    <span v-if="loading">Saving...</span>
                    <span v-else>Save</span>
                </button>
            </div>
        </form>

    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "AddUser",

    data() {
        return {
            loading: false,
            formData: {
                name: '',
                email: '',
                password: ''
            },
            errors: {
                name: '',
                email: '',
                password: ''
            }
        }
    },

    methods: {
        ...mapActions([
           'register'
        ]),

        add() {
            this.loading = true
            this.resetErrors()

            this.register(this.formData)
                .then(response => {
                    this.$vToastify.success('User Saved!', 'Success')
                    this.$router.push({ name: 'users' })
                })
                .catch(error => {
                    const errorResponse = error.response
                    if (errorResponse.status === 422) {
                        this.errors = Object.assign(this.errors, errorResponse.data.errors)
                        this.$vToastify.error('Invalid Data', 'Error')
                        console.log(this.errors.name[0])
                        setTimeout(() => this.resetErrors(), 4000)
                        return
                    }
                    this.$vToastify.error('Failed to Save User', 'Error')
                })
                .finally(() => this.loading = false)
        },

        resetErrors() {
            this.errors = {
                name: '',
                email: '',
                password: ''
            }
        }
    }
}
</script>

<style scoped>

</style>