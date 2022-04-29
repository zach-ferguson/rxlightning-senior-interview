using Api.Models;

namespace Api.Interfaces;

public interface ILoginService
{
    string? Login(LoginRequest loginRequest);
    bool IsValidToken(string authorization);
}