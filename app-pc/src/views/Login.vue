<template>
  <div class="about">
    <h1 v-for="i in 100" :key="i">This is an login page {{i}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'login',
  };
</script>
