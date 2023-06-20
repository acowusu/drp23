<template>
  <div class="home">
    <n-select
      :options="options"
      :show-arrow="true"
      filterable
      @update-value="handleSelect"
      :default-value="ManagingSociety.name"
    >
      <n-button>Society Selection</n-button>
    </n-select>
    <div class="results" v-if="ManagingSociety.name">
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
                <n-input v-model:value="metadata.Instagram"></n-input>
              </n-form-item>
              <n-form-item label="WhatsApp">
                <n-input v-model:value="metadata.Whatsapp"></n-input>
              </n-form-item>
              <n-form-item>
                <n-button type="primary" @click="pushEdit"> Save </n-button>

                <router-link :to="{ path: `/society/${ManagingSociety.name}` }">
                  <n-button type="primary">Society page </n-button>
                </router-link>
              </n-form-item>
            </n-form>
          </n-tab-pane>

          <n-tab-pane name="Create Event">
            <router-link
              :to="{
                path: '/create',
                query: { society: ManagingSociety.name },
              }"
            >
              Create Event
            </router-link>
          </n-tab-pane>
          <n-tab-pane name="Manage Events">
            <n-select
              :options="eventOptions"
              :show-arrow="true"
              filterable
              @update-value="handleChooseEvent"
            />
            <ManageEvent
              can-send
              :event="chosenEvent"
              v-if="chosenEvent?.event_id"
            />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
    <div v-else></div>
  </div>
</template>

<script lang="ts">
import ManageEvent from "@/components/ManageEvent.vue";
import { EventPayload, SocietyPayload } from "@/types";
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
    ManageEvent,
  },
  data: function () {
    return {
      selectedSociety: null,
      description: "",
      metadata: {
        Instagram: "",
        Whatsapp: "",
        image: "",
      },
      selected: false,
      chosenSociety: "",
      societyID: "",
      events: [] as EventPayload[],
      chosenEvent: {} as EventPayload,
    };
  },
  async created() {
    await this.fetchSocieties();
    this.assignFromManager();
  },
  computed: {
    ...mapGetters(["ManagingSociety", "Societies"]),
    options(): { label: string; value: string }[] {
      return this.Societies.map((society: SocietyPayload) => ({
        label: society.name,
        value: JSON.stringify(society),
      }));
    },
    eventOptions(): { label: string; value: string }[] {
      return this.events.map((event: { name: string }) => ({
        label: event.name,
        value: JSON.stringify(event),
      }));
    },
  },
  watch: {
    ManagingSociety: {
      handler: function () {
        this.loadEvents();
      },
      deep: false,
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["manageSociety", "fetchSocieties"]),
    async handleSelect(val: string) {
      console.log(val);
      const option = JSON.parse(val);
      this.manageSociety(option);
      this.assignFromManager();
    },
    assignFromManager() {
      this.description = this.ManagingSociety.description;
      this.metadata.Instagram = this.ManagingSociety.metadata.Instagram;
      this.metadata.Whatsapp = this.ManagingSociety.metadata.Whatsapp;
      this.societyID = this.ManagingSociety.society_id;
    },
    handleChooseEvent(option: string) {
      console.log(option);
      this.chosenEvent = JSON.parse(option);
    },
    async loadEvents() {
      const content = {
        name: this.ManagingSociety.name,
      };
      console.log(content);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      await fetch("api/events", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.events = data;
        })
        .catch((err) => console.error(err));
      return;
    },
    async loadUnion() {
      const content = {
        name: this.ManagingSociety.name,
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
          <img  style="width: 100%;" src="https://www.imperialcollegeunion.org/${data.image}" />
          <p>${data.description}</p>
          <a href="
          ${data.constitutionLink}">Our Constitution</a>
          <h4>Our Team</h4>
          ${teamList}
          `;
          if (data.metadata.Instagram)
            this.metadata.Instagram = data.metadata.Instagram;
          if (data.metadata.Whatsapp)
            this.metadata.Whatsapp = data.metadata.Whatsapp;
          if (data.image)
            this.metadata.image = `https://www.imperialcollegeunion.org/${data.image}`;
        })
        .catch((err) => console.error(err));
    },
    async pushEdit() {
      const content = {
        name: this.ManagingSociety.name,
        description: this.description,
        metadata: JSON.stringify(this.metadata),
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
