// REST API
const express = require('express');
const bodyParser = require('body-parser');
const BlockChain = require('../blockchain');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
var webapp = express();
const bc = new BlockChain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc)

app.use(bodyParser.json());


/*
URL for getting blocks in the chain
*/ 
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

/*
URL for mining a block and trying to add it to network
*/ 
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    p2pServer.syncChains();
    res.redirect('/blocks');
})

app.get('/transactions', (req, res) => {
    res.json(tp.transactions);
})
/*
Stand up application and opens up server for new members to join
*/ 

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

p2pServer.listen();
