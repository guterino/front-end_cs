<template>
    <v-row justify="center">
        <v-dialog v-model="exibir" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Nota fiscal</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field readonly v-model="id" label="Chave venda"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field readonly v-model="nome" label="Produto" hint="nome do produto"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field readonly v-model="quantidade" label="Quantidade"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field readonly v-model="nomeCliente" label="Nome do cliente"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field readonly v-model="nomeFornecedor" label="Nome do fornecedor"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field readonly v-model="cpfCliente" label="CPF do cliente"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field readonly v-model="cnpjFornecedor" label="CNPJ do fornecedor"></v-text-field>
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
        notaFiscal: Object
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
                return this.notaFiscal.id;
            }
        },
        nome: {
            get() {
                return this.notaFiscal['nome_produto'];
            }
        },
        quantidade: {
            get() {
                return this.notaFiscal['quantidade_produto'];
            }
        },
        nomeFornecedor: {
            get() {
                return this.notaFiscal['nome_fornecedor']
            }
        },
        nomeCliente: {
            get() {
                return this.notaFiscal['nome_cliente'];
            }
        },
        cpfCliente: {
            get() {
                return this.notaFiscal['cpf_cliente'];
            }
        },
        cnpjFornecedor: {
            get() {
                return this.notaFiscal['cnpj_fornecedor'];
            }
        }
    },
    data: () => ({
    })
}
</script>