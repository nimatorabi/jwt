<template>
  <div>
    <a-form-model layout="inline" :model="formInline" @submit="login" @submit.native.prevent>
      <a-form-model-item>
        <a-input v-model="formInline.user" placeholder="نام کاربری">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="formInline.password" type="password" placeholder="رمز عبور">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
        >ورود</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      //   console.log(this.formInline);
      let form = {
        user: this.formInline.user,
        password: this.formInline.password
      };
      this.$store
        .dispatch("login", form)
        .then(() => this.$router.push("./dashboard"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
