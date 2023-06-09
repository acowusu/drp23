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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NDivider } from "naive-ui";
export default defineComponent({
  components: {
    NDivider,
  },
  data: function () {
    return {
      id: "",
      name: "",
      type: "",
      desc: "",
      links: new Map<string, string>([]),
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
    if (society.metadata) {
      this.links = new Map(Object.entries(society.metadata));
    }
  },
});
</script>
