using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace EmployeeManager.Models.Entities
{
    public enum Role
    {
        Admin,
        User
    }
    public class Employees
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }  // Nullable string

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }  // Nullable string

        [Required(ErrorMessage = "Password is required")]       
        public string? Password { get; set; }  // Nullable string for password

        public string? Phone { get; set; }  // Nullable string

        public string? Dob { get; set; }  // Nullable Date

        public string? City { get; set; }  // Nullable string

        public string? State { get; set; }  // Nullable string

        public string? PostalCode { get; set; }  // Nullable string

        [Required(ErrorMessage = "Role is required")]
        public Role Role { get; set; }  // Role is required
    }

}
