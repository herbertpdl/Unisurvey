<template>
  <section class="section">
    <div class="container">
      <div v-if="matterData" class="columns">
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
            Disciplina alterada com sucesso!
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
            Houve um erro ao tentar salvar os dados da disciplina, verifique os dados digitados e tente novamente.
          </b-message>

          <h1 class="title">{{ matterData.name }}</h1>

          <card>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome da disciplina">
                    <b-input :disabled="!edit" v-model="matterData.name" placeholder="Ex: Matemática" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-2">
                <b-field label="Código da disciplina">
                    <b-input :disabled="!edit" v-model="matterData.code" placeholder="Ex: 5751" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Professor responsável">
                  <b-input 
                    v-if="!edit" 
                    disabled 
                    v-model="matterData.teacher_name" 
                  />
                  <b-select
                    v-else
                    v-model="matterData.teacher_id"
                    placeholder="Selecione"
                    expanded
                  >
                    <option
                      v-for="(teacher, index) in teachers"
                      v-bind:key="index"
                      v-bind:value="teacher.id
                      "
                    >
                      {{ teacher.name }}
                    </option>
                  </b-select>
                </b-field>
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
import { getMatter, updateMatter, getTeachers, getUser } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'view-matter',
  components: {
    Card
  },
  data() {
    return {
      matterData: null,
      edit: false,
      teachers: null,
      isSuccessActive: false,
      isErrorActive: false,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    getMatter(this.$route.params.id)
      .then(resp => {
        this.matterData = resp
        this.$store.commit('loading', false)  
      })

    if (this.$route.params.viewtype === 'edit') {
      this.enableEdit()
    }
  },
  methods: {
    enableEdit() {
      this.$store.commit('loading', true)
      getTeachers()
        .then(resp => {
          this.teachers = resp
          this.edit = true
          this.$store.commit('loading', false)
        })
    },
    save() {
      this.$store.commit('loading', true)
      getUser(this.matterData.teacher_id)
        .then(data => {
          updateMatter(
            this.matterData.id,
            {
              name: this.matterData.name,
              code: this.matterData.code,
              teacher_id: this.matterData.teacher_id,
              teacher_name: data.name,
            }).then(resp => {
                this.$store.commit('loading', false)
                this.isSuccessActive = true
              })
              .catch(err => {
                this.isErrorActive = true
                this.$store.commit('loading', false)
              })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>