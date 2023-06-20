<template>
  <div class="home">
    <div class="results">
      <EventCard v-for="item in SavedEvents" :key="item" :data="item" />
      <NAlert
        v-if="SavedEvents.length === 0"
        type="info"
        showIcon
        title="No events
      saved"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import { mapGetters } from "vuex";
import { NAlert } from "naive-ui";
export default defineComponent({
  name: "MyEventsView",
  components: {
    EventCard,
    NAlert,
  },
  computed: {
    ...mapGetters(["SavedEvents"]),
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
