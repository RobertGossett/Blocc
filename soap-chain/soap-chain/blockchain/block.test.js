const Block = require('./Block');

describe('Block', () => {
    let data, lastblock, block;

    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
        block2 = Block.mineBlock(block, data);
    });
    it('sets the `data` to match the input', () => {
        expect(block.data).toEqual(data);
    });

    it('sets the `lastHash` to match the hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates hash that matches difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block2, block2.timeStamp+360000)).toEqual(block2.difficulty - 1);
    });

    it('raises the difficulty for quickly mined block', () => {
        expect(Block.adjustDifficulty(block2, block2.timeStamp+1)).toEqual(block2.difficulty + 1);
    });
    
});