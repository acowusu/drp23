<template>
  {{ name }} ({{ type }})
  <n-divider />
  {{ desc }}
  <br />
  <div>
    <ul>
      <li
        style="list-style-type: none"
        v-for="[key, value] in links"
        :key="key"
      >
        <a v-bind:href="value">{{ key }}</a>
      </li>
    </ul>
  </div>
  <br />
  Upcoming Events
  <div class="results">
    <EventCard v-for="item in items" :key="item" :data="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NDivider } from "naive-ui";
import EventCard from "@/components/EventCard.vue";
import { result } from "lodash";
export default defineComponent({
  components: {
    EventCard,
    NDivider,
  },
  data: function () {
    return {
      id: "",
      name: "",
      type: "",
      desc: "",
      links: new Map<string, string>([]),
      items: [],
    };
  },
  async mounted() {
    this.id = String(this.$route.params.society_id);
    const content = {
      name: this.id,
    };
    console.log(content);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    };
    const society = await fetch("api/society", options)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    this.name = society.name;
    this.type = society.type;
    this.desc = society.description;
    const societyContent = {
      society: society.name,
    };
    console.log(societyContent);
    const societyOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(societyContent),
    };

    await fetch("/api/search", societyOptions)
      .then((response) => response.json())
      .then((response) => (this.items = response.results))
      .catch((err) => console.error(err));
    console.log(this.items);
    if (society.metadata) {
      this.links = new Map(Object.entries(society.metadata));
    }
  },
});
</script>

<style lang="scss" scoped>
.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
