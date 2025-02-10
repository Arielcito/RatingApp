import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '32byteslongkeyhere32byteslongkeyher';

const IV = CryptoJS.enc.Utf8.parse('holamundodiez43d');

export const encryptPassword = (password: string): string => {
  try {
    const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
    
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      iv: IV,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return encrypted.toString();
  } catch (e) {
    console.error('Error encriptando contraseña:', e);
    return password;
  }
};

export const decryptPassword = (encryptedPassword: string): string => {
  try {
    const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);

    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, {
      iv: IV,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.error('Error desencriptando contraseña:', e);
    return encryptedPassword;
  }
}; 