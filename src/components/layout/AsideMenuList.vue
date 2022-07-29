<template>
  <ul class="menu-list">
    <aside-menu-item v-for="item in menu" :key="item.index"
      :item="item"
      @menu-click="menuClick"
    />
  </ul>
</template>

<script>

  import { ref } from 'vue';
  import AsideMenuItem from '@/components/layout/AsideMenuItem.vue';

  export default {
    name: 'AsideMenuList',
    components: {
      AsideMenuItem
    },
    emits: ['menu-click'],
    setup (props, { emit }) {
      const menuClick = item => {
        emit('menu-click', item)
      }
      const menu = ref([]);
      return {
        menu,
        menuClick
      }
    }
  }
</script>
