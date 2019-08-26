'use strict';

const path = require('path');
const { writeFileSync } = require('fs');
const { generateKeyPairSync } = require('crypto');

/**
 * Generate Private & Public keys pair
 * @param passphrase - password for Private Key
 * @param publicKeyPath - relative or absolute path to Public Key
 * @param privateKeyPath - relative or absolute path to Private Key
 */
module.exports.generateKeysSync = function (passphrase, publicKeyPath, privateKeyPath) {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        namedCurve: 'secp256k1',
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: passphrase
        }
    });

    writeFileSync(path.resolve(publicKeyPath || 'public.pem'), publicKey);
    writeFileSync(path.resolve(privateKeyPath || 'private.pem'), privateKey);
};
