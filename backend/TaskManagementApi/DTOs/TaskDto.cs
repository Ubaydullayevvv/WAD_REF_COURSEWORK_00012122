using System;

namespace TaskManagementApi.DTOs
{
    // Student ID: 00012122
    public class TaskDto
    {
        public int Id { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public DateTime DueDate { get; set; } = default!;
        public int Priority { get; set; } = default!;
        public bool IsCompleted { get; set; } = default!;
        public int UserId { get; set; } = default!;
    }
}
