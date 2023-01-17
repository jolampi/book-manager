package com.jolampi.backend;

import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BooksController {

  @GetMapping("/books")
  public ArrayList<Book> getBooks() {
    ArrayList<Book> books = new ArrayList<>();
    books.add(new Book(0, "Game Programming Patterns", "Robert Nystrom", ""));
    books.add(new Book(1, "Programming Pearls", "Jon Bentley", ""));
    return books;
  }
}
