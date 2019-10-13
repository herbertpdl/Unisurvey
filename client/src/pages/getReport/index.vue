<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Visualizar relatório</h1>
          <card>
            <div class="columns">
              <div class="column is-6">
                <b-select expanded placeholder="selecione">
                  <option value="">Aluno avalia professor</option>
                  <option value="">Aluno avalia instituição</option>
                  <option value="">Professor avalia instituição</option>
                </b-select>
              </div>
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
  name: 'get-report',
  components: {
    Card,
  }
}
</script>

<style lang="scss" scoped>

</style>