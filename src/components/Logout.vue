<template>
  <div id="logout">
    <a-button type="danger" @click="logout">خروج</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>