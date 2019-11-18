<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Visualizar relatório</h1>
          <transition name="fade" mode="out-in">
            <card key="select-survey" v-if="!proceed">
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Tipo do questionário">
                    <b-select expanded placeholder="selecione" @input="getSurveys">
                      <option value="1">Aluno avalia professor</option>
                      <option value="2">Aluno avalia instituição</option>
                      <option value="3">Professor avalia instituição</option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div v-if="surveyList.length > 0" class="columns">
                <div class="column is-6">
                  <b-field label="Questionário">
                    <b-select expanded placeholder="selecione o questionario" @change.native="setSelectedSurvey">
                      <option
                        v-for="(survey, index) in surveyList"
                        :key="index"
                        :value="index"
                      >
                        {{ survey.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div v-if="selectedSurvey !== null" class="align-buttons--right">
                <b-button type="is-primary" v-on:click="proceed = true">
                  Prosseguir
                </b-button>
              </div>
            </card>
            
            <card key="answer-chart" ref="content" v-else>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Selecione a pergunta desejada">
                    <b-select
                      expanded
                      placeholder="selecione"
                      @change.native="setSelectedQuestion"
                    >
                      <option
                        v-for="(question, indexQuestion) in selectedSurvey.questions"
                        :key="indexQuestion"
                        :value="indexQuestion"
                      >
                        {{ question.statement }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column is-2">
                  <button @click="downloadWithCSS">Download PDF</button>
                </div>
              </div>

              <p class="margin-bottom-1"><strong>Respostas:</strong></p>
              <div v-if="selectedQuestion && showChart">
                <p v-for="(answer, index) in answerCounter" v-bind:key="index">
                  <strong>{{ answer.description }}</strong>: {{ answer.count }} - {{ percentage(answer.count, totalAnswers) }}%
                </p>
              </div>
              <!-- Chart data -->
              <bar-chart v-if="chartdata !== null && showChart" :chart-data="chartdata" :options="options"/>

              <!-- Discursive answers -->
              <div v-if="discursiveAnswers.length !== 0 && showDiscursive">
                <b-select v-model="perPage">
                    <option value="10">10 por página</option>
                    <option value="15">15 por página</option>
                    <option value="25">25 por página</option>
                    <option value="50">50 por página</option>
                </b-select>
                <b-table
                  :data="discursiveAnswers"
                  :per-page="perPage"
                  paginated
                  striped
                  hoverable
                >
                  <template slot-scope="props">
                    <b-table-column>
                      {{ props.row.answer }}
                    </b-table-column>
                  </template>
                </b-table>
              </div>
            </card>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getSurveysByType ,getAnswersBySurveyQuestion } from '@/services/api'
import jsPDF from 'jspdf' 
import html2canvas from "html2canvas"

import Card from  '@/components/Card'
import BarChart from '@/components/ChartBar.js'

export default {
  name: 'get-report',
  components: {
    Card,
    BarChart,
  },
  data() {
    return {
      surveyList: [],
      selectedSurvey: null,
      selectedQuestion: null,
      proceed: false,
      chartColors: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      chartdata: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      answerCounter: null,
      discursiveAnswers: [],
      showDiscursive: false,
      showChart: false,
      perPage: 10,
      totalAnswers: 0,
    }
  },
  methods: {
    percentage(val, total) { 
      return ((val * 100) / total).toFixed(2)
    },
    getSurveys(e) {
      this.$store.commit('loading', true)
      getSurveysByType(e)
        .then(resp => {
          this.surveyList = resp
          this.$store.commit('loading', false)
        })
        .catch(e => {
          console.log(e)
          this.$store.commit('loading', false)
        })
    },
    setSelectedSurvey(event) {
      this.selectedSurvey = this.surveyList[event.target.value]
    },
    setSelectedQuestion(event) {
      this.selectedQuestion = this.selectedSurvey.questions[event.target.value]

      this.getAnswers()
    },
    getAnswers() {
      this.$store.commit('loading', true)
      getAnswersBySurveyQuestion(this.selectedSurvey.id, this.selectedQuestion.id)
        .then(resp => {
          this.$store.commit('loading', false)
          // count how many times the value appers
          let alternatives = []

          // get occurrence in multiple choice(single answer) question
          if (this.selectedQuestion.type === 'multiple' && !this.selectedQuestion.allow_multiple) {
            this.selectedQuestion.alternatives.map(el => {
              let counter = this.getOccurrence(resp, el.description)
              alternatives.push({
                description: el.description,
                count: counter,
              })
            })

            this.answerCounter = alternatives
            this.totalAnswers = this.answerCounter.reduce((a, b) => a + b.count, 0)
            this.updateChart(alternatives)
            this.showChart = true
            this.showDiscursive = false
          } else if (this.selectedQuestion.type === 'multiple' && this.selectedQuestion.allow_multiple) {
            // get occurrence in multiple choice(multiple answer) question

            let alternativesMultiple = {}
            resp.map(el => {
              this.selectedQuestion.alternatives.map(alternative => {
                if (alternativesMultiple[alternative.description] == undefined) {
                  alternativesMultiple[alternative.description] = 0
                }

                if (el.answer.includes(alternative.description)) {
                  alternativesMultiple[alternative.description] += 1 
                }
              })
            })

            // transform answers object in array
            alternativesMultiple = Object.keys(alternativesMultiple).map(el => {
              return  {
                description: el,
                count: alternativesMultiple[el]
              }
            })

            this.answerCounter = alternativesMultiple
            this.totalAnswers = this.answerCounter.reduce((a, b) => a + b.count, 0)
            this.updateChart(alternativesMultiple)
            this.showChart = true
            this.showDiscursive = false
          } else {
            // discursive question answers

            this.discursiveAnswers = resp
            this.showChart = false
            this.showDiscursive = true
          }
          
        })
        .catch(e => {
          console.log(e)
          this.$store.commit('loading', false)
        })
    },
    getOccurrence(array, value, multiple) {
      let total

      if (multiple) {
        total = array.filter((v) => (v === value)).length;
      } else {
        total = array.filter((v) => (v.answer === value)).length;
      }

      return total
    },
    updateChart(values) {
      let datasets = []

      values.map((el, index) => {
        datasets.push({
          label: [el.description],
          backgroundColor: [this.chartColors[index]],
          data: [el.count]
        })
      })

      this.chartdata = {
        labels: [this.selectedQuestion.statement],
        datasets: datasets,
      }
    },
    download() {
      console.log('teste')
      const doc = new jsPDF();
      const contentHtml = this.$refs.content.innerHTML;
      doc.fromHTML(contentHtml, 15, 15, {
        width: 170
      });
      doc.save("sample.pdf");
    },

    downloadWithCSS() {
      const doc = new jsPDF();
      /** WITH CSS */
      var canvasElement = document.createElement('canvas');
        html2canvas(this.$refs.content, { canvas: canvasElement 
          }).then(function (canvas) {
        const img = canvas.toDataURL("image/jpeg", 0.8);
        doc.addImage(img,'JPEG',20,20);
        doc.save("sample.pdf");
      });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>