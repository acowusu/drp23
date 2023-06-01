<template>
  <div class="home">
    <section class="form-search">
      <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
      <n-dynamic-tags v-model:value="tags">
        <template #input="{ submit, deactivate }">
          <n-auto-complete
            ref="autoCompleteInstRef"
            v-model:value="inputValue"
            size="small"
            :options="options"
            placeholder="Email"
            :clear-after-select="true"
            @select="submit($event)"
            @blur="deactivate"
          />
        </template>
        <template #trigger="{ activate, disabled }">
          <n-button
            size="small"
            type="primary"
            dashed
            :disabled="disabled"
            @click="activate()"
          >
            <template #icon> + </template>
            New Tag
          </n-button>
        </template>
      </n-dynamic-tags>
      <n-input placeholder="Search" />
    </section>
    <section class="results">
      <EventCard v-for="event in mockData" :data="event" :key="event.id" />
    </section>
  </div>
</template>

<script lang="ts">
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import {
  AutoCompleteInst,
  NAutoComplete,
  NButton,
  NDatePicker,
  NDynamicTags,
  NInput,
} from "naive-ui";
import { computed, defineComponent, nextTick, ref, watch } from "vue";

export default defineComponent({
  name: "SearchView",
  components: {
    EventCard,
    NDatePicker,
    NInput,
    NButton,
    NAutoComplete,
    NDynamicTags,
  },
  setup() {
    const autoCompleteInstRef = ref<AutoCompleteInst | null>(null);
    watch(autoCompleteInstRef, (value) => {
      if (value) nextTick(() => value.focus());
    });
    const inputValueRef = ref("");
    const options = computed(() => {
      if (inputValueRef.value === null) {
        return [];
      }
      const prefix = inputValueRef.value.split("@")[0];
      const inputSuffix = inputValueRef.value.split("@")[1];
      if (inputSuffix) {
        return [
          {
            label: prefix + "@" + inputSuffix,
            value: prefix + "@" + inputSuffix,
          },
        ];
      }
      return ["@gmail.com", "@163.com", "@qq.com"].map((suffix) => {
        return {
          label: prefix + suffix,
          value: prefix + suffix,
        };
      });
    });
    return {
      autoCompleteInstRef,
      tags: ref(["Free Drinks", "Open To All"]),
      inputValue: inputValueRef,
      options,
    };
  },
  data() {
    return {
      mockData: [
        {
          name: "Concert in the Park",
          description: "Join us for a live music concert in the park",
          image_url: "https://picsum.photos/seed/concert/1920/1080",
          organizer: "Music Society",
          location: "Central Park",
          date_time: "2023-06-15 19:30:00",
          ticket_price: 25.99,
          latitude: 40.7829,
          longitude: -73.9654,
          id: 1,
          tags: ["Open to all", "Free Cake", "Alcohol free"],
        },
        {
          name: "Football Tournament",
          description: "Participate in the annual football tournament",
          image_url: "https://picsum.photos/seed/football/1920/1080",
          organizer: "Sports Club",
          location: "City Stadium",
          date_time: "2023-07-10 10:00:00",
          ticket_price: 10.0,
          latitude: 40.7128,
          longitude: -74.006,
          id: 2,
          tags: ["Free Cake", "Alcohol free"],
        },
        {
          name: "Art Exhibition",
          description: "Explore a collection of contemporary art",
          image_url: "https://picsum.photos/seed/art/1920/1080",
          organizer: "Art Association",
          location: "Gallery XYZ",
          date_time: "2023-06-30 14:00:00",
          ticket_price: 5.99,
          latitude: 40.7406,
          longitude: -73.9903,
          id: 3,
          tags: ["Open to all", "Alcohol free"],
        },
        {
          name: "Food Festival",
          description: "Experience a variety of culinary delights",
          image_url: "https://picsum.photos/seed/food/1920/1080",
          organizer: "Food Lovers Society",
          location: "Town Square",
          date_time: "2023-07-22 12:00:00",
          ticket_price: 0.0,
          latitude: 40.7589,
          longitude: -73.9851,
          id: 4,
          tags: ["Open to all", "Free Cake", "Alcohol free"],
        },
        {
          name: "Tech Conference",
          description: `We are excited to invite you to our upcoming event on modern Javascript! As technology continues to advance at an unprecedented rate, it's essential to stay up-to-date with the latest trends and developments in the field. Our event is the perfect opportunity to do just that.

At our event, you'll have the chance to learn about modern Javascript, one of the most widely used programming languages in the world. Our expert speakers will provide valuable insights into the latest techniques and best practices for using Javascript to create innovative and cutting-edge applications.

Not only will you learn from some of the top minds in the industry, but you'll also have the opportunity to network with other professionals and enthusiasts who share your passion for technology. Whether you're a seasoned developer or just starting out, our event is the perfect place to connect with like-minded individuals and expand your knowledge and skills.

So don't miss out on this incredible opportunity to learn about modern Javascript and connect with other technology enthusiasts. Register today to secure your spot at our event!`,
          image_url: "https://picsum.photos/seed/tech/1920/1080",
          organizer: "Tech Association",
          location: "Conference Center",
          date_time: "2023-08-05 09:00:00",
          ticket_price: 50.0,
          latitude: 40.7282,
          longitude: -74.0776,
          id: 5,
          tags: ["Open to all"],
        },
      ],
    };
  },
});
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.form-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  * {
    margin-bottom: 1rem;
  }
  padding: 1rem;
}
</style>
