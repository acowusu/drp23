<template>
  <div class="container">
    <h1>{{ name }}</h1>
    <h3>{{ type }}</h3>
    <n-divider />
    <div v-html="desc" class="content"></div>
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
  </div>
</template>

<script lang="ts">
import { NDivider } from "naive-ui";
import { defineComponent } from "vue";
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
<style lang="scss" scoped>
.container {
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10% 0 10%;
}
.content {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>
