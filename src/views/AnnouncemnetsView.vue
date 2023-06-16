<template>
  <div class="home">
    <n-select
      :options="eventOptions"
      :show-arrow="true"
      filterable
      @update-value="handleChooseEvent"
    />
    <ManageEvent :event="chosenEvent" v-if="chosenEvent?.event_id" />
  </div>
</template>

<script lang="ts">
import ManageEvent from "@/components/ManageEvent.vue";
import { EventPayload, SocietyPayload } from "@/types";
import { NSelect } from "naive-ui";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  components: {
    NSelect,

    ManageEvent,
  },
  data: function () {
    return {
      events: [] as EventPayload[],
      chosenEvent: {} as EventPayload,
    };
  },
  async created() {
    await this.loadEvents();
  },
  computed: {
    ...mapGetters(["Email", "Societies"]),
    options(): { label: string; value: string }[] {
      return this.Societies.map((society: SocietyPayload) => ({
        label: society.name,
        value: JSON.stringify(society),
      }));
    },
    eventOptions(): { label: string; value: string }[] {
      return this.events.map((event: any) => ({
        label: event.name,
        value: JSON.stringify(event),
      }));
    },
  },
  methods: {
    handleChooseEvent(option: any) {
      console.log(option);
      option = JSON.parse(option);
      this.chosenEvent = option;
    },
    async loadEvents() {
      const content = {
        email: this.Email,
      };
      console.log(content);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      await fetch("api/attending", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.events = data;
        })
        .catch((err) => console.error(err));
      return;
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.results {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.edit-form {
  width: calc(100% - 40px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.n-form > div {
  padding: 0 0.25em;
}
.description-editor {
  width: 100%;
  display: block;
}
.n-button {
  margin-right: 0.5em;
}
.n-tab-pane {
  margin: auto;
}
</style>
