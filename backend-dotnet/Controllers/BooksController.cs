using System.Threading.Tasks;
using bookmanager.Services;
using Microsoft.AspNetCore.Mvc;

namespace bookmanager.Controllers;

[ApiController]
[Route("[controller]")]
public class BooksController(BooksService booksService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Post(Book payload)
    {
        var book = await booksService.CreateAsync(payload);
        return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetAll()
    {
        var books = await booksService.GetAllAsync();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetById(int id)
    {
        var book = await booksService.GetByIdAsync(id);
        return Ok(book);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Book>> Update(int id, Book payload)
    {
        var updated = await booksService.UpdateAsync(id, payload);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await booksService.DeleteAsync(id);
        return NoContent();
    }
}
