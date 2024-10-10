using EmployeeManager.Data;
using EmployeeManager.Models.Entities;
using EmployeeManager.Models.Requests;
using EmployeeManager.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class employeesController : ControllerBase
    {
        private readonly CommonFunctions commonFunctions;
        private readonly ApplicationDbContext dbContext;

        public employeesController(IConfiguration configuration, ApplicationDbContext dbContext, CommonFunctions commonFunctions)
        {
            this.dbContext = dbContext;
            this.commonFunctions = commonFunctions; // Properly injected
        }

        // GET: api/employees
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var allEmployees = await dbContext.Employees
                .Select(e => new
                {
                    e.Id,
                    e.Name,
                    e.Email,
                    e.Phone,
                    Dob = e.Dob, // Assuming you want to keep Dob in the response
                    e.City,
                    e.State,
                    e.PostalCode,
                    Role = e.Role.ToString() // Convert enum to string
                })
                .ToListAsync();

            return Ok(allEmployees);
        }


        // GET api/employees/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(Guid id)
        {
            var employee = await dbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }
            return Ok(employee);
        }

        // POST api/employees
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] Employees employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for existing employee with the same email
            var existingEmail = await dbContext.Employees
                .AnyAsync(e => e.Email == employee.Email);
            if (existingEmail)
            {
                return BadRequest(new { message = "An employee with this email already exists." });
            }

            // Check for existing employee with the same phone number
            var existingPhone = await dbContext.Employees
                .AnyAsync(e => e.Phone == employee.Phone);
            if (existingPhone)
            {
                return BadRequest(new { message = "An employee with this phone number already exists." });
            }

            var newEmplyoee = employee;

            // Use CommonFunctions to hash the password
            newEmplyoee.Password = commonFunctions.HashPassword(employee.Password);
            newEmplyoee.Id = Guid.NewGuid(); // Generate a new Guid for the employee
            await dbContext.Employees.AddAsync(newEmplyoee);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
        }



        // PUT api/employees/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(Guid id, [FromBody] UpdateUserRequest updateRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingEmployee = await dbContext.Employees.FindAsync(id);
            if (existingEmployee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            // Update the fields
            existingEmployee.Name = updateRequest.Name ?? existingEmployee.Name;
            existingEmployee.Email = updateRequest.Email ?? existingEmployee.Email;
            existingEmployee.Phone = updateRequest.Phone ?? existingEmployee.Phone;
            existingEmployee.Dob = updateRequest.Dob ?? existingEmployee.Dob;
            existingEmployee.City = updateRequest.City ?? existingEmployee.City;
            existingEmployee.State = updateRequest.State ?? existingEmployee.State;
            existingEmployee.PostalCode = updateRequest.PostalCode ?? existingEmployee.PostalCode;
            existingEmployee.Role = updateRequest.Role; // Role is required, so it is directly updated

            // Explicitly mark the entity as modified in case tracking is an issue
            dbContext.Entry(existingEmployee).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id)) // Ensure that the employee still exists
                {
                    return NotFound(new { message = "Employee not found." });
                }
                else
                {
                    throw; // If some other issue occurs, throw the error
                }
            }

            // Return the updated employee to confirm success
            return Ok(new
            {
                message = "Employee updated successfully",
                data = new
                {
                    id = existingEmployee.Id,
                    name = existingEmployee.Name,
                    email = existingEmployee.Email,
                    phone = existingEmployee.Phone,
                    dob = existingEmployee.Dob,
                    city = existingEmployee.City,
                    state = existingEmployee.State,
                    postalCode = existingEmployee.PostalCode,
                    role = existingEmployee.Role
                }
            });
        }

        private bool EmployeeExists(Guid id)
        {
            return dbContext.Employees.Any(e => e.Id == id);
        }
        // DELETE api/employees/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await dbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            dbContext.Employees.Remove(employee);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Employee deleted successfully",
            });
        }
    }
}
