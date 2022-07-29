<script>
import chunk from 'lodash/chunk'

export default {
  name: 'Tiles',
  props: {
    maxPerRow: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      windowOuterWidth: 0
    }
  },
  computed: {
    newMaxPerRow () {
      return (this.windowOuterWidth >= 769 && this.windowOuterWidth <= 1024) ? 2 : this.maxPerRow
    }
  },
  mounted () {
    this.updateWindowOuterWidth()
    window.addEventListener('resize', this.updateWindowOuterWidth)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.updateWindowOuterWidth)
  },
  methods: {
    renderAncestor (createElement, elements) {
      return createElement('div', { attrs: { class: 'tile is-ancestor' } }, elements.map((element) => {
        return createElement('div', { attrs: { class: 'tile is-parent' } }, [element])
      }))
    },
    updateWindowOuterWidth () {
      this.windowOuterWidth = window.outerWidth
    }
  },
  render (createElement) {
    /*if (this.$slots.default.length <= this.newMaxPerRow) {
      return this.renderAncestor(createElement, this.$slots.default)
    } else {
      return createElement('div', { attrs: { class: 'is-tiles-wrapper' } }, chunk(this.$slots.default, this.newMaxPerRow).map((group) => {
        return this.renderAncestor(createElement, group)
      }))
    }*/
    return '';
  }
}
</script>
