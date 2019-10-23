<template>
  <section class="section">
      <div class="container">
        <div class="columns">
        <div class="column is-12">
          <h1 class="title">Lista de Cursos</h1>
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
            :data="courseList"
            :per-page="perPage"
            paginated
            striped
            hoverable
          >
            <template slot-scope="props">
                  <b-table-column label="Nome do Curso">
                      {{ props.row.name }}
                  </b-table-column>

                  <b-table-column label="Período">
                      {{ props.row.period }}
                  </b-table-column>

                  <b-table-column label="Visualizar" centered width="65">
                      <b-button
                        type="is-info"
                        tag="router-link"
                        icon-right="magnify"
                        :to="`course/${props.row.id}/view`"
                      />
                  </b-table-column>

                  <b-table-column label="Editar" centered width="65">
                      <b-button
                        type="is-primary"
                        tag="router-link"
                        icon-right="pencil"
                        :to="`course/${props.row.id}/edit`"
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
import { getCourses, deleteCourse } from '@/services/api'

export default {
  name: 'courses-list',
  data() {
    return {
      courseList: [],
      perPage: 10,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    this.loadData()
  },
  methods: {
    loadData() {
      getCourses()
        .then(resp => {
          this.courseList = resp
          this.$store.commit('loading', false)
        })
        .catch(e => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Houve um erro ao buscar a lista de cursos, tente novamente mais tarde.`,
            position: 'is-bottom',
            type: 'is-danger'
          })
          this.$store.commit('loading', false)
        })
    },
    confirmRemove(id) {
      this.$buefy.dialog.confirm({
        title: 'Deletar curso',
        message: 'Tem certeza que quer deletar este curso? Esta ação não pode ser desfeita.',
        confirmText: 'Deletar curso',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(id)
      })
    },
    remove(id) {
      this.$store.commit('loading', true)
      
      deleteCourse(id)
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
        message: 'Curso excluído com sucesso!',
        position: 'is-bottom',
        type: 'is-success'
      })
    },
    error() {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Houve um erro ao tentar remover o curso!',
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>