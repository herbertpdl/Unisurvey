<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Cadastro de Pergunta</h1>

          <card>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Enunciado">                  
                  <b-input v-model="statement" placeholder="Ex: O professor apresentou o plano de ensino?" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Tipo">                  
                  <b-select
                    expanded
                    v-model="type"
                    placeholder="Selecione"
                  >
                    <option value="discursive">Discursiva</option>
                    <option value="multiple">Múltipla Escolha</option>
                  </b-select>
                </b-field>
              </div>
            </div>

            <!-- Show if multiple -->
            <transition name="fade">
              <div v-if="showAlternativesBox">
                <div class="columns">
                  <div class="column is-6">
                    <p class="margin-bottom-1">Deseja permitir que o usuário selecione mais de uma opção?</p>
                    <div class="field">
                        <b-switch 
                          v-model="checkMultiple"
                          true-value="Sim"
                          false-value="Não"
                        >
                          {{ checkMultiple }}
                        </b-switch>
                    </div>
                  </div>
                </div>

                <!-- Add alternative -->
                <label class="label">Alternativas</label>
                <div class="columns">
                  <div class="column is-6">
                    <b-input v-model="description" />
                  </div>
                  <div class="column is-1">
                    <b-button 
                      v-if="alternatives.length < 20"
                      type="is-success" 
                      icon-right="plus"
                      v-on:click="addAlternative"
                    />
                  </div>
                </div>

                <!-- Alternatives list -->
                <div 
                  v-for="(alternative, index) in alternatives" 
                  :key="index"
                  class="columns"
                >
                  <div class="column is-5">
                    <p>{{ index+1 }}) {{ alternative }}</p>              
                  </div>
                  <div class="column is-1">
                    <b-button
                      size="is-small"
                      type="is-danger" 
                      icon-right="delete"
                      v-on:click="deleteAlternative(index)"
                    />
                  </div>
                </div>
              </div>
            </transition>

            <div class="align-buttons--right">
              <b-button type="is-primary">
                Enviar
              </b-button>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from  '@/components/Card'

export default {
  name: 'register-querstion',
  components: {
    Card,
  },
  data () {
    return{
      statement: null,
      type: null,
      checkMultiple: 'Não',
      alternatives: [],
      description: null,
      showAlternativesBox: false,
    }
  },
  watch: {
    type: function(newValue) {
      newValue === 'multiple' ? this.showAlternativesBox = true : this.showAlternativesBox = false;
    }
  },
  methods: {
    addAlternative() {
      if (this.description !== null) {
        this.alternatives.push(this.description)
        this.description = null
      } else {
        this.empty()
      }
    },
    deleteAlternative(index) {
      this.alternatives.splice(index, 1)
    },
    empty() {
      this.$buefy.toast.open({
        duration: 3000,
        message: `Você não pode adicionar uma alternativa vazia`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>