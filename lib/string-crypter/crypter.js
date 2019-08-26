'use strict';

const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

/**
 * Encrypt string by Public Key
 * @param message - string to encrypt
 * @param publicKeyPath - relative or absolute path to Public Key
 * @return {string}
 */
module.exports.publicEncryptSync = function(message, publicKeyPath) {
    const publicKey = fs.readFileSync(path.resolve(publicKeyPath), 'utf8');
    const encrypted = crypto.publicEncrypt(
        publicKey,
        Buffer.from(message, 'utf8')
    );
    return encrypted.toString('base64');
};

/**
 * Decrypt string by Private Key
 * @param encryptedMessage - string to decrypt
 * @param privateKeyPath - relative or absolute path to Private Key
 * @param passphrase - password for Private Key
 * @return {string}
 */
module.exports.privateDecryptSync = function(encryptedMessage, privateKeyPath, passphrase) {
    const privateKey = fs.readFileSync(path.resolve(privateKeyPath), 'utf8');
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: passphrase,
        },
        Buffer.from(encryptedMessage, 'base64'),
    );
    return decrypted.toString('utf8');
};