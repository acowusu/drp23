<template>
  <div class="home">
    <ais-instant-search :search-client="searchClient" :index-name="searchIndex">
      <section class="form-search">
        <ais-search-box />
        <n-collapse>
          <n-collapse-item title="Filter" name="4">
            <h3>Date</h3>
            <ais-range-input attribute="timestamp">
              <template
                v-slot="{ currentRefinement, range, canRefine, refine }"
              >
                <TimestampRangePicker
                  :disabled="!canRefine"
                  :start="currentRefinement.min"
                  :end="currentRefinement.max"
                  :min="range.min"
                  :max="range.max"
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
              <EventCard
                v-for="item in items"
                :key="item.objectID"
                :data="addEventID(item)"
                @updateSelected="updateSelected"
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
import { connectRefinementList } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch/vue3/es";

import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
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
import { NCollapse, NCollapseItem } from "naive-ui";
import { defineComponent } from "vue";
const searchable_app_id = process.env.VUE_APP_searchable_app_id;
const searchable_read_key = process.env.VUE_APP_searchable_read_key;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const searchClient = algoliasearch(searchable_app_id!, searchable_read_key!);
const searchIndex = process.env.VUE_APP_searchable_index;
export default defineComponent({
  name: "SearchView",
  components: {
    EventCard,
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
  mixins: [
    createWidgetMixin({
      connector: connectRefinementList,
    }),
  ],
  computed: {
    // options(): { label: string; value: string }[]{
    //   return this.refinementItems.map((item: { label: string; value: string } ) => ({
    //     label: item.label,
    //     value: item.value,
    //   }));
    // },
    widgetParams(): { attribute: string } {
      return {
        attribute: "tags",
      };
    },
  },
  data() {
    console.log(process.env);
    return {
      selectedTags: [] as string[],
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
  max-width: 800px;
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
