namespace Api.Interfaces;

public interface IEncryptionService
{
  string Encrypt(string encryptString);

  string Decrypt(string decryptString);
}