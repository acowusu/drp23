<template>
  <div class="home">
    <ais-instant-search :search-client="searchClient" :index-name="searchIndex">
      <section class="form-search">
        <n-date-picker type="datetimerange" clearable default-time="13:22:11" />

        <ais-search-box />

        <n-collapse>
          <n-collapse-item title="Filter Price" name="1">
            <h3>Price</h3>
            <ais-range-input attribute="ticket_price" />
          </n-collapse-item>
          <n-collapse-item title="Filter Tags" name="2">
            <h3>Tags</h3>
            <ais-refinement-list attribute="tags" operator="and">
            </ais-refinement-list>
          </n-collapse-item>
          <n-collapse-item title="Filter Organizer" name="3">
            <h3>Organizers</h3>
            <ais-refinement-list attribute="society"> </ais-refinement-list>
          </n-collapse-item>
        </n-collapse>
      </section>
      <section class="algolia">
        <!-- appId="WF2U541C5T" apiKey="2d2a560f4a1a3a15997dbf16964640d6"-->

        <ais-hits>
          <template v-slot="{ items }">
            <div class="results">
              <EventCard
                v-for="item in items"
                :key="item.objectID"
                :data="addEventID(item)"
              />
            </div>
          </template>
        </ais-hits>
      </section>
      <section class="foot">
        <ais-pagination class="pagination" v-on:page-change="onPageChange" />
        <ais-stats />
      </section>
    </ais-instant-search>
  </div>
</template>

<script lang="ts">
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
const {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisPagination,
  AisStats,
  AisRefinementList,
  AisRangeInput,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("vue-instantsearch/vue3/es");

import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite-min.css";
import {
  AutoCompleteInst,
  NCollapse,
  NCollapseItem,
  NDatePicker,
} from "naive-ui";
import { computed, defineComponent, nextTick, ref, watch } from "vue";
const searchable_app_id = process.env.VUE_APP_searchable_app_id;
const searchable_read_key = process.env.VUE_APP_searchable_read_key;
const searchClient = algoliasearch(searchable_app_id!, searchable_read_key!);
const searchIndex = process.env.VUE_APP_searchable_index;
export default defineComponent({
  name: "SearchView",
  components: {
    EventCard,
    NDatePicker,
    AisInstantSearch,
    AisSearchBox,
    AisHits,
    AisPagination,
    AisStats,
    AisRefinementList,
    AisRangeInput,
    NCollapse,
    NCollapseItem,
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
