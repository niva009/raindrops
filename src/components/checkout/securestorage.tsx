import CryptoJS from "crypto-js";

const SECRET_KEY = "Raindrops@123"

export const secureLocalStorageSet = (key: string, value: any) => {
  try {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      SECRET_KEY
    ).toString();
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error("Error encrypting data:", error);
  }
};

export const secureLocalStorageGet = (key: string) => {
  try {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};

// Remove item securely
export const secureLocalStorageRemove = (key: string) => {
  localStorage.removeItem(key);
};
