import axios from "axios"

import { Book, NewBook } from "./backend.types"

const BASE_URL = "http://localhost:8080"

/**
 * Gets all books from the backend.
 */
export async function getBooks(): Promise<Array<Book>> {
  const res = await axios.get(`${BASE_URL}/books`)
  return res.data
}

/**
 * Posts a new book to the backend.
 */
export async function postBook(newBook: NewBook): Promise<void> {
  const res = await axios.post(`${BASE_URL}/books`, newBook)
  return res.data
}

/**
 * Puts updated book into the backend.
 */
export async function updateBook(id: number, updatedBook: NewBook): Promise<void> {
  const res = await axios.put(`${BASE_URL}/books/${id}`, updatedBook)
  return res.data
}
