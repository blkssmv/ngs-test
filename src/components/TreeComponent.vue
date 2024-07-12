<template>
  <div>
    <button @click="rerenderComponent">rerender component</button>
    <ul>
      <TreeItem
        v-for="item in rootItems"
        :key="item.id"
        :item="item"
        :all-items="items"
        :opened-ids="openedIds"
        @toggle="toggleItem"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { ITitle, getTitles } from "../api";
import TreeItem from "./TreeItem.vue";

export default defineComponent({
  components: { TreeItem },
  setup() {
    const items = ref<ITitle[]>([]);
    const openedIds = ref<string[]>(
      JSON.parse(localStorage.getItem("openedIds") || "[]")
    );

    const fetchItems = async () => {
      items.value = await getTitles();
    };

    const rerenderComponent = () => {
      items.value = [...items.value];
    };

    const toggleItem = (id: string) => {
      if (openedIds.value.includes(id)) {
        openedIds.value = openedIds.value.filter((openedId) => openedId !== id);
      } else {
        openedIds.value.push(id);
      }
      localStorage.setItem("openedIds", JSON.stringify(openedIds.value));
    };

    onMounted(fetchItems);

    const rootItems = computed(() =>
      items.value.filter((item) => item.parent_id === null)
    );

    return {
      items,
      openedIds,
      rerenderComponent,
      toggleItem,
      rootItems,
    };
  },
});
</script>

<style scoped>
button {
  text-decoration: none;
  display: inline-block;
  padding: 10px 30px;
  margin: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-size: 200% auto;
  transition: 0.5s;
  &:hover {
    background-color: #ccc;
  }
}
</style>
