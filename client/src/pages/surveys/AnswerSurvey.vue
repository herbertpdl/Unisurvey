<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Responder questionário XXXXXX</h1>
          <card>
            <div
              v-for="(question, index) in surveyQuestions"
              :key="index"
              class="columns"
            >
              <div class="column is-6">
                <b-field :label="`${index+1}) ${question.statement}`">
                  <!-- Discursive question -->
                  <b-input v-if="question.type === 'discursive'" :name="`question-${index}`" />

                  <!-- Single answer question -->
                  <div v-else-if="question.type === 'multiple' && !question.checkMultiple">
                    <div 
                      v-for="(alternative, indexAlternative) in question.alternatives"
                      :key="indexAlternative"
                      class="field"
                    >
                      <b-radio :name="`question-${index}`">
                        {{ alternative }}
                      </b-radio>
                    </div>
                  </div>

                  <!-- Multiple answer question -->
                  <div v-else>
                    <div 
                      v-for="(alternative, indexAlternative) in question.alternatives"
                      :key="indexAlternative"
                      class="field"
                    >
                      <b-checkbox :name="`question-${index}`">
                        {{ alternative }}
                      </b-checkbox>
                    </div>
                  </div>
                </b-field>
              </div>
              <hr>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getQuestions } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'answer-survey',
  components: {
    Card
  },
  data() {
    return {
      surveyQuestions: [],
    }
  },
  mounted() {
    this.$store.commit('loading', true)
    getQuestions()
      .then(resp => {
        this.surveyQuestions = resp;
        this.$store.commit('loading', false)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>