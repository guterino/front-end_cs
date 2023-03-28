<template>
  <v-app>
    <v-main>
      <LoginComponent/>
    </v-main>
  </v-app>
</template>

<script>
import LoginComponent from './components/LoginComponent.vue'

export default {
  name: 'App',

  components: {
    LoginComponent,
  },

  data: () => ({
    //
  }),
}
</script>
