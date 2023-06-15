<template>
  <div class="home">
    <h1>Subscriptions</h1>
    <p>
      Enter your email to subscribe to societies and recieve notifications about
      new events
    </p>
    {{ Email }}

    <ul class="results">
      <h3>Subscriptions</h3>
      <li v-for="item in SubscribedSocieties" :key="item">
        {{ item.name }} <n-tag>{{ item.type }}</n-tag>
        <n-button size="tiny" @click="remove(item)">❌</n-button>
      </li>
    </ul>
    <h3>Available Societies</h3>
    <ul class="results">
      <li v-for="item in pageItems" :key="item.name">
        {{ item.name }} <n-tag>{{ item.type }}</n-tag>
        <n-button
          v-if="subscribedNames.has(item.name)"
          size="tiny"
          @click="remove(item.name)"
          >❌</n-button
        >
        <n-button v-else size="tiny" @click="add(item?.name)">✅</n-button>
      </li>
    </ul>
    <n-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :page-count="totalPages"
      show-size-picker
      :page-sizes="pageSizes"
    />
  </div>
</template>

<script lang="ts">
import { SocietyPayload } from "@/types";
import { NButton, NPagination, NTag } from "naive-ui";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "SubscriptionView",
  components: { NTag, NButton, NPagination },
  mounted() {
    this.fetchSocieties();
    this.fetchSubscriptions();
  },
  computed: {
    ...mapGetters(["Email", "Societies", "SubscribedSocieties"]),
    pageItems(): SocietyPayload[] {
      return this.Societies.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
    totalPages(): number {
      return Math.ceil(this.Societies.length / this.pageSize);
    },
    subscribedNames(): Set<string> {
      return new Set(
        this.SubscribedSocieties.map(({ name }: SocietyPayload) => name)
      );
    },
  },
  methods: {
    ...mapActions(["fetchSocieties", "fetchSubscriptions"]),
    onPageChange() {
      window.scrollTo(0, 0);
    },
    async remove(society: string) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.Email, society, subscribe: false }),
      };

      await fetch("/api/subscriptions", options).catch((err) =>
        console.error(err)
      );
      await this.fetchSubscriptions();
    },
    async add(society: string) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.Email, society, subscribe: true }),
      };

      await fetch("/api/subscriptions", options).catch((err) =>
        console.error(err)
      );
      await this.fetchSubscriptions();
    },
  },
  data() {
    console.log(process.env);
    return {
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
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
