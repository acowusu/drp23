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
      <n-input v-model:value="model.organizer" />
    </n-form-item>
    <n-form-item path="location" label="Location">
      <n-input v-model:value="model.location" />
    </n-form-item>
    <n-form-item path="date_time" label="Date Time">
      <n-input v-model:value="model.date_time" />
    </n-form-item>
    <n-form-item path="ticket_price" label="Ticket Price">
      <n-input-number v-model:value="model.ticket_price" />
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
            Validate
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
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NRow,
} from "naive-ui";
import { defineComponent } from "vue";

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
  },
  data() {
    return {
      model: {
        name: "",
        description: "",
        image_url: "",
        organizer: "",
        location: "",
        date_time: "",
        ticket_price: 0,
        latitude: 0,
        longitude: 0,
        id: -1,
        tags: [],
      },
    };
  },

  methods: {
    handleValidateButtonClick() {
      console.log(this.$refs.formRef);
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
