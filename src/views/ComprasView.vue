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
        <v-card class="page">
            <v-card-title class="title">Compras já realizadas</v-card-title>
            <v-card-text class="content" v-if="(vendas) && (vendas.length > 0)">
                <v-row v-for="venda in vendas" :key="venda.id">
                    <v-card width="550px" class="card-content">
                        <v-card-title>Venda chave #{{ venda.id }}</v-card-title>
                        <v-card-subtitle>Data: {{ venda.data }}</v-card-subtitle>
                        <v-card-subtitle>Pedido chave #{{ venda.pedidoId }}</v-card-subtitle>
                        <v-card-subtitle>Fornecedor chave #{{ venda.fornecedorId }}</v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="primary" @click="verNotaFiscal(venda.id)">
                                VER NOTA FISCAL
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>
            </v-card-text>
            <v-card-text v-else>
                <h2 class="empty">(vazio)</h2>
            </v-card-text>
            <div style="margin-bottom: 25px;">
                <ModalNotaFiscal :valor="exibirModal" :notaFiscal="notaFiscal" @fechar="exibirModal = false" />
            </div>
        </v-card>
    </v-container>
</template>

<script>
import ModalNotaFiscal from '@/components/ModalNotaFiscal.vue';
import axios from 'axios';

export default {
    name: 'ComprasView',
    components: {
        ModalNotaFiscal
    },
    data() {
        return {
            vendas: [],
            notaFiscal: {},
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
        this.vendas = this.getAllVendas();
    },
    methods: {
        getAllVendas() {
            axios.get("http://localhost:8080/api/venda/all/cliente", {
                params: {
                    cliente_id: sessionStorage.getItem("clienteId")
                }
            })
                .then((response) => {
                    this.vendas = response.data;
                }).catch((error) => {
                    this.feedback = error.response.data.mensagem;
                    this.snackbarCor = '';
                    this.snackbarBotaoCor = 'pink';
                    this.snackbar = true;
                });
        },
        verNotaFiscal(id) {
            this.exibirModal = true;
            axios.get(`http://localhost:3000/nota_fiscal/${id}`).then((response) => {
                this.notaFiscal = response.data;
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
