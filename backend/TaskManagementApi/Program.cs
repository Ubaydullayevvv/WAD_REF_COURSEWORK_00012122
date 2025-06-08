using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Entities;
using TaskManagementApi.Repositories;

var builder = WebApplication.CreateBuilder(args);
    // Student ID: 00012122

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TaskManagementApi.Data.AppDbContext>(options =>
    options.UseInMemoryDatabase("TaskDb"));

builder.Services.AddScoped<IRepository<EntityTask>, TaskRepository>();
builder.Services.AddScoped<IRepository<User>, GenericRepository<User>>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();