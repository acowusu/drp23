<template>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" v-model:zoom="zoom" :center="[51.499075, -0.177115]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="item in items"
        :key="item"
        :lat-lng="[item.latitude, item.longitude]"
      >
        <l-popup>
          <h1>{{ item.name }}</h1>
          <p>{{ item.description }}</p>
          <p>{{ item.location }}</p>
          <p>WHEN:{{ item.date_time }}</p>
          <p>PRICE:{{ item.ticket_price }}</p>
          <router-link :to="`/event/${item?.event_id || item?.objectID}`">
            view details
          </router-link>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      zoom: 2,
    };
  },
};
</script>

<style></style>
