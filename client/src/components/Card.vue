<template>
  <div class="card--container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'card',
}
</script>

<style lang="scss">
  .card--container {
    position: relative;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 6px;
    background-color: #ffffff;
  }
</style>