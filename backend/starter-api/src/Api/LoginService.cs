using Api.Interfaces;
using Api.Models;

namespace Api;

public class LoginService : ILoginService
{
    // In production, we would use a Token auth package such as Microsoft.AspNetCore.Authentication.JwtBearer
    // to generate a new Token for each user/login

    private const string Token = "600E74C5-976C-47E6-8589-E3FD9D118095";
    
    public string? Login(LoginRequest loginRequest)
    {            
        // Here we would normally compare the loginRequest values to values in our database, with encryption
        Boolean usernameIsValid = string.Equals(loginRequest.Username, "z.h.ferguson@gmail.com", StringComparison.OrdinalIgnoreCase);
        Boolean passwordIsValid = string.Equals(loginRequest.Password, "redbanana");

        if(usernameIsValid && passwordIsValid){
            return Token;
        }
        return null;
    }
    public bool IsValidToken(string authorization)
    {
        return authorization == Token;
    }
}