using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PatientController
{
    private readonly IPatientService _patientService;
    private readonly ILoginService _loginService;
    private readonly IEncryptionService _encryptionService;


    public PatientController(IPatientService patientService, ILoginService loginService, IEncryptionService encryptionService)
    {
        _patientService = patientService;
        _loginService = loginService;
        _encryptionService = encryptionService;
    }

    
    [ProducesResponseType(200)]
    [HttpGet("{patientId}")]
    public IActionResult GetPatient([FromHeader]string authorization, string patientId)
    {
        if (_loginService.IsValidToken(authorization))
        {

            var decryptedId = _encryptionService.Decrypt(patientId);
            var patient = _patientService.GetPatient(decryptedId);

            string encryptedId = _encryptionService.Encrypt(patient.PatientId);

            patient.PatientId = encryptedId;
            
            return new OkObjectResult(patient);
        }

        return new UnauthorizedResult();
    }

    
    [ProducesResponseType(200)]
    [HttpGet("List")]
    public IActionResult GetPatientList([FromHeader]string authorization)
    {
        if (_loginService.IsValidToken(authorization))
        {
            var patients = _patientService.GetPatientList();

            foreach (var patient in patients)
            {
                patient.PatientId = _encryptionService.Encrypt(patient.PatientId);
            };

            return new OkObjectResult(patients);
        }
        return new UnauthorizedResult();
    }
}