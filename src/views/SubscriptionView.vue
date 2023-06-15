<template>
  <div class="home">
    <h1>Subscriptions</h1>
    <p>
      Enter your email to subscribe to societies and recieve notifications about
      new events
    </p>
    <div class="form">
      <n-input
        v-model:value="email"
        @input="getList"
        type="text"
        placeholder="Basic Input"
      />
    </div>

    <ul class="results">
      <h3>Subscriptions</h3>
      <li v-for="item in items" :key="item">
        {{ item.name }} <n-tag>{{ item.type }}</n-tag>
        <n-button size="tiny" @click="remove(item.name)">❌</n-button>
      </li>
    </ul>
    <h3>Available Societies</h3>
    <ul class="results">
      <li v-for="item in societies" :key="item">
        {{ item.name }} <n-tag>{{ item.type }}</n-tag>
        <n-button
          v-if="subscribedNames.includes(item.name)"
          size="tiny"
          @click="remove(item.name)"
          >❌</n-button
        >
        <n-button v-else size="tiny" @click="add(item?.name)">✅</n-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { NButton, NInput, NTag } from "naive-ui";

import { defineComponent } from "vue";
interface Society {
  name: string;
  type: string;
}
export default defineComponent({
  name: "SubscriptionView",
  components: { NInput, NTag, NButton },
  mounted() {
    this.loadSocieties();
    this.getList();
  },
  computed: {
    subscribedNames(): string[] {
      return this.items.map(({ name }) => name);
    },
  },
  methods: {
    onPageChange() {
      window.scrollTo(0, 0);
    },
    async loadSocieties() {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      await fetch("/api/society", options)
        .then((response) => response.json())
        .then((response) => (this.societies = response))
        .catch((err) => console.error(err));
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
        body: JSON.stringify({ email: this.email, society, subscribe: false }),
      };

      await fetch("/api/subscriptions", options).catch((err) =>
        console.error(err)
      );
      await this.getList();
    },
    async add(society: string) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, society, subscribe: true }),
      };

      await fetch("/api/subscriptions", options).catch((err) =>
        console.error(err)
      );
      await this.getList();
    },
  },
  data() {
    console.log(process.env);
    return {
      items: [] as Society[],
      email: "ao921@ic.ac.uk",
      societies: [] as Society[],
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
  flex-direction: column;
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
.form {
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
