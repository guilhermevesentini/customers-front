<<<<<<< HEAD
import { reactive } from "vue";

const filters = reactive({
  search: "",
  month: new Date(),
});

export default function useClientsFilters() {
  return {
    filters,
  };
}
=======
import { reactive } from 'vue'

const filters = reactive({
  search: '',
  month: new Date()
})

export default function useClientsFilters() {
  return {
    filters
  }
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
