<template>
  <div
    class="card"
    :class="{'is-scrollable-height-medium':isScrollable, 'has-card-header-background':hasCardHeaderBackground, 'has-shadow':hasShadow}"
  >
    <header
      v-if="title || hasTitleSlot"
      class="card-header"
    >
      <p class="card-header-title">
        <b-icon
          v-if="icon"
          :icon="icon"
          custom-size="default"
        />
        <slot
          v-if="hasTitleSlot"
          name="title"
        />
        <span v-else-if="title">{{ title }}</span>
      </p>
      <slot
        v-if="hasButtonSlot"
        name="button"
      />
      <a
        v-else-if="headerIcon"
        href="#"
        class="card-header-icon"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <b-icon
          :icon="headerIcon"
          custom-size="default"
        />
      </a>
    </header>
    <slot name="toolbar" />
    <div class="card-content">
      <slot />
    </div>
    <footer
      v-if="hasFooterSlot"
      class="card-footer"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    },
    hasTitleSlot: Boolean,
    hasButtonSlot: Boolean,
    hasFooterSlot: Boolean,
    hasCardHeaderBackground: Boolean,
    isScrollable: Boolean,
    hasShadow: Boolean
  },
  emits: ['header-icon-click'],
  setup (props, { emit }) {
    const headerIconClick = () => {
      emit('header-icon-click')
    }

    return {
      headerIconClick
    }
  }
}
</script>
