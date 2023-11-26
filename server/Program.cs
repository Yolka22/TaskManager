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

    if (user != null)
    {
        // Include related tasks using lazy loading
        var authenticatedUser = db.Users
        .Include(u => u.Tasks)
        .ThenInclude(t => t.Subtasks)
        .FirstOrDefault(u => u.Name == user.Name && u.Password == user.Password);

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
        // Get the user ID from the request body
        using (StreamReader reader = new StreamReader(context.Request.Body))
        {
            string requestBody = await reader.ReadToEndAsync();
            var payload = JsonConvert.DeserializeObject<UserRefreshPayload>(requestBody);

            if (payload != null && int.TryParse(payload.UserId.ToString(), out int userId))
            {
                // Retrieve the user with tasks and subtasks
                var user = await db.Users
                    .Include(u => u.Tasks)
                        .ThenInclude(t => t.Subtasks)
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    // User found, return with tasks and subtasks
                    context.Response.StatusCode = 200;
                    await context.Response.WriteAsJsonAsync(user);
                }
                else
                {
                    // User not found
                    context.Response.StatusCode = 404; // Not Found
                    await context.Response.WriteAsync("User not found");
                }
            }
        }
    }
    catch (Exception ex)
    {
        // Handle exceptions if something goes wrong
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

app.MapDelete("/task/{taskId}", async (HttpContext context, AppDb db) =>
{
    // Get the task ID from the route parameters
    if (context.Request.RouteValues.TryGetValue("taskId", out var taskIdValue) &&
        int.TryParse(taskIdValue?.ToString(), out var taskId))
    {
        try
        {
            // Find the task by ID
            var taskToDelete = db.Tasks.FirstOrDefault(t => t.Id == taskId);

            if (taskToDelete != null)
            {
                // Remove the task from the context and save changes
                db.Tasks.Remove(taskToDelete);
                await db.SaveChangesAsync();

                // Send a success response if the task is deleted successfully
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync("Task deleted successfully");
            }
            else
            {
                // Task not found
                context.Response.StatusCode = 404; // Not Found
                await context.Response.WriteAsync("Task not found");
            }
        }
        catch (Exception ex)
        {
            // Handle the exception and send an error response
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync($"Error deleting task: {ex.Message}");
        }
    }
    else
    {
        // Invalid or missing task ID in the route parameters
        context.Response.StatusCode = 400; // Bad Request
        await context.Response.WriteAsync("Invalid or missing task ID");
    }
});




app.MapPost("/subtask", async (HttpContext context, AppDb db) =>
{
    try
    {
        // Read subtask data from the request body
        var subtaskData = await context.Request.ReadFromJsonAsync<Subtask>();

        // Print details for debugging
        Console.WriteLine($"New Subtask: {System.Text.Json.JsonSerializer.Serialize(subtaskData)}");

        if (subtaskData != null)
        {
            // Check if the associated task exists
            var associatedTask = await db.Tasks.FirstOrDefaultAsync(t => t.Id == subtaskData.TaskId);

            if (associatedTask != null)
            {
                // Add the subtask to the database
                db.Subtasks.Add(subtaskData);
                await db.SaveChangesAsync();

                context.Response.StatusCode = 201; // Created
                await context.Response.WriteAsJsonAsync(subtaskData);
            }
            else
            {
                // Associated task not found
                context.Response.StatusCode = 404; // Not Found
                await context.Response.WriteAsync("Associated task not found");
            }
        }
        else
        {
            // Invalid subtask data
            context.Response.StatusCode = 400; // Bad Request
            await context.Response.WriteAsync("Invalid subtask data");
        }

    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error adding subtask: {ex.Message}");
        context.Response.StatusCode = 500; // Internal Server Error
        await context.Response.WriteAsJsonAsync(new { Message = "Internal Server Error" });
    }
});

app.MapDelete("/subtask/{subtaskId}", async (HttpContext context, AppDb db) =>
{
    // Get the subtask ID from the route parameters
    if (context.Request.RouteValues.TryGetValue("subtaskId", out var subtaskIdValue) &&
        int.TryParse(subtaskIdValue?.ToString(), out var subtaskId))


    {
        try
        {
            // Find the subtask by ID
            var subtaskToDelete = db.Subtasks.FirstOrDefault(st => st.Id == subtaskId);

            if (subtaskToDelete != null)
            {
                // Remove the subtask from the context and save changes
                db.Subtasks.Remove(subtaskToDelete);
                await db.SaveChangesAsync();

                // Send a success response if the subtask is deleted successfully
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync("Subtask deleted successfully");
            }
            else
            {
                // Subtask not found
                context.Response.StatusCode = 404; // Not Found
                await context.Response.WriteAsync("Subtask not found");
            }
        }
        catch (Exception ex)
        {
            // Handle the exception and send an error response
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync($"Error deleting subtask: {ex.Message}");
        }
    }
    else
    {
        // Invalid or missing subtask ID in the route parameters
        context.Response.StatusCode = 400; // Bad Request
        await context.Response.WriteAsync("Invalid or missing subtask ID");
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
    public List<Subtask> Subtasks { get; set; } = new List<Subtask>();
}
public class Subtask
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }

    // Связь с основной задачей
    public int TaskId { get; set; }
}
