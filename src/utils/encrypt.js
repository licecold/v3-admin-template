import { JSEncrypt } from 'jsencrypt'
import e from '@/config/e.json'
const crypt = new JSEncrypt()

crypt.setKey(e.k)

function encrypt(text) {
  return crypt.encrypt(text)
}

function decrypt(string) {
  crypt.setPrivateKey('')
  return crypt.decrypt(string)
}

export { encrypt, decrypt }
export default encrypt
