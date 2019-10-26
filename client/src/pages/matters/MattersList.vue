<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Lista de Disciplinas</h1>
          <b-select v-model="perPage">
              <option value="10">10 por página</option>
              <option value="15">15 por página</option>
              <option value="25">25 por página</option>
              <option value="50">50 por página</option>
          </b-select>
          <div class="align-buttons--right">
            <b-button type="is-primary"
              tag="router-link"
              :to="`register-matter`"
            >
              Novo
            </b-button>
          </div>
          <b-table
            :data="matterList"
            :per-page="perPage"
            paginated
            striped
            hoverable
          >
            <template slot-scope="props">
                  <b-table-column label="Nome da Disciplina">
                      {{ props.row.name }}
                  </b-table-column>

                  <b-table-column label="Professor Responsável">
                      {{ props.row.teacher_name }}
                  </b-table-column>

                  <b-table-column label="Visualizar" centered width="65">
                      <b-button
                        type="is-info"
                        tag="router-link"
                        icon-right="magnify"
                        :to="`matter/${props.row.id}/view`"
                      />
                  </b-table-column>

                  <b-table-column label="Editar" centered width="65">
                      <b-button
                        type="is-primary"
                        tag="router-link"
                        icon-right="pencil"
                        :to="`matter/${props.row.id}/edit`"
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
import { getMatters, deleteMatter } from '@/services/api'

export default {
  name: 'matters-list',
  data() {
    return {
      matterList: [],
      perPage: 10,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    this.loadData()
  },
  methods: {
    loadData() {
      getMatters()
        .then(resp => {
          this.matterList = resp
          this.$store.commit('loading', false)
        })
        .catch(e => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Houve um erro ao buscar a lista de disciplinas, tente novamente mais tarde.`,
            position: 'is-bottom',
            type: 'is-danger'
          })
          this.$store.commit('loading', false)
        })
    },
    confirmRemove(id) {
      this.$buefy.dialog.confirm({
        title: 'Deletar disciplina',
        message: 'Tem certeza que quer deletar esta disciplina? Esta ação não pode ser desfeita.',
        confirmText: 'Deletar disciplina',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(id)
      })
    },
    remove(id) {
      this.$store.commit('loading', true)
      
      deleteMatter(id)
        .then(resp => {
          this.loadData()
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
        message: 'Disciplina excluída com sucesso!',
        position: 'is-bottom',
        type: 'is-success'
      })
    },
    error() {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Houve um erro ao tentar remover a disciplina!',
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>