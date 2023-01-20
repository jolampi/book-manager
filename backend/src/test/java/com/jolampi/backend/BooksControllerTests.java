package com.jolampi.backend;

import static org.assertj.core.api.Assertions.assertThat;
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
    Book book = postAndGetBook(new NewBook("Book to add", "Test", ""));
    String url = String.format(urlTemplateWithId, port, book.id());
    assertThat(this.restTemplate.getForEntity(url, Book.class).getStatusCode())
      .isEqualTo(HttpStatus.OK);
  }

  @Test
  public void canDeleteBook() throws Exception {
    Book book = postAndGetBook(new NewBook("Book to delete", "Test", ""));
    String url = String.format(urlTemplateWithId, port, book.id());
    this.restTemplate.delete(url);
    assertThat(this.restTemplate.getForEntity(url, Book.class).getStatusCode())
      .isEqualTo(HttpStatus.NOT_FOUND);
  }

  @Test
  public void canEditBook() throws Exception {
    NewBook initialBook = new NewBook("Book to edit", "Test", "");
    Book book = postAndGetBook(initialBook);
    String url = String.format(urlTemplateWithId, port, book.id());
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
    assertEquals(editedNewBook.description(), editedBook.description());
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
      if (book.author().equals(newBook.author()) && book.title().equals(newBook.title())) {
        return book;
      }
    }
    throw new Exception();
  }
}
