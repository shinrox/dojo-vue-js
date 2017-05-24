<template>
  <div id="app">
    <router-view></router-view>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '/styles/main.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
