<template>
  <div class="home">
    <h1>Subscriptions</h1>
    <p>
      Enter your email to subscribe to societies and recieve notifications about
      new events
    </p>
    {{ Email }}

    <h3>Subscriptions</h3>
    <div class="results">
      <div v-for="item in SubscribedSocieties" :key="item.name">
        <n-alert
          :title="item.name"
          v-if="subscribedNames.has(item.name)"
          type="success"
          closable
          :on-close="handleUnsubscribe(item.name)"
        >
          {{ item.type }}
          <!-- <n-button size="tiny" @click="unSubscribe(item.name)">❌</n-button> -->
        </n-alert>
      </div>
    </div>
    <h3>Available Societies</h3>
    <div class="results">
      <div v-for="item in pageItems" :key="item.name">
        <n-alert
          :title="item.name"
          v-if="subscribedNames.has(item.name)"
          type="success"
        >
          <div class="alert-split-content">
            {{ item.type }}
            <n-button
              strong
              secondary
              round
              type="error"
              @click="unSubscribe(item.name)"
            >
              Unsubscribe
            </n-button>
          </div>
        </n-alert>
        <n-alert :title="item.name" v-else type="default">
          <div class="alert-split-content">
            {{ item.type }}
            <n-button
              strong
              secondary
              round
              type="primary"
              @click="subscribe(item.name)"
            >
              Subscribe
            </n-button>
          </div>
        </n-alert>
      </div>
    </div>
    <n-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :page-count="totalPages"
      show-size-picker
      :page-sizes="pageSizes"
      class="pagination"
    />
  </div>
</template>

<script lang="ts">
import { SocietyPayload } from "@/types";
import { NAlert, NButton, NPagination } from "naive-ui";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "SubscriptionView",
  components: { NButton, NPagination, NAlert },
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
    ...mapActions([
      "fetchSocieties",
      "fetchSubscriptions",
      "subscribe",
      "unSubscribe",
    ]),
    handleUnsubscribe(name: string) {
      return async () => {
        this.unSubscribe(name);
        return true;
      };
    },
    onPageChange() {
      window.scrollTo(0, 0);
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
  margin-bottom: 1em;
}
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  width: 90%;
  margin: 1rem;
  padding: 1rem;
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
.alert-split-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
