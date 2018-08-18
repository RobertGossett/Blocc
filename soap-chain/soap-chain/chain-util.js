const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const uuidV1 = require('uuid/v1');
const ec = new EC('secp256k1');

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }
/*
Generates an id for new transactions
*/
    static id() {
        return uuidV1();
    }

/*
Generates a hash for any piece of data
*/
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

/*
verifies the signature on any transaction
*/
    static verifySignature(publicKey, signature, dataHash) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }

}

module.exports = ChainUtil;