using Api.Interfaces;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController
{
    private readonly ILoginService _loginService;

    public LoginController(ILoginService loginService)
    {
        _loginService = loginService;
    }
    
    [ProducesResponseType(200)]
    [HttpPost]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        var token = _loginService.Login(loginRequest);
        if (!string.IsNullOrWhiteSpace(token))
            return new OkObjectResult(token);
        return new UnauthorizedResult();
    }
}