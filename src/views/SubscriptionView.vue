<template>
  <div class="home">
    <ul class="results">
      <li v-for="item in items" :key="item">
        {{ item }}
        <button @click="remove(item)">Unsubscribe</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchView",
  components: {},
  methods: {
    onPageChange() {
      window.scrollTo(0, 0);
    },
    async getList() {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email }),
      };

      await fetch("/api/subscriptions", options)
        .then((response) => response.json())
        .then((response) => (this.items = response))
        .catch((err) => console.error(err));
    },

    async remove(society: string) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, society }),
      };

      await fetch("/api/unsubscribe", options).catch((err) =>
        console.error(err)
      );
      await this.getList();
    },
  },
  data() {
    console.log(process.env);
    return {
      items: [],
      email: "",
    };
  },
});
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    margin: 1rem;
  }
}
.form-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  * {
    margin-bottom: 1rem;
  }
  padding: 1rem;
}
</style>
