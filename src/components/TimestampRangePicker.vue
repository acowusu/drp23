<template>
  <n-date-picker
    type="datetimerange"
    clearable
    :read-only="disabled"
    default-time="13:22:11"
    v-model:value="range"
    :is-date-disabled="isDateDisabled"
    :on-clear="handleClear"
  />
</template>
<script>
import { defineComponent } from "vue";
import { NDatePicker } from "naive-ui";
export default defineComponent({
  name: "TimestampRangePicker",
  components: { NDatePicker },
  emits: ["change"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Number,
      default: Date.now(),
    },
    end: {
      type: Number,
      default: Date.now() + 1000 * 60 * 60 * 24 * 365 * 10,
    },
    min: {
      type: Number,
      default: Date.now() - 1000 * 60 * 60 * 24,
    },
    max: {
      type: Number,
      default: Date.now() + 1000 * 60 * 60 * 24 * 365 * 10,
    },
  },
  data: function () {
    return {
      range: [this.start, this.end],
    };
  },
  watch: {
    range: function (newVal) {
      console.log(newVal);
      if (newVal?.length === 2) {
        this.$emit("change", { min: newVal[0], max: newVal[1] });
      } else {
        this.$emit("change", { min: this.min, max: this.max });
      }
    },
  },
  methods: {
    isDateDisabled(date) {
      return date <= this.min || date >= this.max;
    },
    handleClear() {
      this.range = [this.min, this.max];
    },
  },
});
</script>
