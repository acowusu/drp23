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
    <div class="results" v-if="selected == true">
      <n-card content-style="padding: 0;">
        <n-tabs
          type="line"
          size="large"
          :tabs-padding="20"
          pane-style="padding: 0px;"
        >
          <n-tab-pane name="Edit Society" class="edit-form">
            <n-form ref="form" label-width="100px">
              <n-form-item>
                <n-button type="primary" @click="loadUnion">
                  Load from Union page
                </n-button>
              </n-form-item>
              <n-form-item label="Description">
                <div class="description-editor">
                  <QuillEditor
                    theme="snow"
                    contentType="html"
                    v-model:content="description"
                  />
                </div>
                <!-- <n-input v-model:value="description"></n-input> -->
              </n-form-item>
              <n-form-item label="Instagram">
                <n-input v-model:value="links.Instagram"></n-input>
              </n-form-item>
              <n-form-item label="WhatsApp">
                <n-input v-model:value="links.Whatsapp"></n-input>
              </n-form-item>
              <n-form-item>
                <n-button type="primary" @click="pushEdit"> Save </n-button>

                <router-link :to="{ path: `/society/${chosenSociety}` }">
                  <n-button type="primary">Society page </n-button>
                </router-link>
              </n-form-item>
            </n-form>
          </n-tab-pane>

          <n-tab-pane name="Create Event">
            <router-link
              :to="{
                path: '/create',
                query: { society: chosenSociety },
              }"
            >
              Create Event
            </router-link>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
    <div v-else></div>
  </div>
</template>

<script lang="ts">
import { SocietyPayload } from "@/types";
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NTabPane,
  NTabs,
} from "naive-ui";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
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
        Instagram: "",
        Whatsapp: "",
      },
      selected: false,
      chosenSociety: "",
      societyID: "",
    };
  },
  async mounted() {
    this.options = await this.getSocs();
  },
  computed: {
    ...mapGetters(["ManagingSociety", "Societies"]),
    options(): { label: string; value: string }[] {
      return this.Societies.map((society: SocietyPayload) => ({
        label: society.name,
        value: JSON.stringify(society),
      }));
    },
  },
  methods: {
    ...mapActions(["manageSociety"]),
    async handleSelect(option: any) {
      option = JSON.parse(option);
      this.selected = true;
      this.chosenSociety = option.name;
      this.description = option.description;
      this.links.Instagram = option?.metadata?.Instagram || "";
      this.links.Whatsapp = option?.metadata?.Whatsapp || "";
      this.societyID = option.society_id;
    },
    async getSocs() {
      console.log("Here");
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      console.log("Here2");
      return await fetch("/api/society", options)
        .then((response) => response.json())
        .then((response) =>
          response.map((society: any) => ({
            label: society.name,
            value: JSON.stringify(society),
          }))
        )
        .catch((err) => console.error(err));
    },
    async loadUnion() {
      const content = {
        name: this.chosenSociety,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      await fetch("/api/scrape_union", options)
        .then((response) => response.json())
        .then((data) => {
          const teamList = `
          ${data.team
            .map(
              ({ name, role }: { name: string; role: string }) =>
                `<p>${name} - ${role}</p>`
            )
            .join("")}
           
            `;
          console.log(teamList);
          this.description = `
          <img style="width: 100%;" src="https://www.imperialcollegeunion.org/${data.image}" />
          <p>${data.description}</p>
          <a href="
          ${data.constitutionLink}">Our Constitution</a>
          <h4>Our Team</h4>
          ${teamList}
          `;
          this.links.Instagram = data.links.Instagram;
          this.links.Whatsapp = data.links.Whatsapp;
        })
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
