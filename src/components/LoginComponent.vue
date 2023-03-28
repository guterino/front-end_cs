<template>
    <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarCor">
        {{ feedback }}
        <template v-slot:actions>
            <v-btn :color="snackbarBotaoCor" variant="text" @click="snackbar = false">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>
    <v-container>
        <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-text-field v-model="email" label="Email"></v-text-field>
                <v-text-field v-model="senha" label="Senha" type="password"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="login">Login</v-btn>
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
            snackbar: false,
            snackbarCor: '',
            snackbarBotaoCor: 'pink',
            feedback: ''
        }
    },
    mounted() {
        sessionStorage.setItem("autenticado", false);
    },
    methods: {
        login() {
            axios.post('http://localhost:8080/api/usuario/login', {
                email: this.email,
                senha: this.senha
            })
                .then(() => {
                    this.feedback = 'Autenticado com sucesso';
                    this.snackbarCor = 'success';
                    this.snackbarBotaoCor = 'white';
                    this.snackbar = true;
                    sessionStorage.setItem("autenticado", true);
                })
                .catch(error => {
                    this.feedback = error.response.data.mensagem;
                    this.snackbarCor = '';
                    this.snackbarBotaoCor = 'pink';
                    this.snackbar = true;
                    sessionStorage.setItem("autenticado", false);
                });
        }
    }
}
</script>
  