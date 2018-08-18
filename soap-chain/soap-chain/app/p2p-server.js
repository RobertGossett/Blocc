const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev



class P2pServer {
    constructor (Blockchain) {
        this.blockchain = Blockchain;
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
Message handler for replacing this chain with current chain
*/ 
    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);

            this.blockchain.replaceChain(data);
        });
    }

/*
Syncs chain with current networks chain
*/ 
    syncChains() {
        this.sockets.forEach(socket => this.sendChain(socket));
    }

/*
Sends current chain to servers in network
*/ 
    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    
}

module.exports = P2pServer;