<template>
  <div class="home">
    <n-select
      :options="options"
      :show-arrow="true"
      filterable
      @update-value="handleSelect"
    >
      <n-button>Society Selection</n-button>
    </n-select>
  </div>
  <div class="results" v-if="selected == true">
    <router-link :to="{ path: `/society/${societyID}` }">
      Society page
    </router-link>
    <n-card content-style="padding: 0;">
      <n-tabs
        type="line"
        size="large"
        :tabs-padding="20"
        pane-style="padding: 20px;"
      >
        <n-tab-pane name="Edit Society">
          <n-form ref="form" label-width="100px">
            <n-form-item label="Description">
              <n-input v-model:value="description"></n-input>
            </n-form-item>
            <n-form-item label="Instagram">
              <n-input v-model:value="links.instagram"></n-input>
            </n-form-item>
            <n-form-item label="WhatsApp">
              <n-input v-model:value="links.whatsapp"></n-input>
            </n-form-item>
            <n-button type="primary" @click="pushEdit"> Edit </n-button>
          </n-form>
        </n-tab-pane>

        <n-tab-pane name="Create Event">
          <router-link
            :to="{
              path: '/create',
              query: { society: chosenSociety },
            }"
          >
            Society Page
          </router-link>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
  <div v-else></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  NSelect,
  NForm,
  NFormItem,
  NInput,
  NCard,
  NTabs,
  NButton,
  NTabPane,
} from "naive-ui";

export default defineComponent({
  components: {
    NSelect,
    NForm,
    NFormItem,
    NInput,
    NCard,
    NTabs,
    NButton,
    NTabPane,
  },
  data: function () {
    return {
      description: "",
      links: {
        instagram: "",
        whatsapp: "",
      },
      selected: false,
      chosenSociety: "",
      options: [],
      societyID: "",
    };
  },
  async mounted() {
    this.options = await this.getSocs();
  },
  methods: {
    async handleSelect(option: any) {
      this.selected = true;
      this.chosenSociety = option.name;
      const content = {
        name: this.chosenSociety,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      await fetch("api/society", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.description = response.description;
          this.societyID = response.society_id;
        })
        .catch((err) => console.error(err));
      console.log(this.societyID);
    },
    async getSocs() {
      console.log("Here");
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      console.log("Here2");
      return await fetch("/api/societies", options)
        .then((response) => response.json())
        .then((response) =>
          response.map((society: any) => ({
            label: society.name,
            value: society,
          }))
        )
        .catch((err) => console.error(err));
    },
    async pushEdit() {
      const content = {
        name: this.chosenSociety,
        description: this.description,
        links: JSON.stringify(this.links),
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      await fetch("/api/update_society", options)
        .then((response) => response.json())
        .catch((err) => console.error(err));
    },
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
