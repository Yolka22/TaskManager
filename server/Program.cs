var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});

var app = builder.Build();




app.UseCors();

app.MapGet("/", () => "hello world!!");
app.MapGet("/isonline", () => true);

app.Run();
