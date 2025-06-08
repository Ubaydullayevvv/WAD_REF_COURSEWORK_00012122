using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementApi.Data;
using TaskManagementApi.Entities;
using EntityTask = TaskManagementApi.Entities.EntityTask;

namespace TaskManagementApi.Repositories
{
    // Student ID: 00012122
    public class TaskRepository : IRepository<EntityTask>
    {
        private readonly AppDbContext _context;
        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<EntityTask> AddAsync(EntityTask entity)
        {
            _context.Tasks.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(new object[] { id });
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<EntityTask>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<EntityTask> GetByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(new object[] { id }) ?? throw new InvalidOperationException("Entity not found");
        }

        public async Task UpdateAsync(EntityTask entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
