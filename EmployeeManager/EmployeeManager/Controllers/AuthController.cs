using EmployeeManager.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using EmployeeManager.Models.Requests;
using EmployeeManager.Data;
using EmployeeManager.Utilities;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class authController : ControllerBase
    {
        private readonly CommonFunctions commonFunctions;
        private readonly ApplicationDbContext _context;

        public authController(IConfiguration configuration, ApplicationDbContext dbContext, CommonFunctions commonFunctions)
        {
            _context = dbContext;
            this.commonFunctions = commonFunctions; // Properly injected
        }

        // Register a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            // Check if user already exists by email
            if (_context.Employees.Any(u => u.Email == registerRequest.Email))
            {
                return Conflict(new { message = "User already exists." });
            }

            // Create a new Employees object from RegisterRequest
            var employee = new Employees
            {
                Id = Guid.NewGuid(),
                Name = registerRequest.Name,
                Email = registerRequest.Email,
                Phone = registerRequest.Phone,
                Role = registerRequest.Role == default ? Role.User : registerRequest.Role
            };

            // Hash the password before saving
            employee.Password = commonFunctions.HashPassword(registerRequest.Password);

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync(); // Use async method for saving

            // Create JWT tokens
            var payload = new
            {
                email = employee.Email,
                phone = employee.Phone,
                user = employee.Id
            };
            var (accessToken, refreshToken) = await commonFunctions.CreateTokens(payload);

            var response = new
            {
                message = "User Registered In Successfully",
                data = new
                {
                    accessToken,
                    _id = employee.Id,
                    name = employee.Name,
                    email = employee.Email,
                    phone = employee.Phone
                }
            };

            return Ok(response);
        }

        // Login an existing user
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var user = _context.Employees.FirstOrDefault(u => u.Email == loginRequest.Username || u.Phone == loginRequest.Username);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            if (user.Role != Role.Admin) // Assuming Role.Admin is the enum for Admin
            {
                return Unauthorized(new { message = "Only admins can log in." });
            }

            if (!commonFunctions.VerifyPassword(loginRequest.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }

            var payload = new
            {
                email = user.Email,
                phone = user.Phone,
                user = user.Id
            };
            var (accessToken, refreshToken) = await commonFunctions.CreateTokens(payload);

            var response = new
            {
                message = "User Logged In Successfully",
                data = new
                {
                    accessToken,
                    _id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    phone = user.Phone
                }
            };

            return Ok(response);
        }
    }
}
