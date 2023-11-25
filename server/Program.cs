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

    if (user != null)
    {
        // Include related tasks using lazy loading
        var authenticatedUser = db.Users.Include(u => u.Tasks).FirstOrDefault(u => u.Name == user.Name && u.Password == user.Password);

        if (authenticatedUser != null)
        {
            context.Response.StatusCode = 200;
            await context.Response.WriteAsJsonAsync(authenticatedUser);
        }
        else
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsJsonAsync(new { Message = "Login failed" });
        }
    }
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

app.MapPost("/user/refresh", async (HttpContext context, AppDb db, HttpResponse res) =>
{
    try
    {
        // Получите идентификатор пользователя из тела запроса
        using (StreamReader reader = new StreamReader(context.Request.Body))
        {
            string requestBody = await reader.ReadToEndAsync();
            var payload = JsonConvert.DeserializeObject<UserRefreshPayload>(requestBody);

            if (payload != null && int.TryParse(payload.UserId.ToString(), out int userId))
            {
                Console.WriteLine(userId);

                // Теперь у вас есть идентификатор пользователя, и вы можете использовать его для поиска пользователя в базе данных
                var user = await db.Users.Include(u => u.Tasks).FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    // Пользователь найден, возвращаем его с задачами
                    context.Response.StatusCode = 200;
                    await context.Response.WriteAsJsonAsync(user);
                }
                else
                {
                    // Пользователь не найден
                    context.Response.StatusCode = 404; // Not Found
                    await context.Response.WriteAsync("User not found");
                }
            }

        }
    }
    catch (Exception ex)
    {
        // Обработка исключений, если что-то пошло не так
        Console.Error.WriteLine($"Error processing user refresh request: {ex.Message}");
        context.Response.StatusCode = 500; // Internal Server Error
        await context.Response.WriteAsync("Internal Server Error");
    }
});


app.MapPost("/task", async (HttpContext context, AppDb db) =>
{
    try
    {
        // Read task data from the request body
        var newTask = await context.Request.ReadFromJsonAsync<Task>();

        // Print details for debugging
        Console.WriteLine($"New Task: {System.Text.Json.JsonSerializer.Serialize(newTask)}");

        if (newTask != null)
        {
            // Add the task to the database
            db.Tasks.Add(newTask);
            await db.SaveChangesAsync();

            context.Response.StatusCode = 201; // Created
            await context.Response.WriteAsJsonAsync(newTask);
        }

    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error adding task: {ex.Message}");
        context.Response.StatusCode = 500; // Internal Server Error
        await context.Response.WriteAsJsonAsync(new { Message = "Internal Server Error" });
    }
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

    // Use 'virtual' to enable lazy loading
    public virtual List<Task> Tasks { get; set; }

    public User()
    {
        Tasks = new List<Task>();
    }
}

public class UserRefreshPayload
{
    public int UserId { get; set; }
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

    // Store only UserId, not the full User object
    public int UserId { get; set; }

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
