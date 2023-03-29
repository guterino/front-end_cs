<template>
    <v-row justify="center">
        <v-dialog v-model="exibir" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Ver produto</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-img :src="foto" height="150" width="250"
                                    style="background-color: lightgrey;"></v-img>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field readonly v-model="nome" label="Nome"></v-text-field>
                                <v-text-field readonly v-model="valorProduto" label="Valor"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field readonly v-model="marca" label="Marca"></v-text-field>
                                <v-text-field readonly v-model="modelo" label="Modelo"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field readonly v-model="estoque" label="Estoque"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="8">
                                <v-text-field readonly v-model="status" label="Status do produto"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field readonly v-model="fornecedorId" label="Chave fornecedor"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" variant="text" @click="this.$emit('fechar')">
                        FECHAR
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: {
        valor: Boolean,
        produto: Object
    },
    computed: {
        exibir: {
            get() {
                return this.valor;
            },
            set(valor) {
                this.$emit('fechar', valor);
            }
        },
        id: {
            get() {
                return this.produto.id;
            }
        },
        nome: {
            get() {
                return this.produto.nome;
            }
        },
        foto: {
            get() {
                return this.produto.foto;
            }
        },
        marca: {
            get() {
                return this.produto.marca;
            }
        },
        modelo: {
            get() {
                return this.produto.modelo;
            }
        },
        valorProduto: {
            get() {
                return this.produto.valor;
            }
        },
        estoque: {
            get() {
                return this.produto.estoque;
            }
        },
        fornecedorId: {
            get() {
                return this.produto.fornecedorId;
            }
        },
        status: {
            get() {
                return this.produto.status;
            }
        }
    },
    data: () => ({
    })
}
</script>