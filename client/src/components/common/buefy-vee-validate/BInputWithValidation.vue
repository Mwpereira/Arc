<template>
  <ValidationProvider
      v-slot="{ errors, valid }"
      :name="$attrs.name || $attrs.label"
      :rules="rules"
      :vid="vid"
  >
    <b-field
        v-bind="$attrs"
        :auto-id="fieldAutoId"
        :message="errors"
        :type="{ 'is-danger': errors[0], 'is-success': valid }"
        style="margin-bottom: 12px"
    >
      <b-input v-model="innerValue" v-bind="$attrs" :auto-id="inputAutoId"></b-input>
    </b-field>
  </ValidationProvider>
</template>

<script>
import {ValidationProvider} from "vee-validate";

export default {
  components: {
    ValidationProvider
  },
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ""
    },
    // Must be included in props
    value: {
      type: null
    },
    fieldAutoId: {
      type: String
    },
    inputAutoId: {
      type: String
    },
  },
  data: () => ({
    innerValue: ""
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>
