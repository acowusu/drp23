<template>
  <div>
    {{ event.name }}
    {{ messages }}
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { EventPayload } from "@/types";
import {
  ref as dbRef,
  getDatabase,
  query,
  orderByChild,
} from "firebase/database";
import { firebase, db } from "../fb";

export default defineComponent({
  name: "EventManager",
  emits: ["change"],
  props: {
    event: {
      type: EventPayload,
      default: null,
    },
  },
  data: function () {
    return {
      attending: 0,
      messages: {},
    };
  },
  watch: {
    event: {
      handler: async function (newVal) {
        const messages = dbRef(db, "messages");
        console.log(newVal);
        await this.$databaseBind(
          "messages",
          query(dbRef(messages, newVal.event_id), orderByChild("timestamp"))
        );
        // query( dbRef(messages, newVal.event_id), orderByChild("timestamp"))
      },
      immediate: true,
    },
  },
  computed: {
    event_id() {
      return this.event.event_id;
    },
    event_messages() {
      return this.messages[this.event_id];
    },
  },
  methods: {
    isDateDisabled(date) {
      return date <= this.min || date >= this.max;
    },
    async getAttending() {
      const content = {
        event_id: this.event.event_id,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      await fetch("api/events", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.attending = data.attending;
        })
        .catch((err) => console.error(err));
    },
  },
});
</script>
