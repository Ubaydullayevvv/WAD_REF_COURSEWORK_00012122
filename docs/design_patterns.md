# Design Patterns Used

## Repository Pattern
Before applying repository pattern, controllers directly accessed `DbContext`.

```csharp
// Before
public class TasksController : ControllerBase {
    private readonly AppDbContext _context;
    public TasksController(AppDbContext context) { _context = context; }
    // CRUD methods using _context.Tasks
}
```

After applying repository pattern, controllers depend on `IRepository` abstraction.

```csharp
// After
public class TasksController : ControllerBase {
    private readonly IRepository<Task> _repository;
    public TasksController(IRepository<Task> repository) { _repository = repository; }
    // CRUD methods using _repository
}
```

## DTO Pattern
Before using DTOs, entities were returned directly from controllers.

```csharp
return await _context.Tasks.ToListAsync();
```

After implementing DTOs, controllers map entities to DTO classes to decouple API from database models.

```csharp
var tasks = await _repository.GetAllAsync();
return Ok(tasks.Select(t => new TaskDto { Id = t.Id, Title = t.Title }));
```

// Student ID: 00012122
