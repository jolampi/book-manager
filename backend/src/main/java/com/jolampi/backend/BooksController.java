package com.jolampi.backend;

import java.util.ArrayList;
import java.util.ListIterator;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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

  @GetMapping("/books/{id}")
  public Book getBookById(@PathVariable long id) {
    for (Book book : this.books) {
      if (book.id() == id) {
        return book;
      }
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
  }

  @PutMapping("/books/{id}")
  public void updateBook(@PathVariable long id, @RequestBody NewBook updatedBook) {
    ListIterator<Book> iterator = this.books.listIterator();
    while (iterator.hasNext()) {
      if (iterator.next().id() == id) {
        iterator.set(
          new Book(id, updatedBook.title(), updatedBook.author(), updatedBook.description())
        );
        return;
      }
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
  }
}
