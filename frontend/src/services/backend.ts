import axios from "axios"

import { Book } from "./backend.types"

const BASE_URL = "http://localhost:8080"

export async function getBooks(): Promise<Array<Book>> {
  const res = await axios.get(`${BASE_URL}/books`)
  return res.data
}
