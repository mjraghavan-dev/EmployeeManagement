using EmployeeManager.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employees> Employees { get; set; }
    }
}
