using System;

namespace TaskManagementApi.Entities
{
    // Student ID: 00012122
    public class EntityTask
    {
        public int Id { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public DateTime DueDate { get; set; } = default!;
        public int Priority { get; set; } = default!;
        public bool IsCompleted { get; set; } = default!;
        public int UserId { get; set; } = default!;
        public User User { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = default!;
    }
}
