<template>
  <div class="container">
    <h1 v-if="loadedSociety">{{ name }}</h1>
    <n-skeleton text height="30px" width="20%" v-else />
    <h3 v-if="loadedSociety">{{ type }}</h3>
    <n-skeleton text height="20px" width="20%" v-else />
    <n-button
      text
      class="event-star"
      @click="starEvent"
      v-if="!starred"
      :data-test="`STR_${id}`"
    >
      <n-icon>
        <font-awesome-icon icon="fa-regular fa-star" />
      </n-icon>
    </n-button>
    <n-button
      text
      class="event-star"
      @click="starEvent"
      v-else
      :data-test="`USTR_${id}`"
      ><n-icon>
        <font-awesome-icon icon="fa-solid fa-star" />
      </n-icon>
    </n-button>
    <n-divider />

    <div v-if="loadedSociety" v-html="desc" class="content"></div>
    <n-skeleton text height="500px" width="100%" v-else />
    <br />
    <div>
      <ul>
        <li
          style="list-style-type: none"
          v-for="[key, value] in links"
          :key="key"
        >
          <a v-bind:href="value">{{ key }}</a>
        </li>
      </ul>
    </div>
    <div class="results" v-if="loadedEvents">
      <div v-for="item in items" :key="item.objectID" class="result">
        <EventCard :data="item"></EventCard>
      </div>
    </div>
    <div class="results" v-else>
      <EventCardSkel />
    </div>
  </div>
</template>

<script lang="ts">
import EventCard from "@/components/EventCard.vue";
import EventCardSkel from "@/components/EventCardSkel.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { NButton, NDivider, NSkeleton } from "naive-ui";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  components: {
    NDivider,
    EventCard,
    EventCardSkel,
    NSkeleton,
    NButton,
    FontAwesomeIcon,
  },
  data: () => {
    return {
      id: "",
      name: "",
      type: "",
      desc: "",
      links: new Map<string, string>([]),
      items: [],
      loadedSociety: false,
      loadedEvents: false,
    };
  },
  computed: {
    ...mapGetters(["SubscribedIds"]),
    starred() {
      /* eslint-disable */

      return this.SubscribedIds?.has(this?.id);
      /* eslint-enable */
    },
  },
  methods: {
    ...mapActions(["subscribe", "unsubscribe"]),

    starEvent() {
      if (this.starred) {
        this.unsubscribe(this.name);
      } else {
        this.subscribe(this.name);
      }
    },
    async loadSociety() {
      const content = {
        name: this.id,
      };
      console.log(content);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      const society = await fetch("api/society", options)
        .then((response) => response.json())
        .catch((err) => console.error(err));

      this.name = society.name;
      this.type = society.type;
      this.desc = society.description;
      if (society.metadata) {
        this.links = new Map(Object.entries(society.metadata));
      }
      this.loadedSociety = true;
    },
    async loadEvents() {
      const content = {
        name: this.id,
      };
      console.log(content);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };
      await fetch("api/events", options)
        .then((response) => response.json())
        .then((items) => {
          this.items = items;
          console.log(items);
        })
        .catch((err) => console.error(err));
      this.loadedEvents = true;
    },
  },

  async mounted() {
    this.id = String(this.$route.params.society_id);
    await Promise.all([this.loadSociety(), this.loadEvents()]);
  },
});
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10% 0 10%;
}
.content {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
.results {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 2fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}
.result > * {
  width: 100%;
  height: 100%;
}
.event-star {
  font-size: 32px;
}
</style>
