import { type MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue'

export function useQuery<T>(input: MaybeRefOrGetter<Promise<T>>, initialValue: T) {
  const data = ref<T>(initialValue)
  const loading = ref(false)
  const error = ref<unknown>(null)

  watchEffect(() => {
    refresh()
  })

  async function refresh(): Promise<void> {
    loading.value = true
    data.value = initialValue
    error.value = null
    try {
      const res = await toValue(input)
      data.value = res
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, refresh }
}
