<template>
    <div class="login-form">
        <form action="" method="post">
            <h2 class="text-center">Log in</h2>
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
                        @click.prevent="loginUser" :disabled="loading">
                    <span v-if="loading">Loging...</span>
                    <span v-else>Log in</span>
                </button>
            </div>
            <div class="clearfix">
                <label class="float-left form-check-label"><input type="checkbox"> Remember me</label>
                <a href="#" class="float-right">Forgot Password?</a>
            </div>
        </form>
        <p class="text-center"><router-link :to="{name: 'register'}" class="nav-link">New Account</router-link></p>
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    name: "Login",

    data() {
        return {
            loading: false,
            formData: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            }
        }
    },

    methods: {
        ...mapActions([
            'login'
        ]),

        loginUser() {
            this.loading = true
            this.resetErrors()

            this.login(this.formData)
                .then(response => {
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

                    if(errorResponse.status === 401) {
                        this.$vToastify.error('Email or Password is wrong.', 'Error')
                        return
                    }
                    this.$vToastify.error('Failed to Save User', 'Error')
                })
                .finally(() => this.loading = false)
        },

        resetErrors () {
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
    .login-form {
        width: 340px;
        margin: 50px auto;
        font-size: 15px;
    }
    .login-form form {
        margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .btn {
        min-height: 38px;
        border-radius: 2px;
    }
    .btn {
        font-size: 15px;
        font-weight: bold;
    }
</style>