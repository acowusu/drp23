<template>
  <n-card :title="data.name">
    <template #cover>
      <img :src="data.image_url" />
    </template>
    <template #header-extra v-if="data.society != ''">
      <router-link :to="{ path: `/society/${data.society}` }">
        {{ data.society }}
      </router-link></template
    >
    <n-tag
      rounded
      :bordered="false"
      type="success"
      v-if="data.ticket_price === 0"
      >FREE</n-tag
    >
    <n-tag rounded :bordered="false" type="error" v-else>
      £{{ data.ticket_price }}</n-tag
    >
    <n-button text class="event-star" @click="starEvent" v-if="!starred">
      <n-icon>
        <font-awesome-icon icon="fa-regular fa-star" />
      </n-icon>
    </n-button>
    <n-button text class="event-star" @click="starEvent" v-else
      ><n-icon>
        <font-awesome-icon icon="fa-solid fa-star" />
      </n-icon>
    </n-button>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button
          text
          :disabled="disableAttending"
          class="event-attend"
          @click="updateAttending"
          v-if="!isAttending"
        >
          <n-icon>
            <font-awesome-icon icon="fa-regular  fa-thumbs-up" />
          </n-icon>
        </n-button>
        <n-button
          :disabled="disableAttending"
          text
          class="event-attend"
          @click="updateAttending"
          v-else
          ><n-icon>
            <font-awesome-icon icon="fa-solid  fa-thumbs-up" />
          </n-icon>
        </n-button>
      </template>
      Let the Organizer know that you're attending!
    </n-tooltip>
    <n-divider />
    <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
      {{ data.description }}
    </n-ellipsis>
    <n-divider />

    <em></em>
    {{ data.location }} - {{ prettyPrint(data.date_time) }}:
    <n-space>
      <n-tag v-for="tag in data.tags" :key="tag">{{ tag }}</n-tag>
    </n-space>
    <template #footer>
      <router-link
        v-if="!individual"
        :to="`/event/${data?.event_id || data?.objectID}`"
      >
        view
      </router-link>
    </template>
  </n-card>
</template>

<script lang="ts">
import { EventPayload } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  NButton,
  NCard,
  NDivider,
  NEllipsis,
  NIcon,
  NSpace,
  NTag,
  NTooltip,
} from "naive-ui";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "EventCard",
  components: {
    NCard,
    NTag,
    NSpace,
    NDivider,
    NEllipsis,
    NButton,
    NIcon,
    FontAwesomeIcon,
    NTooltip,
  },
  props: {
    data: {
      type: Object as () => EventPayload,
      required: true,
    },
    individual: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      starred: localStorage.getItem(this.data.event_id) == "starred_drp18",
      society_id: "",
      disableAttending: false,
    };
  },

  computed: {
    ...mapGetters(["AttendingEvents"]),
    isAttending() {
      return this.AttendingEvents.map((x: EventPayload) => x.event_id).includes(
        this.data.event_id
      );
    },
  },
  methods: {
    ...mapActions(["attendEvent", "unattendEvent"]),
    prettyPrint(date: string) {
      return new Date(date).toLocaleString();
    },
    async updateAttending() {
      this.disableAttending = true;
      if (!this.isAttending) {
        await this.attendEvent(this.data);
      } else {
        await this.unattendEvent(this.data);
      }
      this.disableAttending = false;
    },
    starEvent() {
      if (this.starred) {
        localStorage.removeItem(this.data.event_id);
        this.starred = false;
      } else {
        localStorage.setItem(this.data.event_id, "starred_drp18");
        this.starred = true;
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.n-card {
  max-width: calc(min(100vw, 400px) - 40px);
  margin: 20px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.event-star {
  font-size: 32px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.event-attend {
  font-size: 32px;
  position: absolute;
  left: 10px;
  top: 10px;
}
.fa-star,
.fa-person-running {
  box-shadow: rgb(255 255 255 / 27%) 0px 0px 20px 12px;
  background: rgb(255 255 255 / 27%);
}
</style>
