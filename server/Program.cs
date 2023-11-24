var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDb>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").
            AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

var app = builder.Build();



app.UseCors();

app.MapGet("/", () => "hello world!!");
app.MapGet("/isonline", () => true);

app.MapPost("/user/login", async (HttpContext context, AppDb db) =>
{
    var user = await context.Request.ReadFromJsonAsync<User>();
    Console.WriteLine($"Received login request for user: {user?.Name}");

    // Validate user credentials (you might want to check against your list of users)

    if (user != null)
    {
        // For simplicity, I'm just checking against the predefined list of users
        var authenticatedUser = db.Users.FirstOrDefault(u => u.Name == user.Name && u.Password == user.Password);

        if (authenticatedUser != null)
        {
            // User is authenticated
            context.Response.StatusCode = 200;
            await context.Response.WriteAsJsonAsync(new { Message = "Login successful" });
        }
        else
        {
            // Authentication failed
            context.Response.StatusCode = 401;
            await context.Response.WriteAsJsonAsync(new { Message = "Login failed" });
        }
    };

});

app.MapPost("/user/register", async (HttpContext context, AppDb db, HttpResponse res) =>
{
    var user = await context.Request.ReadFromJsonAsync<User>();

    if (user != null)
    {
        db.Users.Add(user);
        await db.SaveChangesAsync();
        res.StatusCode = 201;
    };

});



app.Run();

public class AppDb : DbContext
{
    public AppDb(DbContextOptions<AppDb> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<Subtask> Subtasks { get; set; }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    // Связь с задачами пользователя
    public List<Task> Tasks { get; set; }

    public User()
    {
        Tasks = new List<Task>();
    }
}


public class Task
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Deadline { get; set; }
    public int Priority { get; set; }
    public string Hashtag { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public string AttachedFile { get; set; } = string.Empty;

    // Связь с пользователем, к которому привязана задача
    public int UserId { get; set; }
    public User User { get; set; }

    public Task()
    {
        User = new User();
        Subtasks = new List<Subtask>();
    }

    // Связь с подзадачами
    public List<Subtask> Subtasks { get; set; }
}

public class Subtask
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }

    // Связь с основной задачей
    public int TaskId { get; set; }
    public Task Task { get; set; }

    public Subtask()
    {
        Task = new Task(); // или присвойте уже существующий объект задачи
    }
}
