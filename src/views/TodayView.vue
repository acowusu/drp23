<template>
  <div class="home">
    <n-collapse>
      <n-collapse-item title="Map View" name="1">
        <EventMap :items="items" />
      </n-collapse-item>
    </n-collapse>
    <div class="results">
      <EventCard v-for="item in items" :key="item" :data="item" />
    </div>
  </div>
</template>

<script lang="ts">
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import EventMap from "@/components/EventMap.vue";
import { NCollapse, NCollapseItem } from "naive-ui";
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchView",
  components: {
    EventCard,
    NCollapse,
    NCollapseItem,
    EventMap,
  },
  async mounted() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    await fetch("/api/events", options)
      .then((response) => response.json())
      .then((response) => (this.items = response))
      .catch((err) => console.error(err));
  },
  methods: {
    onPageChange() {
      window.scrollTo(0, 0);
    },
  },
  data() {
    console.log(process.env);
    return {
      items: [],
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
