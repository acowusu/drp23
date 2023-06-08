<template>
  <n-form ref="formRef" :model="model" class="form">
    <n-form-item path="name" label="Name">
      <n-input v-model:value="model.name" />
    </n-form-item>

    <n-form-item path="description" label="Description">
      <n-input v-model:value="model.description" />
    </n-form-item>
    <n-form-item path="image_url" label="Image Url">
      <n-input v-model:value="model.image_url" />
    </n-form-item>
    <n-form-item path="organizer" label="Organizer">
      <n-input v-model:value="society" :disabled="true" />
    </n-form-item>
    <n-form-item path="location" label="Location">
      <n-input v-model:value="model.location" />
    </n-form-item>

    <n-form-item path="date_time" label="Date Time">
      <n-date-picker
        v-model:formatted-value="model.date_time"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        clearable
      />
    </n-form-item>
    <n-form-item path="ticket_price" label="Ticket Price">
      <n-input-number v-model:value="model.ticket_price" />
    </n-form-item>
    <n-form-item path="tags" label="Tags">
      <n-dynamic-tags v-model:value="model.tags" />
    </n-form-item>
    <n-form-item path="latitude" label="Latitude">
      <n-input-number v-model:value="model.latitude" />
    </n-form-item>
    <n-form-item path="longitude" label="Longitude">
      <n-input-number v-model:value="model.longitude" />
    </n-form-item>

    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button
            :disabled="model.age === null"
            round
            type="primary"
            @click="handleValidateButtonClick"
          >
            Create
          </n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>
</template>

<script lang="ts">
import {
  NButton,
  NCol,
  NDatePicker,
  NDynamicTags,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NRow,
} from "naive-ui";
import { defineComponent } from "vue";

const now = new Date();
const nowstr =
  now.getFullYear() +
  ("00" + (now.getMonth() + 1)).slice(-2) +
  "-" +
  ("00" + now.getDate()).slice(-2) +
  "-" +
  " " +
  ("00" + now.getHours()).slice(-2) +
  ":" +
  ("00" + now.getMinutes()).slice(-2) +
  ":" +
  ("00" + now.getSeconds()).slice(-2);

interface EventPayload {
  name: string;
  description: string;
  image_url: string;
  organizer: string;
  location: string;
  date_time: string;
  ticket_price: number;
  latitude: number;
  longitude: number;
  id: number;
  tags: string[];
}

export default defineComponent({
  components: {
    NButton,
    NRow,
    NCol,
    NForm,
    NFormItem,
    NInput,
    NInputNumber,
    NDatePicker,
    NDynamicTags,
  },
  data() {
    return {
      societies: [] as { label: string; value: string }[],
      model: {
        name: "",
        description: "",
        image_url: "",
        organizer: "",
        location: "",
        date_time: "2023-07-22 12:00:00",
        ticket_price: 0,
        latitude: 0,
        longitude: 0,
        id: -1,
        tags: [],
      },
      society: "",
    };
  },
  mounted() {
    this.society = String(this.$route.query.society);
  },
  methods: {
    async handleValidateButtonClick() {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.model),
      };

      await fetch("/api/create", options)
        .then((response) => response.json())
        .then(({ event_id }) => {
          console.log({ event_id });
          this.$router.push({
            name: "event",
            params: { event_id },
          });
        })
        .catch((err) => console.error(err));
    },
  },
});
</script>

<style scoped>
.form {
  width: calc(min(100vw, 400px) - 40px);
  margin: auto;
}
</style>
