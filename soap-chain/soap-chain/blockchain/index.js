const Block = require('./Block')

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

/*
Adds a block to the block chain
*/ 
    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);

        return block;
    }

/*
Verifies the validity of a chain
*/ 
    isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        }
        
            for(let i = 1; i < chain.length; i++) {
                const block = chain[i];
                const lastBlock = chain[i-1]

                if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
                    return false;
                }
            }

            return true;
    }

/*
Replaces this chain with recieved chain if recieved chain is newer and valid
*/ 
    replaceChain(newChain) {
        if(newChain.length <= this.chain.length) {
            console.log('Recieved chain is not longer than the current chain.');
            return;
        }
        else if(!this.isValidChain(newChain)){
            console.log('Recieved chain is not valid.');
            return;
        }
        else{
            console.log('Replacing blockchain with the new chain.');
            this.chain = newChain;
        }
    }
}

module.exports = Blockchain;

