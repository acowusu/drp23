<template>
  <div>
    <n-form label-placement="top" class="thin-container">
      <n-form-item label="Email">
        <n-input v-model:value="email" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="updateEmail(email)">Save</n-button>
      </n-form-item>
      <n-form-item>
        <n-button type="warning" @click="reset">reset</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { NInput, NButton, NForm, NFormItem } from "naive-ui";
import { mapActions } from "vuex";

export default defineComponent({
  name: "AccountView",
  components: {
    NInput,
    NButton,
    NForm,
    NFormItem,
  },
  data() {
    return {
      email: this.$store.getters.Email,
      dev: process.env.NODE_ENV === "development",
    };
  },
  methods: {
    ...mapActions(["setEmail"]),
    updateEmail() {
      this.setEmail(this.email);
    },
    reset() {
      fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    },
  },
});
</script>
<style scoped>
.thin-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
