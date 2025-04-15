using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookmanager.Controllers;

[ApiController]
[Route("[controller]")]
public class BooksController(BooksContext booksContext) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(Book book)
    {
        var result = await booksContext.Books.AddAsync(book);
        await booksContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = book.Id }, book);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetAll()
    {
        return await booksContext.Books.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetById(int id)
    {
        var book = await booksContext.Books
            .Where(book => book.Id == id)
            .FirstAsync();
        if (book is null)
        {
            return NotFound();
        }
        return book;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Book payload)
    {
        var book = await booksContext.Books
            .Where(book => book.Id == id)
            .FirstAsync();
        if (book is null)
        {
            return NotFound();
        }
        book.Author = payload.Author;
        book.Description = payload.Description;
        book.Title = payload.Title;
        await booksContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var book = await booksContext.Books
            .Where(book => book.Id == id)
            .FirstAsync();
        if (book is null)
        {
            return NotFound();
        }
        booksContext.Remove(book);
        await booksContext.SaveChangesAsync();
        return NoContent();
    }
}
