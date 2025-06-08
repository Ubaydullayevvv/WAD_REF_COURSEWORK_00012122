using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskManagementApi.Repositories
{
    // Student ID: 00012122
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}
