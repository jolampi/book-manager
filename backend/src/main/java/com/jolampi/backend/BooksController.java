package com.jolampi.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class BooksController {

  @Autowired
  private BookRepository bookRepository;

  @GetMapping("/books")
  public Iterable<Book> getBooks() {
    return bookRepository.findAll();
  }

  @PostMapping("/books")
  public void postBook(@RequestBody NewBook newBook) {
    Book book = new Book(newBook.author(), newBook.description(), newBook.title());
    bookRepository.save(book);
  }

  @GetMapping("/books/{id}")
  public Book getBookById(@PathVariable long id) {
    return bookRepository
      .findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  @DeleteMapping("/books/{id}")
  public void deleteBookById(@PathVariable long id) {
    bookRepository.deleteById(id);
  }

  @PutMapping("/books/{id}")
  public void updateBook(@PathVariable long id, @RequestBody NewBook updatedBook) {
    Book book = bookRepository
      .findById(id)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    book.setAuthor(updatedBook.author());
    book.setDescription(updatedBook.description());
    book.setTitle(updatedBook.title());
    bookRepository.save(book);
  }
}
