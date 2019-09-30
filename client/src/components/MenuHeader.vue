<template>
    <div class="columns">
      <div class=" column is-12">
        <div class="header--cowrapper">
          <b-navbar type="is-primary">
            <template slot="start">
              <b-navbar-item href="#">Home</b-navbar-item>
              <b-navbar-item href="#">Usuários</b-navbar-item>
              <b-navbar-item href="#">Questionários</b-navbar-item>
              <b-navbar-item href="#">Perguntas</b-navbar-item>
              <b-navbar-item href="#">Cursos</b-navbar-item>
              <b-navbar-item href="#">Disciplinas</b-navbar-item>
              <b-navbar-item href="#">Relatório</b-navbar-item>
            </template>

            <template slot="end">
              <b-navbar-item tag="div">
                <b-button type="is-primary">
                  Sair
                </b-button>
              </b-navbar-item>
            </template>
          </b-navbar>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'menu-header',
}
</script>

<style lang="scss" scoped>

</style>
