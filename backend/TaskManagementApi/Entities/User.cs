using System;
using System.Collections.Generic;

namespace TaskManagementApi.Entities
{
    // Student ID: 00012122
    public class User
    {
        public int Id { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = default!;
        public ICollection<EntityTask> EntityTask { get; set; } = default!;
    }
}
