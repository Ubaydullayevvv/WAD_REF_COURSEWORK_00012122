using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementApi.Data;
using TaskManagementApi.DTOs;
using TaskManagementApi.Entities;
using TaskManagementApi.Repositories;
using EntityTask = TaskManagementApi.Entities.EntityTask;

namespace TaskManagementApi.Controllers
{
    // Student ID: 00012122
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly IRepository<EntityTask> _repository;
        public TasksController(IRepository<EntityTask> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var tasks = await _repository.GetAllAsync();
            return Ok(tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DueDate = t.DueDate,
                Priority = t.Priority,
                IsCompleted = t.IsCompleted,
                UserId = t.UserId
            }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await _repository.GetByIdAsync(id);
            if (task == null) return NotFound();
            return Ok(new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority,
                IsCompleted = task.IsCompleted,
                UserId = task.UserId
            });
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto dto)
        {
            var task = new EntityTask
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Priority = dto.Priority,
                IsCompleted = dto.IsCompleted,
                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow
            };
            await _repository.AddAsync(task);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskDto dto)
        {
            var task = await _repository.GetByIdAsync(id);
            if (task == null) return NotFound();
            task.Title = dto.Title;
            task.Description = dto.Description;
            task.DueDate = dto.DueDate;
            task.Priority = dto.Priority;
            task.IsCompleted = dto.IsCompleted;
            await _repository.UpdateAsync(task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
