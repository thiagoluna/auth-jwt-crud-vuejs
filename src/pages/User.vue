<template>
    <!-- Container Principal -->
    <div id="main" class="container-fluid" style="margin-top: 50px">
        <!-- Topo do container com 3 colunas -->
        <div id="top" class="row">
            <div class="col-md-3">
                <h2>Usuários Cadastrados - </h2>
            </div>
            <!-- Form Busca -->
            <div class="col-md-6">
                <form action="" method="post">
                    <div class="input-group h2">
                        <input name="criterio" class="form-control" id="criterio" type="text" placeholder="Pesquisar Atletas" value="">
                        <span class="input-group-btn">
                                <button class="btn btn-primary" type="submit">
                                    <span class="glyphicon glyphicon-search">Buscar</span>
                                </button>
                            </span>
                    </div>
                </form>
            </div>
            <!-- Botão Novo -->
            <div class="col-md-3">
                <router-link class="btn btn-primary pull-right h2" :to="{name: 'add.users'}">Add User</router-link>
            </div>
        </div> <!-- /#top -->
        <hr />
        <!-- Listagem dos itens do bd -->
        <div id="list" class="row">
            <div class="table-responsive col-md-12">
                <table class="table table-striped" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th class="actions">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- Listar dados do bd -->

                    <tr v-for="(user, index) in users.data" :key="index">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td class="actions">
                            <router-link class="btn btn-warning btn-xs" :to="{name: 'edit.user', params: {id: user.id}}">Edit</router-link>
                            <a class="btn btn-danger btn-xs" href="#" @click.prevent="confirmDelete(user)">Delete</a>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div> <!-- /#listagem -->
    </div>  <!-- /#main -->
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "Users",

    mounted() {
        //this.$store.dispatch('getUsers')
        this.getUsers()
            .catch(response => {
                this.$vToastify.error('Error to load Users')
            })
    },

    computed: {
        // users () {
        //     return this.$store.state.users.items
        // }
        ...mapState({
            users: state => state.users.items,
            auth: state => state.auth.authenticated,
            name: state => state.auth.me.name
        })
    },

    methods: {
        ...mapActions([
            'getUsers', 'getFakeUsers', 'deleteUser'
        ]),

        confirmDelete(user) {
            this.$vToastify.prompt({
                body: 'Confirm Delete?',
                answers: { Yes: true, No: false}
            }).then(value => {
                if (value) {
                    this.delete(user.id)
                }
            })
        },

        delete(id) {
            this.deleteUser(id)
                .then(response => {
                    this.$vToastify.success('Users Deleted!')
                    this.getUsers()
                })
                .catch(response => {
                    this.$vToastify.error('Error to delete Users')
                })
        }
    }
}
</script>

<style scoped>

</style>