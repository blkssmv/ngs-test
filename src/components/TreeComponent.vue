<template>
  <div>
    <button @click="rerenderPage">Rerender Page</button>
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
import axios from "axios";
import TreeItem from "./TreeItem.vue";

interface Item {
  id: string;
  title: string;
  parent_id: string | null;
}

export default defineComponent({
  components: { TreeItem },
  setup() {
    const items = ref<Item[]>([]);
    const openedIds = ref<string[]>(
      JSON.parse(localStorage.getItem("openedIds") || "[]")
    );

    const fetchItems = async () => {
      const response = await axios.get<Item[]>(
        "https://64b4c8450efb99d862694609.mockapi.io/tree/items"
      );
      items.value = response.data;
    };

    const rerenderPage = () => {
      location.reload();
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
      rerenderPage,
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
  color: white;
  padding: 10px 30px;
  margin: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(
    to right,
    #f6e6ad 0%,
    #f5d064 51%,
    #f1b74b 100%
  );
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: 0.5s;

  &:hover {
    background-position: right center;
  }
}
</style>
