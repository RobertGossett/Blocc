const Blockchain = require('./index');
const Block = require('./Block');
describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('start with genesis block', () => {
        
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validates valid chain', () => {
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates chain with curropt genesis block', () => {
        bc2.chain[0].data = 'Bad data';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a curropt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'bad data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces current chain with a valid chain', () => {
        bc2.addBlock('goo');
        
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace current chain with one of less than or equal to length.', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chian).not.toEqual(bc2.chain);
    });

    

});