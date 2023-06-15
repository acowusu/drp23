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
    <n-divider />
    <div v-if="!expanded" @click="expand">
      <div class="container" ref="container">
        <div v-html="markdownToHtml"></div>
      </div>
      <p v-if="overflown" style="cursor: pointer">[click to expand]</p>
    </div>
    <div v-else @click="expand" v-html="markdownToHtml" class="expanded"></div>

    <n-divider />

    <em></em>
    {{ data.location }} - {{ prettyPrint(data.date_time) }}:
    <n-space>
      <n-tag v-for="tag in data.tags" :key="tag">{{ tag }}</n-tag>
    </n-space>
    <template #footer>
      <router-link :to="`/event/${data?.event_id || data?.objectID}`">
        view
      </router-link>
    </template>
  </n-card>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  NButton,
  NCard,
  NDivider,
  NEllipsis,
  NIcon,
  NSpace,
  NTag,
} from "naive-ui";
import { defineComponent } from "vue";
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
  event_id: string;
  objectID?: string;
  tags: string[];
}
import { marked } from "marked";
import exp from "constants";
export default defineComponent({
  name: "EventCard",
  components: {
    NCard,
    NTag,
    NSpace,
    NDivider,
    NButton,
    NIcon,
    FontAwesomeIcon,
  },
  props: {
    data: {
      type: Object as () => EventPayload,
      required: true,
    },
  },
  mounted(): void {
    this.overflown = this.checkOverflow();
  },
  data: function () {
    return {
      starred: localStorage.getItem(this.data.event_id) == "starred_drp18",
      society_id: "",
      expanded: false,
      overflown: false,
    };
  },
  methods: {
    prettyPrint(date: string) {
      return new Date(date).toLocaleString();
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
    expand() {
      this.expanded = !this.expanded;
    },
    checkOverflow() {
      const container = this.$refs.container as HTMLElement | undefined;
      if (!container) {
        return false;
      } else {
        return container.scrollHeight != container.clientHeight;
      }
    },
  },
  computed: {
    markdownToHtml() {
      console.log(marked(this.data.description));
      return marked(this.data.description);
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
.fa-star {
  box-shadow: rgb(255 255 255 / 27%) 0px 0px 20px 12px;
  background: rgb(255 255 255 / 27%);
}

.container {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100px;
  cursor: pointer;
}

.expanded {
  cursor: pointer;
}
</style>
