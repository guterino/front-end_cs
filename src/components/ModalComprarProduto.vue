<template>
    <v-row justify="center">
        <v-dialog v-model="exibir" persistent width="400">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Comprar produto</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field type="number" v-model="quantidade" label="Quantas unidades deseja comprar?" placeholder="Insira quantidade" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" variant="text" @click="comprar()">
                        COMPRAR
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red" variant="text" @click="this.$emit('fechar')">
                        CANCELAR
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
        estoque: Number
    },
    computed: {
        exibir: {
            get() {
                return this.valor;
            },
            set(valor) {
                this.$emit('fechar', valor);
            }
        }
    },
    data: () => ({
        quantidade: 0
    }),
    methods: {
        comprar() {
            this.$emit('comprar', this.quantidade);
        }
    }
}
</script>