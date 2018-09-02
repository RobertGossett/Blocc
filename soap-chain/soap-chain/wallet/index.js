const {INITIAL_BALANCE } = require('../config');
const chainUtil = require('../chain-util');
const Transaction = require('./transaction');
class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = chainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet -
            publicKey: ${this.publicKey.toString()}
            balance  : ${this.balance}`
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, transactionPool) {
        if(amount > this.balance) {
            console.log(`Amount: ${amount} excedes current balance ${this.balance}`);
            return;
        }
        else {
            let transaction = transactionPool.existingTransaction(this.publicKey);
            if(transaction) {
                transaction.update(this, recipient, amount);
                console.log("updating existing transaction");
            }
            else {
                console.log("creating a new transaction");
                transaction = Transaction.newTransaction(this, recipient, amount);
                transactionPool.updateOrAddTransaction(transaction);
            }

            return transaction;
        }
    }
}

module.exports = Wallet;