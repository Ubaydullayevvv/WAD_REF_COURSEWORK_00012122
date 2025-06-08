using System;

namespace TaskManagementApi.DTOs
{
    // Student ID: 00012122
    public class UserDto
    {
        public int Id { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string Email { get; set; } = default!;
    }
}
