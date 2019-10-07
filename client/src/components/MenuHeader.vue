<template>
  <section>
    <div class="columns">
      <div class=" column is-12">
        <div class="header--cowrapper">
          <b-navbar type="is-primary">
            <template slot="start">
              <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
              <!-- Users -->
              <b-navbar-dropdown label="Usuários">
                <b-navbar-item tag="router-link" to="/register-user">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="/user-list">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Surveys -->
              <b-navbar-dropdown label="Questionários">
                <b-navbar-item tag="router-link" to="/register-survey">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Questions -->
              <b-navbar-dropdown label="Perguntas">
                <b-navbar-item tag="router-link" to="/register-question">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="/question-list">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Courses -->
              <b-navbar-dropdown label="Cursos">
                <b-navbar-item tag="router-link" to="/register-course">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Matters -->
              <b-navbar-dropdown label="Disciplinas">
                <b-navbar-item tag="router-link" to="/register-matter">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <b-navbar-item tag="router-link" to="">Relatório</b-navbar-item>
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
  </section>
</template>

<script>
export default {
  name: 'menu-header',
}
</script>

<style lang="scss" scoped>
</style>
