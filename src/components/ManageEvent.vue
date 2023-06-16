<script setup>
import { useDatabaseList } from "vuefire";
import { ref as dbRef } from "firebase/database";
import { useDatabase } from "vuefire";
import { defineProps, ref, computed, watch } from "vue";
import { NAlert, NInput, NButton } from "naive-ui";

const db = useDatabase();
const props = defineProps({
  event: {
    type: Object,
    default: null,
  },
  canSend: {
    type: Boolean,
    default: false,
  },
});
const message = ref("");
const attending = ref(0);
const mRef = computed(() => dbRef(db, "messages/" + props.event.event_id));
const messages = useDatabaseList(mRef);
getAttending();
async function sendMessage() {
  await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message.value,
      event_id: props.event.event_id,
    }),
  });
  message.value = "";
}
async function getAttending() {
  await fetch("/api/attending", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: props.event.event_id,
    }),
  })
    .then((response) => response.json())
    .then(({ count }) => {
      attending.value = count;
    });
}

watch(props.event, async ({ event_id }) => {
  await getAttending();
  await messages.bind(dbRef(db, "messages/" + event_id));
});
</script>

<template>
  <h1>Messages</h1>
  <div v-if="canSend">
    <h2>Attending: {{ attending }}</h2>
    <NInput v-model:value="message" />
    <NButton @click="sendMessage">Send</NButton>
  </div>
  <ul>
    <li v-for="message in messages" :key="message.id">
      <n-alert type="info">
        <span>{{ message.message }}</span>
        {{ new Date(message.timestamp).toLocaleString() }}
      </n-alert>
    </li>
  </ul>
</template>
