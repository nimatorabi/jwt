<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import axios from "axios";
// export default {
//   created: function() {
//     axios.interceptors.response.use(undefined, function(err) {
//       return new Promise(function(resolve) {
//         if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
//           this.$store.dispatch("logout");
//           resolve();
//         }
//         throw err;
//       });
//     });
//   }
// };
export default {
  created: function() {}
};
</script>

<style>
#app {
  width: 960px;
  margin: 1rem auto;
}
</style>
