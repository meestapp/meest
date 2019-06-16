<template>
  <div class="columns">
    <div class="column is-half">
      <textarea
        class="textarea"
        rows="15"
        :value="input"
        @input="update"
      >
      </textarea>
    </div>
    <div class="column is-half">
      <div class="textarea md-preview" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import marked from 'marked';

export default {
  name: 'MarkdownEditor',
  props: {
    mdInput: {
      type: String,
      default: '#### You can write markdown here',
      required: false,
    },
  },
  data() {
    return {
      input: '',
    };
  },
  computed: {
    ...mapState('meetings', [
      'draft',
    ]),
    compiledMarkdown() {
      const mdContent = marked(this.input, {
        renderer: this.$markedCustomRenderer,
        sanitize: true,
      });
      return `
        <div class="content">
          ${mdContent}
        </div>
      `;
    },
  },
  beforeMount() {
    this.input = this.mdInput;
  },
  methods: {
    ...mapActions('meetings', [
      'setDescription',
    ]),
    update(e) {
      this.$emit('input', e.target.value);
      this.input = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  border: none;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  padding: 20px;
  &.md-preview {
    height: 100%;
  }
}
</style>
