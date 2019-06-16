import Vue from 'vue';
import marked from 'marked';

const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  if ((level <= 6) && (level > 0)) {
    return `<h${level} class="title is-${level}">${text}</h${level}>`;
  }
  return `<h${level}>${text}</h${level}>`;
};

Vue.prototype.$markedCustomRenderer = renderer;
