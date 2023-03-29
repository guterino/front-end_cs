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
            <v-card-title class="title">Pedidos</v-card-title>
            <v-card-text class="content" v-if="(pedidos) && (pedidos.length > 0)">
                <v-row v-for="pedido in pedidos" :key="pedido.id">
                    <v-card width="550px" class="card-content">
                        <v-card-title>Pedido chave #{{ pedido.id }}</v-card-title>
                        <v-card-subtitle>Produto chave #{{ pedido.produtoId }}</v-card-subtitle>
                        <v-card-subtitle>Quantidade: {{ pedido.quantidade }}</v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="primary" @click="verProduto(pedido.produtoId)">
                                VER PRODUTO
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="red" @click="cancelar(pedido)">
                                CANCELAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>
            </v-card-text>
            <v-card-text v-else>
                <h2 class="empty">(vazio)</h2>
            </v-card-text>
            <div style="margin-bottom: 25px;">
                <ModalVerProduto :valor="exibirModal" :produto="produto" @fechar="exibirModal = false" />
            </div>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
import ModalVerProduto from '@/components/ModalVerProduto.vue';

export default {
    name: 'PedidosView',
    components: {
        ModalVerProduto,
    },
    data() {
        return {
            pedidos: [],
            produto: {},
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
        this.pedidos = this.getAllPedidos();
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        getAllPedidos() {
            axios.get("http://localhost:8080/api/pedido/all", {
                params: {
                    cliente_id: sessionStorage.getItem("clienteId")
                }
            })
                .then((response) => {
                    this.pedidos = response.data;
                }).catch((error) => {
                    this.feedback = error.response.data.mensagem;
                    this.snackbarCor = '';
                    this.snackbarBotaoCor = 'pink';
                    this.snackbar = true;
                });
        },
        cancelar(pedido) {
            axios.delete("http://localhost:8080/api/pedido/delete", {
                params: {
                    id: pedido.id
                }
            }).then(() => {
                this.feedback = 'Pedido removido com sucesso';
                this.snackbarCor = 'success';
                this.snackbarBotaoCor = 'white';
                this.snackbar = true;
                this.pedidos = this.getAllPedidos();
                this.forceRerender();
            })
                .catch((error) => {
                    this.feedback = error.response.data.mensagem;
                    this.snackbarCor = '';
                    this.snackbarBotaoCor = 'pink';
                    this.snackbar = true;
                });
        },
        verProduto(produtoId) {
            this.exibirModal = true;
            axios.get("http://localhost:8080/api/produto/one", {
                params: {
                    id: produtoId
                }
            }).then((response) => {
                this.produto = response.data;
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
