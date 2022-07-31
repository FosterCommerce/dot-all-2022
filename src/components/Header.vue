<script>
  export default {
    name: "Header"
  }
</script>

<template>
  <h1 class="mb-0 text-xl text-red-700 | header">Hello <span>World</span></h1>
</template>

<style lang="postcss" scoped>
  .header {
    margin-top: 20px;

    span {
      font-style: italic;
    }
  }
</style>