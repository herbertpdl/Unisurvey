<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Cadastro de Curso</h1>
          <b-message 
            v-if="!hasMatters"
            :closable="false"
            title="Você não tem nenhum professor cadastrado" 
            type="is-warning" 
            aria-close-label="Close message"
          >
            <p class="margin-bottom-1">Antes de cadastrar um curso, você precisa ter uma ou mais disciplinas cadastradas.</p>
            <p class="margin-bottom-2">Deseja cadastrar uma disciplina?</p>
              <b-button 
                tag="router-link"
                to="/register-matter"
                type="is-primary">
                Cadastrar disciplina
              </b-button>
          </b-message>
          <card v-else>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome do Curso">
                    <b-input v-model="name" placeholder="Ex: Matemática" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Período">
                  <b-select v-model="period" placeholder="Selecione">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class=" column is-6">
                <b-field label="Disciplinas">
                  <multiselect 
                    v-model="selectedMatters"
                    :options="matters"
                    :multiple="true"
                    :close-on-select="false"
                    searchable
                    track-by="name"
                    label="name"
                    placeholder="Selecione as disciplinas"
                  />
                </b-field>
              </div>
            </div>
            <div class="buttons">
              <b-button type="is-danger">
                Cancelar
              </b-button>
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
import { getMatters } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'register-course',
  components: {
    Card,
  },
  data() {
    return {
      name: '',
      matters: [],
      teacher: '',
      hasMatters: true,
      selectedMatters: [],
      period: null,
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Adonis', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ],
    }
  },
  mounted() {
    getMatters()
      .then((response) => {
        this.matters = response.data
        if(response.data.length > 0) {
          this.hasMatters = true;
        } else {
          this.hasMatters = false;
        }
      })
  }
}
</script>

<style lang="scss">

</style>