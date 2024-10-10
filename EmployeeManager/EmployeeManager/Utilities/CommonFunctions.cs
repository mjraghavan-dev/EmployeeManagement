using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;


namespace EmployeeManager.Utilities
{
    public class CommonFunctions
    {
        private readonly string secretKey;
        private readonly IConfiguration _configuration;

        public CommonFunctions(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration)); // Assign the injected IConfiguration instance
            secretKey = _configuration.GetValue<string>("Jwt:Key");
        }
        public string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        // Helper method to verify the password
        public bool VerifyPassword(string password, string hashedPassword)
        {
            var hash = HashPassword(password); // Hash the input password
            return hash == hashedPassword; // Compare with stored hashed password
        }

        // Helper method to generate JWT tokens
        public async Task<(string accessToken, string refreshToken)> CreateTokens(dynamic payload)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, payload.email.ToString()),
                    new Claim(ClaimTypes.MobilePhone, payload.phone.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, payload.user.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);

            var refreshToken = accessToken;

            return (accessToken, refreshToken);
        }
    }
}
