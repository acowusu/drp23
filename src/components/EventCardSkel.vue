<template>
  <n-card title=" ">
    <template #cover>
      <n-skeleton height="201px" width="358px" />
    </template>
    <n-skeleton height="31px" width="33%" class="centered push-up" />
    <n-skeleton height="24px" width="10%" class="centered" />

    <n-button text class="event-star" @click="starEvent">
      <n-icon>
        <font-awesome-icon icon="fa-regular fa-star" class="greyed-out" />
      </n-icon>
    </n-button>

    <n-button text :disabled="disableAttending" class="event-attend">
      <n-icon>
        <font-awesome-icon icon="fa-regular  fa-thumbs-up" class="greyed-out" />
      </n-icon>
    </n-button>

    <n-divider />
    <div>
      <n-skeleton text :repeat="2" height="20px" width="100%" />
    </div>
    <n-divider />

    <em></em>
    <div>
      <n-skeleton text :repeat="2" height="20px" width="100%" />
    </div>

    <!-- <n-space>
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="20px" width="100%" class="centered" />
    </n-space> -->
    <template #footer>
      <n-skeleton height="21px" width="33%" class="centered" />
    </template>
  </n-card>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { NButton, NCard, NDivider, NIcon, NSkeleton } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EventCard",
  components: {
    NCard,
    NDivider,
    NButton,
    NIcon,
    FontAwesomeIcon,

    NSkeleton,
  },
  props: {
    individual: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      starred: false,
      society_id: "",
      disableAttending: false,
    };
  },

  computed: {
    isAttending() {
      return false;
    },
  },
  methods: {
    prettyPrint(date: string) {
      return new Date(date).toLocaleString();
    },
    async updateAttending() {
      console.log("This is skeleton code, please implement this function!");
    },
    starEvent() {
      console.log("This is skeleton code, please implement this function!");
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
.centered {
  margin: auto;
}
.push-up {
  position: relative;
  top: -20px;
}
.greyed-out {
  color: #8f8f8f;
}
</style>
