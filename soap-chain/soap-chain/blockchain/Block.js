const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE, GENESIS} = require('../config');

class Block {
    constructor (timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

/*
Diagonal ticks, template string
*/    
    toString() { 
        return `Block - 
                Timestamp : ${this.timestamp}
                Last Hash : ${this.lastHash.substring(1, 10)}
                Hash      : ${this.hash.substring(0, 10)}
                Nonce     : ${this.nonce}
                Difficulty: ${this.difficulty}
                Data      : ${this.data}`;
    }

/*
Create the genesis (origin) block
*/
    static genesis() { 
        return new this(GENESIS, '-----', 'f1r57-h45h', [], 0, DIFFICULTY);
    }
/*
Mines (adds) a new block
*/
    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        timestamp = Date.now();
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));
        
        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

/*
Generates new hash
*/
    static hash(timestamp, lastHash, data, nonce, difficulty) { 
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

/*
Verifies validity of the hash
*/
    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty} = block;

        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

/*
Adjusts the difficulty of mining the next block
*/
    static adjustDifficulty(lastBlock, currentTime) { 
        let { difficulty } = lastBlock;
        if(difficulty == 1 && MINE_RATE < currentTime - lastBlock.timestamp){
            return 1;
        }
        else{
        
            difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
            difficulty + 1 : difficulty - 1;
        return difficulty;
        }
        
    }
}

module.exports = Block;