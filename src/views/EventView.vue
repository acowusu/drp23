<template>
  <div class="home">
    <div class="results">
      <EventCard v-if="item" :data="item" />
    </div>
  </div>
</template>

<script lang="ts">
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchView",
  components: {
    EventCard,
  },
  async mounted() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: this.$route.params.event_id }),
    };

    await fetch("/api/events", options)
      .then((response) => response.json())
      .then((response) => (this.item = response))
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
      item: null,
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
