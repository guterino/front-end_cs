<template>
    <v-app style="background-color: #DBD7D2;">
        <v-app-bar app v-if="autenticado == 'true'" :key="componentKey">
            <v-btn color="primary" @click="irParaInicio()">INÍCIO</v-btn>
            <v-btn color="primary" @click="irParaPedidos()">PEDIDOS</v-btn>
            <v-btn color="primary" @click="irParaCompras()">COMPRAS</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="logout()">SAIR</v-btn>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            componentKey: 0,
            autenticado: sessionStorage.getItem("autenticado")
        }
    },
    mounted() {
        window.addEventListener('autenticacao', (event) => {
            this.autenticado = event.detail.storage;
        });
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        logout() {
            this.$router.push('/');
            sessionStorage.setItem("autenticado", false);
            window.dispatchEvent(new CustomEvent('autenticacao', {
                detail: {
                    storage: sessionStorage.getItem('autenticado')
                }
            }));
            this.forceRerender();
        },
        irParaInicio() {
            this.$router.push('/home');
        },
        irParaPedidos() {
            this.$router.push('/pedidos');
        },
        irParaCompras() {
            this.$router.push('/compras');
        },
    }
}
</script>
