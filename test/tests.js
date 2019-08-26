'use strict';

const { KeyGenerator, Crypter } = require('../lib/string-crypter');
const should = require('should');
const fs = require('fs');
const path = require('path');

describe('string-crypter.js', function () {
    const staticFolder = './test/static';
    const passphrase = 'myS#cretP@ssw0rd';
    const publicKeyPath = path.join(staticFolder, 'public.pem');
    const privateKeyPath = path.join(staticFolder, 'private.pem');

    describe('KeyGenerator', function () {
        // clean folder
        function cleanFolderSync(directory) {
            fs.readdir(path.resolve(directory), (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) throw err;
                    });
                }
            });
        }

        cleanFolderSync(staticFolder);

        it('create Keys with passphrase', function(done) {
            KeyGenerator.generateKeysSync(passphrase, publicKeyPath, privateKeyPath);
            done();
        });
    });

    describe('Crypter', function () {
        const testMessage = 'Hello World!';

        it('encrypt with passphrase', function(done) {
            const encryptedMessage = Crypter.publicEncryptSync(testMessage, publicKeyPath);
            const decryptedMessage = Crypter.privateDecryptSync(encryptedMessage, privateKeyPath, passphrase);
            should(testMessage).equal(decryptedMessage);
            done();
        });
    })
});
