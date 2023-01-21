package com.jolampi.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class BooksControllerTests {

  @Value(value = "${local.server.port}")
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  private static final String urlTemplate = "http://localhost:%s/books";
  private static final String urlTemplateWithId = "http://localhost:%s/books/%d";

  @Test
  public void canAddBook() throws Exception {
    Book book = postAndGetBook(new NewBook("Test", "", "Book to add"));
    String url = String.format(urlTemplateWithId, port, book.getId());
    assertEquals(HttpStatus.OK, this.restTemplate.getForEntity(url, Book.class).getStatusCode());
  }

  @Test
  public void canDeleteBook() throws Exception {
    Book book = postAndGetBook(new NewBook("Test", "", "Book to delete"));
    String url = String.format(urlTemplateWithId, port, book.getId());
    this.restTemplate.delete(url);
    assertEquals(
      HttpStatus.NOT_FOUND,
      this.restTemplate.getForEntity(url, Book.class).getStatusCode()
    );
  }

  @Test
  public void canEditBook() throws Exception {
    NewBook initialBook = new NewBook("Test", "", "Book to edit");
    Book book = postAndGetBook(initialBook);
    String url = String.format(urlTemplateWithId, port, book.getId());
    NewBook editedNewBook = new NewBook(
      initialBook.title(),
      initialBook.author(),
      "Edited description."
    );
    this.restTemplate.put(url, editedNewBook, String.class);
    Book editedBook = this.restTemplate.getForEntity(url, Book.class).getBody();
    if (editedBook == null) {
      fail();
      return;
    }
    assertEquals(editedNewBook.description(), editedBook.getDescription());
  }

  /**
   * Helper function that posts and fetches the given book. Matching for results is only done based
   * on author and title, so caller should be aware of duplicates.
   */
  private Book postAndGetBook(NewBook newBook) throws Exception {
    String url = String.format(urlTemplate, port);
    this.restTemplate.postForEntity(url, newBook, String.class);
    Book[] books = this.restTemplate.getForEntity(url, Book[].class).getBody();
    if (books == null) {
      throw new Exception();
    }
    for (Book book : books) {
      if (book.getAuthor().equals(newBook.author()) && book.getTitle().equals(newBook.title())) {
        return book;
      }
    }
    throw new Exception();
  }
}
