<template>
  <n-card :title="data.name">
    <template #cover v-if="derrivedImage">
      <img :src="derrivedImage" />
    </template>
    <n-tag rounded :bordered="false" type="success">{{ data.type }}</n-tag>
    {{ derrivedImage }}
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
    <n-ellipsis
      v-if="data.description"
      expand-trigger="click"
      line-clamp="5"
      :tooltip="false"
    >
      {{ shorten(data.description) }}
    </n-ellipsis>
    <n-alert v-else> No Description Provided </n-alert>
    <n-divider />

    <em></em>
    <template #footer>
      <router-link v-if="!individual" :to="`/society/${data?.name}`">
        view society
      </router-link>
    </template>
  </n-card>
</template>

<script lang="ts">
import { SocietyPayload } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  NAlert,
  NButton,
  NCard,
  NDivider,
  NEllipsis,
  NIcon,
  NTag,
} from "naive-ui";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  name: "SocietyCard",
  components: {
    NCard,
    NTag,
    NDivider,
    NEllipsis,
    NButton,
    NIcon,
    FontAwesomeIcon,
    NAlert,
  },
  props: {
    data: {
      type: Object as () => SocietyPayload,
      required: true,
    },
    individual: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters(["SubscribedIds"]),
    starred() {
      return this.SubscribedIds.has(this.data.objectID);
    },
    derrivedImage() {
      if (!this.data?.metadata?.image) {
        return undefined;
      } else {
        return this.data.metadata.image;
      }
    },
  },
  methods: {
    ...mapActions(["subscribe", "unsubscribe"]),
    shorten(text: string) {
      const temp = document.createElement("template");
      temp.innerHTML = text;
      text = temp.content.textContent || "";

      return text;
    },
    starEvent() {
      if (this.starred) {
        this.unsubscribe(this.data.name);
      } else {
        this.subscribe(this.data.name);
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
