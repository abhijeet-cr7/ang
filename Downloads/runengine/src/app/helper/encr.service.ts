import { Injectable } from '@angular/core';
declare var AesUtil: any;
@Injectable({
  providedIn: 'root'
})
export class EncrService {

  constructor() {
  }
  Encrypt(plainText) {
    const iv = '494e56454e5430525931373131323941';
    const salt = '494e56454e5430525931373131323941';
    const keySize = 128;
    const iterationCount = 10000;
    const passPhrase = 'INVENT0RY171129A';
    const aesUtil = new AesUtil(keySize, iterationCount);
    const encrypt = aesUtil.encrypt(salt, iv, passPhrase, plainText);
    return encrypt;
    }
     Decrypt(plainText) {
      const iv = '494e56454e5430525931373131323941';
      const salt = '494e56454e5430525931373131323941';
      const keySize = 128;
      const iterationCount = 10000;
      const passPhrase = 'INVENT0RY171129A';
      const aesUtil = new AesUtil(keySize, iterationCount);
      const decrypt = aesUtil.decrypt(salt, iv, passPhrase, plainText);
      return decrypt;
}

}
