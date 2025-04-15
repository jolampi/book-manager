using Microsoft.EntityFrameworkCore;

namespace bookmanager;

public class BooksContext : DbContext
{
    public DbSet<Book> Books { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.UseNpgsql(@"Host=localhost;Username=bookmanager;Password=password;Database=postgres;Port=5432");
}

public class Book
{
    public int Id { get; set; }
    public required string Author { get; set; }
    public required string Description { get; set; }
    public required string Title { get; set; }
}
