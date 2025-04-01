import axios from 'axios'

import type { Book, NewBook } from './backend.types'

const BASE_URL = 'http://localhost:8080'

/**
 * Posts a new book to the backend.
 */
export async function createBook(newBook: NewBook): Promise<void> {
  const res = await axios.post(`${BASE_URL}/books`, newBook)
  return res.data
}

/**
 * Gets all books from the backend.
 */
export async function getBooks(): Promise<Array<Book>> {
  const res = await axios.get(`${BASE_URL}/books`)
  return res.data
}

/**
 * Updates updated book in the backend.
 */
export async function updateBook(id: number, updatedBook: NewBook): Promise<void> {
  const res = await axios.put(`${BASE_URL}/books/${id}`, updatedBook)
  return res.data
}

/**
 * Deletes the book in the backend.
 */
export async function deleteBook(id: number): Promise<void> {
  const res = await axios.delete(`${BASE_URL}/books/${id}`)
  return res.data
}
