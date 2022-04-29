using Api.Models;

namespace Api.Interfaces;

public interface IPatientService
{
    Patient GetPatient(string patientId);
    List<Patient> GetPatientList();
}