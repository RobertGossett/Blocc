# Blocc

This project uses Node, so make sure you have it installed on your computer.
To run:

1) in the soap-chain directory, run command:

          npm run start
    
    This will stand up an instance of the blockchain on port 3001 with the peer-to-peer server listening on port 5001
 
2) to stand up an additional "connected" instance of the blockchain run the following command: 

        HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run start
        HTTP_PORT: takes the port for the API to run on
        P2P_PORT: takes the port for the p2p server to run on
        PEERS: takes the ports of other nodes p2p servers to connect to. 

    A third instance would be run like so:
    
        HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run start
  
And so on... There you go.

REST API:
Using postman, or just your browser (yuk): you can use the bc and the p2p networks functionalities via the rest API. Here are the accessable points:

      1. Get blockchain (GET): localhost:PORT_NUMBER/blocks
      2. Mine Block (POST): localhost:PORT_NUMBER/mine
        With JSON body like this: 
            {
            "data": ", to the promised land"
            }

      3. Mine Transactions (GET): localhost:PORT_NUMBER/mine-transactions
      4. Get Transactions (GET): localhost:PORT_NUMBER/transactions
      5. Create Transaction (POST): localhost:PORT_NUMBER/transact
        With JSON body like this:
            {
            "recipient": "04e9c55f13e397e285bebbed5b8ed84185e45a76f39897722a79260f86204f8d4fd1970a2d30cba496e4733aad78a826e05b712c7935509c8d382a5a36ebf96323",
            "amount": "50"
            }

      6. Get the publick key of a wallet (GET): localhost:PORT_NUMBER/public-key

   
    
