<template>
  <div class="column is-full">
    <no-ssr>
      <vue-tags-input
        v-model="tag"
        :tags="selfTags"
        @tags-changed="onTagsChanged"
      />
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'TagsInput',
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tag: '',
      selfTags: [],
    };
  },
  watch: {
    tags() {
      this.selfTags = this.tags;
    },
  },
  beforeMount() {
    this.selfTags = this.tags;
  },
  methods: {
    onTagsChanged(newTags) {
      this.selfTags = newTags;
      this.$emit('changed', newTags);
    },
  },
};
</script>

<style lang="scss">
$turquoise: hsl(171, 100%, 41%);
$red: hsl(348, 100%, 61%);

.vue-tags-input {
  max-width: 100% !important;
}
.ti-input {
  border-color: $turquoise !important;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}
.ti-input:active, .ti-input:focus {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}
.vue-tags-input .ti-tag {
  background-color: $turquoise;
  color: white;
  font-weight: 700;
}
.vue-tags-input .ti-tag:after {
  background-color: $red !important;
}
</style>
