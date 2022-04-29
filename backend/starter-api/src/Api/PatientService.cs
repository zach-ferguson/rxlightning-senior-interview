using Api.Interfaces;
using Api.Models;

namespace Api;

public class PatientService : IPatientService
{
    private readonly IConfiguration _config;

    private readonly IEncryptionService _encryptionService;

    public PatientService(IConfiguration config)
    {
        _config = config;
    }

    public Patient GetPatient(string patientId)
    {
        Patient patient = new Patient();
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri(_config["serviceUri"]);

            var responseTask = client.GetAsync("patient/" + patientId);
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadFromJsonAsync<Patient>();
                readTask.Wait();

                patient = readTask.Result;

            }
        }
        return patient;
    }


    public List<Patient> GetPatientList()
    {
        List<Patient> patients = new List<Patient>();
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri(_config["serviceUri"]);

            var responseTask = client.GetAsync("patients");
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadFromJsonAsync<List<Patient>>();
                readTask.Wait();

                patients = readTask.Result;
            }
        }

        return patients;
    }
}