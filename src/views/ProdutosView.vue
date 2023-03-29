<template>
    <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarCor">
        {{ feedback }}
        <template v-slot:actions>
            <v-btn :color="snackbarBotaoCor" variant="text" @click="snackbar = false">
                Fechar
            </v-btn>
        </template>
    </v-snackbar>
    <v-container :key="componentKey">
        <v-card class="page">
            <v-card-title class="title">Produtos disponíveis</v-card-title>
            <v-card-text class="content" v-if="(produtos) && (produtos.length > 0)">
                <v-row v-for="produto in produtos" :key="produto.id">
                    <v-card width="400px" class="card-content">
                        <v-img :src="produto.foto" height="200" width="400" style="background-color: lightgrey;"></v-img>
                        <v-card-title>{{ produto.nome }}</v-card-title>
                        <v-card-subtitle>{{ produto.marca }}</v-card-subtitle>
                        <v-card-subtitle>{{ produto.modelo }}</v-card-subtitle>
                        <v-card-subtitle>Estoque: {{ produto.estoque }} un.</v-card-subtitle>
                        <v-card-text>R$ {{ produto.valor }}</v-card-text>
                        <v-card-actions>
                            <v-btn :disabled="botaoDisabled" color="primary" @click="abrirModal(produto)">
                                COMPRAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>
            </v-card-text>
            <v-card-text v-else>
                <h2 class="empty">(vazio)</h2>
            </v-card-text>
            <div style="margin-bottom: 25px;">
                <ModalComprarProduto :valor="exibirModal" @fechar="exibirModal = false" @comprar="comprar($event)" />
            </div>
        </v-card>
    </v-container>
</template>

<script>
import ModalComprarProduto from '@/components/ModalComprarProduto.vue';
import axios from 'axios';

export default {
    name: 'HomeView',
    components: {
        ModalComprarProduto
    },
    data() {
        return {
            produtos: [],
            produtoSelecionado: {},
            componentKey: 0,
            exibirModal: false,
            feedback: '',
            snackbar: false,
            snackbarCor: '',
            snackbarBotaoCor: 'pink',
            botaoDisabled: false
        }
    },
    mounted() {
        const autenticado = sessionStorage.getItem("autenticado");
        if (!autenticado || autenticado == 'false') {
            this.$router.push('/');
        }
        this.produtos = this.getAllProdutos();
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        getAllProdutos() {
            axios.get("http://localhost:8080/api/produto/disponiveis")
                .then((response) => {
                    this.produtos = response.data;
                }).catch((error) => {
                    this.feedback = error.response.data.mensagem;
                    this.snackbarCor = '';
                    this.snackbarBotaoCor = 'pink';
                    this.snackbar = true;
                });
        },
        abrirModal(produto) {
            this.exibirModal = true;
            this.produtoSelecionado = produto;
        },
        comprar(quantidade) {
            axios.post('http://localhost:8080/api/pedido', {
                quantidade: quantidade,
                produtoId: this.produtoSelecionado.id,
                clienteId: sessionStorage.getItem("clienteId"),
            }).then(() => {
                this.exibirModal = false;
                this.feedback = 'Pedido criado com sucesso';
                this.snackbarCor = 'success';
                this.snackbarBotaoCor = 'white';
                this.snackbar = true;
            }).catch((error) => {
                this.feedback = error.response.data.mensagem;
                this.snackbarCor = '';
                this.snackbarBotaoCor = 'pink';
                this.snackbar = true;
            }).finally(() => {
                this.botaoDisabled = false;
                this.getAllProdutos();
                this.forceRerender();
            });
        }
    }
}
</script>

<style>
.card-content {
    margin-top: 0px;
    margin-bottom: 50px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    margin-bottom: 40px;
}

.page {
    width: 900px;
    margin: 0 auto;
}

.empty {
    color: lightgrey;
    text-align: center;
    margin-bottom: 25px;
}
</style>
