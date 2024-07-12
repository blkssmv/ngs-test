<template>
  <li :class="{ 'bg-even': isEvenLevel, 'bg-odd': !isEvenLevel }">
    <div @click="toggle" class="tree-item">
      <span
        class="tree-icon"
        :class="{ 'arrow-down': isOpened && hasChildren }"
      >
        <template v-if="hasChildren">
          <span v-if="isOpened">&#62;</span>
          <span v-else>&#62;</span>
        </template>
        <template v-else> - </template>
      </span>
      {{ item.title }}
    </div>
    <ul v-if="isOpened">
      <TreeItem
        v-for="child in children"
        :key="child.id"
        :item="child"
        :all-items="allItems"
        :opened-ids="openedIds"
        :level="level + 1"
        @toggle="toggleItem"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

interface Item {
  id: string;
  title: string;
  parent_id: string | null;
}

export default defineComponent({
  name: "TreeItem",
  props: {
    item: {
      type: Object as () => Item,
      required: true,
    },
    allItems: {
      type: Array as () => Item[],
      required: true,
    },
    openedIds: {
      type: Array as () => string[],
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const isOpened = computed(() => props.openedIds.includes(props.item.id));

    const children = computed(() =>
      props.allItems.filter((child) => child.parent_id === props.item.id)
    );

    const hasChildren = computed(() => children.value.length > 0);

    const isEvenLevel = computed(() => props.level % 2 === 0);

    const toggle = () => {
      emit("toggle", props.item.id);
    };

    const toggleItem = (id: string) => {
      emit("toggle", id);
    };

    return {
      isOpened,
      children,
      hasChildren,
      isEvenLevel,
      toggle,
      toggleItem,
    };
  },
});
</script>

<style scoped>
li {
  list-style-type: none;
  margin-left: 20px;

  &.bg-even {
    background-color: #f9f9f9;
  }

  &.bg-odd {
    background-color: #e0e0e0;
  }
}

.tree-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 5px;

  .tree-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
  }

  .arrow-down {
    transform: rotate(90deg);
  }
}
</style>
