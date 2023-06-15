<template>
  <div class="home">
    <ais-instant-search :search-client="searchClient" :index-name="searchIndex">
      <SearchPage></SearchPage>
    </ais-instant-search>
  </div>
</template>

<script lang="ts">
const {
  AisInstantSearch,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("vue-instantsearch/vue3/es");

import SearchPage from "@/components/SearchPage.vue";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite-min.css";
import { defineComponent } from "vue";
const searchable_app_id = process.env.VUE_APP_searchable_app_id;
const searchable_read_key = process.env.VUE_APP_searchable_read_key;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const searchClient = algoliasearch(searchable_app_id!, searchable_read_key!);
const searchIndex = process.env.VUE_APP_searchable_index;
export default defineComponent({
  name: "SearchView",
  components: {
    SearchPage,
  },

  data() {
    return {
      searchClient,
      searchIndex,
    };
  },
});
</script>
