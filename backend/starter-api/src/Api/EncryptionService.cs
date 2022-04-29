

using System.Security.Cryptography;
using System.Text;
using Api.Interfaces;

namespace Api;

public class EncryptionService : IEncryptionService
{
    private readonly IConfiguration _config;

    public EncryptionService(IConfiguration config)
    {
        _config = config;
    }
    public string Encrypt(string encryptString)   
    {  
        string EncryptionKey = (_config["encryptionKey"]);  
        byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);  
        using(Aes encryptor = Aes.Create())   
        {  
            Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {  
                0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76  
            });  
            encryptor.Key = pdb.GetBytes(32);  
            encryptor.IV = pdb.GetBytes(16);  
            using(MemoryStream ms = new MemoryStream())  
            {  
                using(CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write)) {  
                    cs.Write(clearBytes, 0, clearBytes.Length);  
                    cs.Close();  
                }  
                encryptString = Convert.ToBase64String(ms.ToArray());  
            }  
        }  
        encryptString = encryptString.Replace("/", "*");
        return encryptString;  
    }  
    
    public string Decrypt(string cipherText)   
    {  
        string EncryptionKey = (_config["encryptionKey"]);  
        cipherText = cipherText.Replace(" ", "+").Replace("*", "/");  
        byte[] cipherBytes = Convert.FromBase64String(cipherText);  
        using(Aes encryptor = Aes.Create())   
        {  
            Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {  
                0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76  
            });  
            encryptor.Key = pdb.GetBytes(32);  
            encryptor.IV = pdb.GetBytes(16);  
            using(MemoryStream ms = new MemoryStream())   
            {  
                using(CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write)) {  
                    cs.Write(cipherBytes, 0, cipherBytes.Length);  
                    cs.Close();  
                }  
                cipherText = Encoding.Unicode.GetString(ms.ToArray());  
            }  
        }  
        return cipherText;  
    }  
}