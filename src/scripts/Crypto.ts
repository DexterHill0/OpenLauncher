/**
 * Adapated from RSA.js on Steam's login page
 */

import { BigInteger } from "jsbn";

class RSAPublicKey {
    modulus: BigInteger;
    encryptionExponent: any;

    constructor(modHex: string, encrypExpHex: string) {
        this.modulus = new BigInteger(modHex, 16);
        this.encryptionExponent = new BigInteger(encrypExpHex, 16);
    }
}


class RSA {

    static getPublicKey(modHex: string, expHex: string) {
        return new RSAPublicKey(modHex, expHex);
    }

    static encrypt(data: any, pubkey: RSAPublicKey): string {
        if (!pubkey) return "";
        data = RSA.pkcs1pad2(data, (pubkey.modulus.bitLength() + 7) >> 3) || new BigInteger("0");
        if (!data) return "";
        data = data.modPowInt(pubkey.encryptionExponent, pubkey.modulus);
        if (!data) return "";
        let strData = data.toString(16);
        if ((strData.length & 1) == 1)
            strData = "0" + data;
        return Base64.encode(Hex.decode(strData));
    }

    private static pkcs1pad2(data: any, keysize: number): BigInteger | null {
        if (keysize < data.length + 11)
            return null;
        var buffer = [];
        var i = data.length - 1;
        while (i >= 0 && keysize > 0)
            buffer[--keysize] = data.charCodeAt(i--);
        buffer[--keysize] = 0;
        while (keysize > 2)
            buffer[--keysize] = Math.floor(Math.random() * 254) + 1;
        buffer[--keysize] = 2;
        buffer[--keysize] = 0;
        return new BigInteger(buffer);
    }
};


class Hex {
    static hex: string = "0123456789abcdef";

    static encode(input: string): string {
        if (!input) return "";
        let output = "";
        let k;
        let i = 0;
        do {
            k = input.charCodeAt(i++);
            output += Hex.hex.charAt((k >> 4) & 0xf) + Hex.hex.charAt(k & 0xf);
        } while (i < input.length);
        return output;
    }

    static decode(input: string): string {
        if (!input) return "";
        input = input.replace(/[^0-9abcdef]/g, "");
        let output = "";
        let i = 0;
        do {
            output += String.fromCharCode(((Hex.hex.indexOf(input.charAt(i++)) << 4) & 0xf0) | (Hex.hex.indexOf(input.charAt(i++)) & 0xf));
        } while (i < input.length);
        return output;
    }
}

class Base64 {
    private static base64: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    static encode(input: string): string {
        if (!input) {
            return "";
        }
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) enc3 = enc4 = 64;
            else if (isNaN(chr3)) enc4 = 64;
            output += Base64.base64.charAt(enc1) + Base64.base64.charAt(enc2) + Base64.base64.charAt(enc3) + Base64.base64.charAt(enc4);
        } while (i < input.length);
        return output;
    }
};


export { RSA, RSAPublicKey };