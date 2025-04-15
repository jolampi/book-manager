using Microsoft.EntityFrameworkCore;

namespace bookmanager.Services;

public class BooksService(BooksContext booksContext)
{
    public async Task<Book> CreateAsync(Book newBook)
    {
        var book = await booksContext.Books.AddAsync(newBook);
        await booksContext.SaveChangesAsync();
        return book.Entity;
    }

    public async Task<IEnumerable<Book>> GetAllAsync()
    {
        return await booksContext.Books.ToListAsync();
    }

    public async Task<Book> GetByIdAsync(int id)
    {
        var book = await booksContext.Books
            .Where(book => book.Id == id)
            .FirstOrDefaultAsync();
        return book ?? throw new KeyNotFoundException();
    }

    public async Task<Book> UpdateAsync(int id, Book updateFrom)
    {
        var book = await GetByIdAsync(id);
        book.Author = updateFrom.Author;
        book.Description = updateFrom.Description;
        book.Title = updateFrom.Title;
        await booksContext.SaveChangesAsync();
        return book;
    }

    public async Task DeleteAsync(int id)
    {
        var book = await GetByIdAsync(id);
        booksContext.Remove(book);
        await booksContext.SaveChangesAsync();
    }
}
