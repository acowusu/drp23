<script setup>
import { useDatabaseList } from "vuefire";
import { ref as dbRef, push, set, child } from "firebase/database";
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
  // await fetch("/api/messages", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     message: message.value,
  //     event_id: props.event.event_id,
  //   }),
  // });
  const newPostRef = push(mRef.value);
  await set(newPostRef, {
    message: message.value,
    event_id: props.event.event_id,
    timestamp: Date.now(),
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
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

watch(props.event, async ({ event_id }) => {
  await getAttending();
  await messages.bind(dbRef(db, "messages/" + event_id));
});
function handleDelete(message) {
  return async function () {
    try {
      console.log(message);
      await set(child(mRef.value, message.id), null);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
</script>

<template>
  <h1>Messages</h1>
  <div v-if="canSend">
    <h2>Attending: {{ attending }}</h2>
    <div class="header">
      <NInput v-model:value="message" placeholder="Enter a message" />
      <NButton @click="sendMessage">Send</NButton>
    </div>
  </div>
  <ul>
    <li v-for="(message, index) in messages" :key="message.id">
      <n-alert
        :type="index == 0 ? 'info' : ''"
        :closable="index != 0 && canSend"
        :on-close="handleDelete(message)"
        @on-after-leave="console.log"
        :title="formatDate(message.timestamp)"
      >
        <span>{{ message.message }}</span>
      </n-alert>
    </li>
  </ul>
</template>
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
}
.header {
  display: flex;
  align-items: center;
  margin: 10px;
}
</style>
