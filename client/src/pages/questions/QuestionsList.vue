<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Lista de Perguntas</h1>
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
            :data="questionList"
            :per-page="perPage"
            paginated
            striped
            hoverable
          >
          <template slot-scope="props">
                <b-table-column label="Enunciado">
                    {{ props.row.statement }}
                </b-table-column>

                <b-table-column label="Tipo">
                    {{ props.row.type }}
                </b-table-column>

                <b-table-column label="Visualizar" centered width="65">
                    <b-button
                      type="is-info"
                      tag="router-link"
                      icon-right="magnify"
                      :to="`question/${props.row.id}/view`"
                    />
                </b-table-column>

                <b-table-column label="Editar" centered width="65">
                    <b-button
                      type="is-primary"
                      tag="router-link"
                      icon-right="pencil"
                      :to="`question/${props.row.id}/edit`"
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
import { getQuestions, deleteQuestion } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'questions-list',
  components: {
    Card,
  },
  data() {
    return {
      questionList: [],
      perPage: 10,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    this.loadQuestions()
  },
  methods: {
    loadQuestions() {
      getQuestions()
        .then(resp => {
          this.questionList = resp
          this.$store.commit('loading', false)
        })
    },
    confirmRemove(id) {
      this.$buefy.dialog.confirm({
        title: 'Deletar pergunta',
        message: 'Tem certeza que quer deletar esta pergunta? Esta ação não pode ser desfeita.',
        confirmText: 'Deletar pergunta',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(id)
      })
    },
    remove(id) {
      this.$store.commit('loading', true)
      
      deleteQuestion(id)
        .then(resp => {
          this.loadQuestions()
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
        message: 'Pergunta deletada com sucesso!',
        position: 'is-bottom',
        type: 'is-success'
      })
    },
    error() {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Houve um erro ao tentar deletar a pergunta!',
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>