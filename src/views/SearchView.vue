<template>
  <ais-instant-search
    :search-client="searchClient"
    :index-name="searchIndex"
    class="home"
  >
    <section class="form-search">
      <ais-search-box />
      <n-collapse>
        <n-collapse-item title="Filter" name="4">
          <h3>Date</h3>
          <ais-range-input attribute="timestamp">
            <template v-slot="{ currentRefinement, canRefine, refine }">
              <TimestampRangePicker
                :disabled="!canRefine"
                :start="currentRefinement.min"
                :end="currentRefinement.max"
                @change="refine"
              />
            </template>
          </ais-range-input>

          <h3>Price</h3>
          <ais-range-input attribute="ticket_price" />

          <h3>Tags</h3>
          <ais-refinement-list attribute="tags"> </ais-refinement-list>

          <h3>Organizers</h3>
          <ais-refinement-list attribute="society"> </ais-refinement-list>
          <h3>Clear</h3>
          <AisClearRefinements></AisClearRefinements>
        </n-collapse-item>
      </n-collapse>
    </section>
    <section class="algolia">
      <ais-hits>
        <template v-slot="{ items }">
          <div class="results">
            <div v-for="item in items" :key="item.objectID" class="result">
              <EventCard v-if="item.event_id" :data="item"></EventCard>
              <SocietyCard v-else :data="item"></SocietyCard>
            </div>
          </div>
        </template>
      </ais-hits>
    </section>
    <section class="foot">
      <ais-pagination class="pagination" v-on:page-change="onPageChange" />
      <ais-stats />
    </section>
  </ais-instant-search>
</template>

<script lang="ts">
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import SocietyCard from "@/components/SocietyCard.vue"; // @ is an alias to /src
import TimestampRangePicker from "@/components/TimestampRangePicker.vue";
const {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisPagination,
  AisStats,
  AisRefinementList,
  AisRangeInput,
  AisClearRefinements,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("vue-instantsearch/vue3/es");

import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite-min.css";
import { AutoCompleteInst, NCollapse, NCollapseItem } from "naive-ui";
import { computed, defineComponent, nextTick, ref, watch } from "vue";
const searchable_app_id = process.env.VUE_APP_searchable_app_id;
const searchable_read_key = process.env.VUE_APP_searchable_read_key;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const searchClient = algoliasearch(searchable_app_id!, searchable_read_key!);
const searchIndex = process.env.VUE_APP_searchable_index;
export default defineComponent({
  name: "SearchView",
  components: {
    EventCard,
    SocietyCard,
    AisInstantSearch,
    AisSearchBox,
    AisHits,
    AisPagination,
    AisStats,
    AisRefinementList,
    AisRangeInput,
    NCollapse,
    NCollapseItem,
    AisClearRefinements,
    TimestampRangePicker,
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
      tags: ref(["Free Drinks", "No membership required"]),
      inputValue: inputValueRef,
      options,
    };
  },
  methods: {
    onPageChange() {
      window.scrollTo(0, 0);
    },
    addEventID(item: any) {
      item.event_id = item.objectID;
      return item;
    },
  },
  data() {
    console.log(process.env);
    return {
      searchClient,
      searchIndex,
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
.foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    margin: 1rem;
  }
}
.form-search {
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
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
