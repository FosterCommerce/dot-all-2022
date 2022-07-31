<script>
  import Header from "~/components/Header";
  export default {
    components: {Header},
    mounted() {
      console.log('It is loading changes');
    }
  }
</script>

<template>
  <div>
    <Header />
    <p>Testing Nuxt Install Okay</p>
  </div>
</template>
