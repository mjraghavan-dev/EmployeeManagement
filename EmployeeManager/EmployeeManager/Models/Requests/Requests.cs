using EmployeeManager.Models.Entities;

namespace EmployeeManager.Models.Requests
{
    public class RegisterRequest
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public Role Role { get; set; } // Assuming Role is defined in your EmployeeManager.Models.Entities namespace
    }

    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

    public class NewUserCreate
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public string? Dob { get; set; } // Date of Birth
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public Role Role { get; set; } // Assuming Role is defined in your EmployeeManager.Models.Entities namespace
    }

    public class UpdateUserRequest
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Dob { get; set; } // Date of Birth
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public Role Role { get; set; } // Assuming Role is defined in your EmployeeManager.Models.Entities namespace
    }

}
