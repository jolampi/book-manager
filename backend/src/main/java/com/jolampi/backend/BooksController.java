package com.jolampi.backend;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BooksController {

  /** In-memory array of books. */
  private final ArrayList<Book> books = new ArrayList<>();
  /** Simple id generator to guarantee unique values. */
  private final AtomicLong idGenerator = new AtomicLong();

  @GetMapping("/books")
  public ArrayList<Book> getBooks() {
    return this.books;
  }

  @PostMapping("/books")
  public void postBook(@RequestBody NewBook newBook) {
    this.books.add(
        new Book(
          this.idGenerator.incrementAndGet(),
          newBook.title(),
          newBook.author(),
          newBook.description()
        )
      );
  }
}
