<template>
    <div class="login-form">
        <form action="" method="post">
            <h2 class="text-center">Sign in</h2>
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
                        @click.prevent="registerUser" :disabled="loading">
                    <span v-if="loading">Saving...</span>
                    <span v-else>Sign in</span>
                </button>
            </div>
        </form>
        <p class="text-center"><router-link :to="{name: 'login'}" class="nav-link">Log in</router-link></p>
    </div>



</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "Register",

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

        registerUser () {
            this.loading = true
            this.resetErrors()

            this.register(this.formData)
                .then(response => {
                    this.$vToastify.success('Welcome!', 'Success')
                    this.$router.push({ name: 'login' })
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