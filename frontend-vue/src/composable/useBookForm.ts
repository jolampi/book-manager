import { ref } from 'vue'

export function useBookForm() {
  const author = ref('')
  const title = ref('')
  const description = ref('')

  function clear() {
    author.value = ''
    title.value = ''
    description.value = ''
  }

  return {
    author,
    title,
    description,
    clear,
  }
}
