<template>
  <div id="app">
    <b-loading :is-full-page="true" :active.sync="loading" />
    <menu-header v-if="showMenu" />
    <router-view />
  </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader'
import Card from '@/components/Card'

export default {
  name: "app",
  components: {
    MenuHeader,
    Card,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    showMenu() {
      let show = null
      this.$route.path === '/' ? show = false : show =  true

      return show
    },
  },
};
</script>

<style lang="scss">
@import "./assets/styles/helpers.scss";
@import "./assets/styles/main.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
