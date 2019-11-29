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
                <b-button type="is-primary" @click="proceed = true">
                  Prosseguir
                </b-button>
              </div>
            </card>
            
            <div key="answer-chart" v-else  ref="content">
              <card>
                <div class="columns">
                  <div class="column is-6">
                    <b-field label="Selecione a pergunta desejada">
                      <b-select
                        expanded
                        placeholder="selecione"
                        @change.native="setSelectedQuestion"
                      >
                        <option value="allQuestions">Mostrar todas</option>
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
                    <b-button type="is-primary" icon-right="printer" @click="print">Imprimir</b-button>
                  </div>
                </div>

                <p class="show-print title" v-if="selectedSurvey"><strong>{{ selectedSurvey.name }}</strong></p>
                <p class="margin-bottom-1"><strong>Respostas:</strong></p>
                <div v-if="selectedQuestion && showChart">
                  <p v-for="(answer, index) in answerCounter" v-bind:key="index">
                    <strong>{{ answer.description }}</strong>: {{ answer.count }} - {{ percentage(answer.count, totalAnswers) }}%
                  </p>
                </div>
                <!-- Chart data -->
                <bar-chart
                  v-if="chartdata !== null && showChart && !showAllChart && !chartdata.allow_multiple"
                  :chart-data="chartdata.data"
                  :options="options"
                />

                <doughnut-chart
                  v-else-if="chartdata !== null && showChart"
                  :chart-data="chartdata.data"
                  :options="options"
                />

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

                <!-- Render chart off al questions -->
                <div v-if="chartDataAll.length > 0 && !showChart && showAllChart">
                  <div v-for="(data, index) in chartDataAll" :key="index" class="margin-bottom-2">
                    <label class="label">{{ selectedSurvey.questions[index].statement }}</label>
                    <bar-chart
                      v-if="!data.allow_multiple"
                      :key="index"
                      :chart-data="data.data" :options="options"
                    />

                    <doughnut-chart
                      v-else
                      :key="index"
                      :chart-data="data.data"
                      :options="options"
                    />

                  </div>
                </div>
              </card>
            </div>
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
import DoughnutChart from '@/components/ChartPie.js'

export default {
  name: 'get-report',
  components: {
    Card,
    BarChart,
    DoughnutChart
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
      chartDataAll: [],
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
      allDiscursiveAnswers: [],
      showDiscursive: false,
      showChart: false,
      showAllChart: false,
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
      if (event.target.value === 'allQuestions') {
        this.getAllAnswers()
      } else {
        this.selectedQuestion = this.selectedSurvey.questions[event.target.value]
        this.getAnswers(this.selectedSurvey, this.selectedQuestion, 'single')
      }
    },
    getAllAnswers() {
      this.chartDataAll = []

      this.selectedSurvey.questions.map(el => {
        this.getAnswers(this.selectedSurvey, el, 'all')
      })

      this.showChart = false
      this.showAllChart = true
    },
    getAnswers(survey, question, type) {
      this.$store.commit('loading', true)
      getAnswersBySurveyQuestion(survey.id, question.id)
        .then(resp => {
          this.$store.commit('loading', false)
          let alternatives = []

          // get occurrence in multiple choice(single answer) question
          if (question.type === 'multiple' && !question.allow_multiple) {
            question.alternatives.map(el => {
              let counter = this.getOccurrence(resp, el.description)
              alternatives.push({
                description: el.description,
                count: counter,
              })
            })

            this.answerCounter = alternatives
            this.totalAnswers = this.answerCounter.reduce((a, b) => a + b.count, 0)

            this.updateChart(alternatives, type, question)
            // 
            if (type === 'single') {
              this.showChart = true
              this.showAllChart = false
              this.showDiscursive = false
            } 
          } else if (question.type === 'multiple' && question.allow_multiple) {

            // get occurrence in multiple choice(multiple answer) question
            let alternativesMultiple = {}
            resp.map(el => {
              question.alternatives.map(alternative => {
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
            this.updateChart(alternativesMultiple, type, question)

            if (type === 'single') {
              this.showChart = true
              this.showDiscursive = false
            }
          } else {
            // discursive question answers

            if(type === 'single') {
              this.discursiveAnswers = resp
              this.showChart = false
              this.showDiscursive = true
            } else {
              this.allDiscursiveAnswers.push(resp)
            }
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
    updateChart(values, type, question) {
      let datasets = []
      let singleDataset = []
      let chartLabels = null
      let multipleData = null
      let multipleColors = []

      values.map((el, index) => {
        datasets.push({
          label: [el.description],
          backgroundColor: [this.chartColors[index]],
          data: [el.count]
        })
      })

      console.log(values)

      //set labels if chart is multiplechoice
      if (question.allow_multiple) {
        chartLabels = values.map(el => {
          return el.description
        })

        multipleData = values.map((el, index) => {
          multipleColors.push(this.chartColors[index])
          return el.count
        })
      }

      console.log(multipleData)

      if (type === 'single') {
        this.chartdata = {
          allow_multiple: this.selectedQuestion.allow_multiple,
          data: {
            labels: chartLabels || [this.selectedQuestion.statement],
            datasets: question.allow_multiple ? [{
              data: multipleData,
              backgroundColor: multipleColors,
            }] : datasets,
          }
        }
      } else {
        this.chartDataAll.push({
          allow_multiple: question.allow_multiple,
          data: {
            labels: chartLabels || [question.statement],
            datasets: question.allow_multiple ? [{
              data: multipleData,
              backgroundColor: multipleColors,
            }] : datasets,
          }
        })
      }

      this.showDiscursive = false;

      console.log(this.chartdata)
      
    },
    print() {
      window.print();
    }
  }
}
</script>

<style lang="scss" scoped>
  .show-print {
    display: none;
  }

  @media print {
    .title, button,
    .field {
      display: none;
    }
    .card--container {
      border: 0;
    }
    .show-print {
      display: block!important;
    }
  }
</style>