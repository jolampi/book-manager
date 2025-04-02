import { ref, watchEffect } from 'vue'

import * as booksApi from '../services/backend'
import type { Book, NewBook } from '../services/backend.types'

export function useBooks() {
  const books = ref<Book[]>([])

  watchEffect(async () => {
    await fetchData()
  })

  async function create(newBook: NewBook): Promise<void> {
    await booksApi.createBook(newBook)
    await fetchData()
  }

  async function update(book: Book) {
    const id = book.id
    await booksApi.updateBook(id, book)
    await fetchData()
  }

  async function remove(id: number) {
    await booksApi.deleteBook(id)
    await fetchData()
  }

  async function fetchData() {
    const response = await booksApi.getBooks()
    response.sort((a, b) => a.title.localeCompare(b.title))
    books.value = response
  }

  return { books, create, update, remove }
}
