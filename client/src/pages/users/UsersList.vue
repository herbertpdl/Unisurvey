<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Lista de Usuários</h1>
          <b-select v-model="perPage">
              <option value="10">10 por página</option>
              <option value="15">15 por página</option>
              <option value="25">25 por página</option>
              <option value="50">50 por página</option>
          </b-select>
          <div class="align-buttons--right">
            <b-button type="is-primary">
              Novo
            </b-button>
          </div>
          <b-table
            :data="userList"
            :per-page="perPage"
            paginated
            striped
            hoverable
          >
          <template slot-scope="props">
                <b-table-column label="Nome">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column label="E-mail">
                    {{ props.row.email }}
                </b-table-column>

                <b-table-column label="Tipo">
                    {{ props.row.type }}
                </b-table-column>

                <b-table-column label="Visualizar" centered width="65">
                    <b-button
                      type="is-info"
                      tag="router-link"
                      icon-right="magnify"
                      :to="`user/${props.row.id}/view`"
                    />
                </b-table-column>

                <b-table-column label="Editar" centered width="65">
                    <b-button
                      type="is-primary"
                      tag="router-link"
                      icon-right="pencil"
                      :to="`user/${props.row.id}/edit`"
                    />
                </b-table-column>

                <b-table-column label="Excluir" centered width="65" >
                    <b-button
                      type="is-danger"
                      icon-right="delete"
                      v-on:click="confirmRemove(props.row.id)"
                    />
                </b-table-column>
          </template>
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUsers, deleteUser } from '@/services/api'

export default {
  name: 'users-list',
  data() {
    return {
      userList: [],
      perPage: 10,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    this.loadUsers()
  },
  methods: {
    loadUsers() {
      getUsers()
        .then(resp => {
          console.log(resp)
          this.userList = resp
          this.$store.commit('loading', false)
        })
        .catch(e => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Houve um erro ao buscar a lista de usuários, tente novamente mais tarde.`,
            position: 'is-bottom',
            type: 'is-danger'
          })
          this.$store.commit('loading', false)
        })
    },
    confirmRemove(id) {
      this.$buefy.dialog.confirm({
        title: 'Deletar usuário',
        message: 'Tem certeza que quer deletar este usuário? Esta ação não pode ser desfeita.',
        confirmText: 'Deletar usuário',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(id)
      })
    },
    remove(id) {
      this.$store.commit('loading', true)
      
      deleteUser(id)
        .then(resp => {
          this.loadUsers()
          this.success()
          this.$store.commit('loading', false)
        })
        .catch(e => {
          this.$store.commit('loading', false)
          this.error()
        })
    },
    success() {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Usuário removido com sucesso!',
        position: 'is-bottom',
        type: 'is-success'
      })
    },
    error() {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Houve um erro ao tentar remover o usuário!',
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>