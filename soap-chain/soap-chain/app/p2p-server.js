const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPE = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION',
    clear_transactions: 'CLEAR_TRANSACTIONS'
}

// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev



class P2pServer {
    constructor (Blockchain, transactionPool) {
        this.blockchain = Blockchain;
        this.transactionPool = transactionPool;
        this.sockets = [];
    }

/*
Makes websocket server listen for peers
*/   
    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));


        this.connectToPeers();

        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
       
    }

/*
Connects to existing peers passed in PEERS argument
*/   
    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            
            socket.on('open', () => this.connectSocket(socket));
            
        });
    }

/*
Connects a new socket to server
*/ 
    connectSocket(socket) {
        
        this.sockets.push(socket);
        console.log('Socket connected.');

        this.messageHandler(socket);

        this.sendChain(socket);
    }

/*
Message handler for replacing this chain with current chain or transacting
*/ 
    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            switch(data.type){
                case MESSAGE_TYPE.chain:
                    this.blockchain.replaceChain(data.chain);
                    break;
                case MESSAGE_TYPE.transaction:
                    this.transactionPool.updateOrAddTransaction(data.transaction);
                    break;
                case MESSAGE_TYPE.clear_transactions:
                    this.transactionPool.clear();
                    break;
                default:
                    console.log('Error, unrecognized commands in message handler p2p')
            }
        });
    }

/*
Sends current chain to servers in network
*/ 
    sendChain(socket) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPE.chain, 
            chain: this.blockchain.chain}));
    }

/*
Sends transaction
*/
    sendTransaction(socket, transaction) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPE.transaction, 
            transaction: transaction}));
    }

/*
Syncs chain with current networks chain
*/ 
    syncChains() {
        this.sockets.forEach(socket => this.sendChain(socket));
    }

/*
Broadcasts transaction
*/ 
    broadcastTransaction(transaction) {
        this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
    }

    broadcastClearTransactions() {
        this.sockets.forEach(socket => socket.send(JSON.stringify({
            type: MESSAGE_TYPE.clear_transactions
        })));
    }


    
}

module.exports = P2pServer;