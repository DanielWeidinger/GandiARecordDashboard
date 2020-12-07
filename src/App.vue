<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">A Records for htl.link</b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template> 

<script>
import { BNavbar, BNavbarBrand} from 'bootstrap-vue'

export default {
  components: {
    BNavbar,
    BNavbarBrand
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
