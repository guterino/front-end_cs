<template>
    <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarCor">
        {{ feedback }}
        <template v-slot:actions>
            <v-btn :color="snackbarBotaoCor" variant="text" @click="snackbar = false">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>
    <v-container class="container-component" :key="componentKey">
        <v-card class="login-component" v-if="!exibirMenuCadastrar">
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-text-field v-model="email" label="Email"></v-text-field>
                <v-text-field v-model="senha" label="Senha" type="password"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="botaoDisabled" color="primary" @click="login">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="abrirMenuCadastrar()">Cadastrar</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="login-component" v-else>
            <v-card-title>Cadastrar</v-card-title>
            <v-card-text>
                <v-text-field v-model="nomeCadastro" label="Nome"></v-text-field>
                <v-text-field v-model="emailCadastro" label="Email"></v-text-field>
                <v-text-field v-model="senhaCadastro" label="Senha" type="password"></v-text-field>
                <v-select label="Tipo conta" :items="['CLIENTE', 'FORNECEDOR']" v-model="tipoContaCadastro"></v-select>
                <v-text-field v-model="documentoCadastro" label="Documento"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="cadastrar()">Criar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="fecharMenuCadastrar()">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            senha: '',
            componentKey: 0,
            snackbar: false,
            snackbarCor: '',
            snackbarBotaoCor: 'pink',
            feedback: '',
            botaoDisabled: false,
            exibirMenuCadastrar: false,
            nomeCadastro: '',
            emailCadastro: '',
            senhaCadastro: '',
            tipoContaCadastro: 'CLIENTE',
            documentoCadastro: ''
        }
    },
    mounted() {
        sessionStorage.setItem("autenticado", false);
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        login() {
            this.botaoDisabled = true;
            axios.post('http://localhost:8080/api/usuario/login', {
                email: this.email,
                senha: this.senha
            })
                .then((response) => {
                    this.feedback = 'Autenticado com sucesso';
                    this.snackbarCor = 'success';
                    this.snackbarBotaoCor = 'white';
                    this.snackbar = true;
                    sessionStorage.setItem("autenticado", true);
                    sessionStorage.setItem("clienteId", response.data.id);
                    window.dispatchEvent(new CustomEvent('autenticacao', {
                        detail: {
                            storage: sessionStorage.getItem('autenticado')
                        }
                    }));
                    this.$router.push('/home');
                })
                .catch(error => {
                    this.feedback = error.response.data.mensagem;
                    this.snackbarCor = '';
                    this.snackbarBotaoCor = 'pink';
                    this.snackbar = true;
                    sessionStorage.setItem("autenticado", false);
                })
                .finally(() => {
                    this.botaoDisabled = false;
                });
        },
        abrirMenuCadastrar() {
            this.exibirMenuCadastrar = true;
            this.forceRerender();
        },
        fecharMenuCadastrar() {
            this.exibirMenuCadastrar = false;
            this.forceRerender();
        },
        cadastrar() {
            axios.post("http://localhost:8080/api/usuario", {
                nome: this.nomeCadastro,
                email: this.emailCadastro,
                senha: this.senhaCadastro,
                tipoConta: this.tipoContaCadastro,
                documento: this.documentoCadastro
            }).then(() => {
                this.feedback = 'Conta criada com sucesso';
                this.snackbarCor = 'success';
                this.snackbarBotaoCor = 'white';
                this.snackbar = true;
                this.fecharMenuCadastrar();
            }).catch((error) => {
                this.feedback = error.response.data.mensagem;
                this.snackbarCor = '';
                this.snackbarBotaoCor = 'pink';
                this.snackbar = true;
            });
        }
    }
}
</script>

<style>
.login-component {
    width: 500px;
    margin: auto auto;
}

.container-component {
    display: flex;
    justify-content: center;
    height: 100vh;
}
</style>