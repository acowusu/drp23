<template>
  <n-form ref="formRef" :model="model" class="form">
    <n-form-item path="name" label="Name">
      <n-input v-model:value="model.name" />
    </n-form-item>
    <n-form-item path="description" label="Description">
      <n-input v-model:value="model.description" />
    </n-form-item>

    <n-button @click="triggerPicker">Upload Image</n-button>
    <input
      type="file"
      accept="image/*"
      @change="upload"
      ref="hiddenUpload"
      style="display: none"
    />
    <n-form-item path="society" label="society">
      <n-input v-model:value="model.society" :disabled="true" />
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
      <n-checkbox-group v-model:value="model.tags">
        <n-grid :y-gap="10" :cols="1">
          <n-gi>
            <n-checkbox
              value="No membership required"
              label="No membership required"
            />
          </n-gi>
          <n-gi>
            <n-checkbox value="Free" label="Free" />
          </n-gi>
          <n-gi>
            <n-checkbox value="Free food" label="Free food" />
          </n-gi>
          <n-gi>
            <n-checkbox value="Free snacks" label="Free snacks" />
          </n-gi>
          <n-gi>
            <n-checkbox value="Free drinks" label="Free drinks" />
          </n-gi>
          <n-gi>
            <n-checkbox value="Alcohol-free" label="Alcohol-free" />
          </n-gi>
        </n-grid>
      </n-checkbox-group>
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
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NCol,
  NDatePicker,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NInputNumber,
  NRow,
  useMessage,
} from "naive-ui";
import { defineComponent } from "vue";
import firebase from "../fb";
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
  society: string;
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
    NCheckbox,
    NCheckboxGroup,
    NGrid,
    NGi,
  },

  data() {
    return {
      societies: [] as { label: string; value: string }[],
      model: {
        name: "",
        description: "",
        image_url: "",
        society: "",
        location: "",
        date_time: "2023-07-22 12:00:00",
        ticket_price: 0,
        latitude: 0,
        longitude: 0,
        id: -1,
        tags: [],
      },
      society: "",
      message: useMessage(),
    };
  },
  mounted() {
    this.model.society = String(this.$route.query.society);
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
    triggerPicker() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$refs.hiddenUpload.click();
    },
    beforeUpload(data: any) {
      const type = data.file.file?.type;
      if (
        type !== "image/png" &&
        type !== "image/jpeg" &&
        type !== "image/jpg"
      ) {
        this.message.error(
          "Only upload picture files in jpeg, jpg or png format, please re-upload."
        );
        return false;
      }
      return true;
    },
    upload(data: Event) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let file = (data.target as HTMLInputElement).files[0];

      const random = Math.random().toString(36).substring(2);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const storage = getStorage(firebase);
      const storageRef = ref(storage, random);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.model.image_url = downloadURL;
          });
        }
      );
    },
  },
});
</script>

<style scoped>
.form {
  width: calc(min(100vw, 400px) - 40px);
  margin: auto;
}
.n-grid {
  text-align: left;
}
</style>
