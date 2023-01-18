package com.jolampi.backend;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class BooksControllerTests {

  @Value(value = "${local.server.port}")
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  private static final String urlTemplate = "http://localhost:%s/books";

  @Test
  public void canAddAndGetBook() throws Exception {
    String url = String.format(urlTemplate, port);
    NewBook newBook = new NewBook("Game Programming Patterns", "Robert Nystrom", "");
    this.restTemplate.postForObject(url, newBook, String.class);
    assertThat(this.restTemplate.getForObject(url, String.class))
      .contains("Game Programming Patterns");
  }
}
