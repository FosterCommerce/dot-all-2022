<script>
  export default {
    mounted() {
      console.log('It is loading changes');
    }
  }
</script>

<template>
  <div>
    <h1 class="mb-0 text-xl text-red-700 | header">Hello <span>World</span></h1>
    <p>Testing Nuxt Install Okay</p>
  </div>
</template>

<style lang="postcss" scoped>
  .header {
    margin-top: 20px;

    span {
      font-style: italic;
    }
  }
</style>