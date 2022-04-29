namespace Api.Models;

public class Patient
{
  public string PatientId { get; set; } = String.Empty;

  public string FirstName { get; set; } = String.Empty;
  public string LastName { get; set; } = String.Empty;
  public string Gender { get; set; } = String.Empty;
  public string DateOfBirth { get; set; } = String.Empty;
  public string AddressLine1 { get; set; } = String.Empty;
  public string AddressLine2 { get; set; } = String.Empty;
  public string City { get; set; } = String.Empty;
  public string State { get; set; } = String.Empty;
  public string PostalCode { get; set; } = String.Empty;
}
