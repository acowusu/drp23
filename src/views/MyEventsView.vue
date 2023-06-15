<template>
  <div class="home">
    <div class="results">
      <EventCard v-for="item in items" :key="item" :data="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src

export default defineComponent({
  name: "MyEventsView",
  components: {
    EventCard,
  },
  async mounted() {
    let reqs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const event_id = localStorage.key(i) ?? "null";
      console.log(event_id);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id }),
      };
      console.log(options);

      if (localStorage.getItem(event_id) == "starred_drp18") {
        reqs.push(
          fetch("/api/events", options)
            .then((response) => response.json())
            .then((response) => this.items.push(response))
        );
      }
    }
    await Promise.all(reqs);
    console.log(localStorage.length);
    console.log(localStorage.key(0));
  },
  data() {
    return {
      items: [] as Array<any>,
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
</style>
