<template>
    <div>
        <form action="" method="post">
            <div class="form-group">
                <div class="text-danger" v-if="errors.name != ''">
                    {{ errors.name[0] || '' }}
                </div>
                <input type="text" v-model:src="user.name" name="name" id="inputName"  placeholder="Your Name" autofocus
                       :class="['form-control', {'id-invalid' : errors.name != ''}]" >
            </div>

            <div class="form-group">
                <div class="text-danger" v-if="errors.email != ''">
                    {{ errors.email[0] || '' }}
                </div>
                <input type="email" v-model:src="user.email" name="email" id="inputEmail" placeholder="Email address" required autofocus
                       :class="['form-control', {'id-invalid' : errors.email != ''}]">
            </div>

            <div class="form-group">
                <div class="text-danger" v-if="errors.password != ''">
                    {{ errors.password[0] || '' }}
                </div>
                <input type="password" v-model:src="user.password" name="password" id="inputPassword" placeholder="Password" required
                       :class="['form-control', {'id-invalid' : errors.password != ''}]">
            </div>

            <div class="form-group">
                <button class="btn btn-lg btn-primary btn-block" type="submit"
                        @click.prevent="onSubmit" :disabled="loading">
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
    name: "FormUser",

    methods: {
        ...mapActions([
            'register', 'updateUser'
        ]),

        onSubmit () {
            const action = this.updating ? this.update() : this.add()
        },

        add () {
            this.loading = true
            this.resetErrors()

            this.register(this.user)
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

        update () {
            this.updateUser(this.user)
                .then(response => {
                    this.$vToastify.success('User Updated!', 'Success')
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
                    this.$vToastify.error('Failed to Update User', 'Error')
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
    },

    props: {
        user: {
            require: false,
            type: Object|Array,
            default: () => {
                return {
                    id: '',
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        updating: {
            require: false,
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            loading: false,
            errors: {
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