<template>
  <section class="section">
    <div class="container">
      <div v-if="questionData" class="columns">
        <div class="column is-12">
          <!-- Success Message -->
          <b-message 
            auto-close 
            has-icon
            title="Sucesso" 
            type="is-success"
            :active.sync="isSuccessActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Pergunta alterada com sucesso!
          </b-message>

          <!-- Error Message -->
          <b-message 
            auto-close 
            has-icon
            title="Sucesso" 
            type="is-danger"
            :active.sync="isErrorActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Houve um erro ao tentar salvar a pergunta, verifique os dados digitados e tente novamente.
          </b-message>

          <h1 class="title">{{ questionData.statement }}</h1>
          <card>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Enunciado">
                  <b-input :disabled="!edit" v-model="questionData.statement" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Tipo">
                  <b-select
                    expanded
                    :disabled="!edit"
                    v-model="questionData.type"
                    placeholder="Selecione"
                  >
                    <option value="discursive">Discursiva</option>
                    <option value="multiple">Múltipla Escolha</option>
                  </b-select>
                </b-field>
              </div>
            </div>

            <div v-if="questionData.type === 'multiple'" class="columns">
              <div class="column is-6">
                <p class="margin-bottom-1">Deseja permitir que o usuário selecione mais de uma opção?</p>
                <div class="field">
                    <b-switch 
                      :disabled="!edit"
                      v-model="questionData.checkMultiple"
                    >
                      {{ questionData.checkMultiple ? 'Sim' : 'Não' }}
                    </b-switch>
                </div>
              </div>
            </div>

            <label v-if="questionData.type === 'multiple'" class="label">Alternativas</label>
            <div v-if="questionData.type === 'multiple'" class="columns">
              <div class="column is-6">
                <b-input
                  :disabled="!edit"
                  v-model="description"
                  ref="alternative"
                  @keyup.native.enter="addAlternative"
                />
              </div>
              <div class="column is-1">
                <b-button
                  :disabled="!edit"
                  type="is-success"
                  icon-right="plus"
                  @click="addAlternative"
                />
              </div>
            </div>

            <div v-if="questionData.type === 'multiple'" class="columns">
              <div class="column is-6">
                <div class="b-table">
                  <table class="table is-striped">
                    <tr v-for="(alternative, index) in alternatives" :key="index">
                      <td width="100%">
                        <p>{{ index+1 }}) {{ alternative.description }}</p>
                      </td>
                      <td>
                        <b-button
                          :disabled="!edit"
                          size="is-small"
                          type="is-danger"
                          icon-right="delete"
                          @click="deleteAlternative(index)"
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="align-buttons--right">
              <div class="buttons">
                <b-button
                  v-if="!edit"
                  type="is-primary"
                  @click="enableEdit"
                >
                  Editar
                </b-button>
                <b-button v-else type="is-primary" @click="save">
                  Enviar
                </b-button>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getQuestion, updateQuestion, getAlternativesByQuestion } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'view-question',
  components: {
    Card
  },
  data() {
    return {
      questionData: null,
      edit: false,
      isSuccessActive: false,
      isErrorActive: false,
      description: null,
      alternatives: null,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    getQuestion(this.$route.params.id)
      .then(resp => {
        this.questionData = resp
        this.$store.commit('loading', false)  
      })

    getAlternativesByQuestion(this.$route.params.id)
      .then(resp => {
        this.alternatives = resp
      })

    if (this.$route.params.viewtype === 'edit') {
      this.enableEdit()
    }
  },
  methods: {
    enableEdit() {
      this.edit = true
    },
    addAlternative() {
      if (this.description !== null && this.alternatives.length < 5) {
        this.alternatives.push({description: this.description})
        this.description = null
        this.$refs.alternative.focus()
      } else if (this.description === null) {
        this.empty()
      } else {
        this.maximum()
      }
    },
    deleteAlternative(index) {
      this.alternatives.splice(index, 1)
    },
    save() {
      this.$store.commit('loading', true)
      updateQuestion(
        this.questionData.id,
        {
          statement: this.questionData.statement,
          type: this.questionData.type,
          checkMultiple: this.questionData.checkMultiple,
          alternatives: this.alternatives,
        }
      )
        .then(resp => {
          this.$store.commit('loading', false)
          this.$router.push("/question-list")
          this.isSuccessActive = true
        })
        .catch(err => {
          this.$store.commit('loading', false)
          this.isErrorActive = true
        })
    },
    empty() {
      this.$buefy.toast.open({
        duration: 3000,
        message: `Você não pode adicionar uma alternativa vazia`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
    maximum() {
      this.$buefy.toast.open({
        duration: 3000,
        message: `Você pode adicionar no máximo 5 alternativas`,
        position: 'is-bottom',
        type: 'is-warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>