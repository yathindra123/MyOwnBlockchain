const BlockChain = require('./BlockChain');
const Block = require('./Block');
const Transaction = require('./Transaction');

let ykCoin = new BlockChain();
// ykCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
//
// ykCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));


/*//Prints is the coin valid
console.log('Blockchain valid? ' + ykCoin.isChainValid());

//Change the block
console.log('Changing the block');
ykCoin.chain[1].transactions = {amount:100};
//Check if valid after changing
console.log('Blockchain valid? ' + ykCoin.isChainValid());



//Prints the coin Json
console.log(JSON.stringify(ykCoin, null, 4));*/

//Normally address1,2 is public keys of someones' wallets
ykCoin.createTransaction(new Transaction('address1', 'address2', 100));
ykCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
ykCoin.minePendingTransactions('yathindra-miner');

console.log('\nBalance of yathindra is', ykCoin.getBalanceOfAddress('yathindra-miner'));

console.log('\n Starting the miner again...');
ykCoin.minePendingTransactions('yathindra-miner');

console.log('\nBalance of yathindra is', ykCoin.getBalanceOfAddress('yathindra-miner'));

