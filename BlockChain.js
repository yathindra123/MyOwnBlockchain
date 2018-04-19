const Block = require('./Block');
const Transaction = require('./Transaction');

class BlockChain{

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    //1st block in the blockchain is called genesis block
    //so should at it manually
    createGenesisBlock(){
        return new Block("18/05/2018", {amount:"Genesis Block"}, "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    isChainValid(){
        //Here starting with index 1, because index 0 is the genesis block
        for (let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            //If the transactions is changed hash will be changed
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            //Check whether block is a matching one
            else if (currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }

    minePendingTransactions(miningRewardAddress){
        //In actual scenario its not getting all pending transactions, minor will chose transactions as he needs
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        //Empty the pending transactions
        //sender is null because no one sending, its belongs to the function of the system
        //Sends mining reward to the mining reward address
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    //In blockchain we don't store amount. We calculate balance when needed by iterating through all the
    getBalanceOfAddress(address){

        //By default balance is zero
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

};

module.exports = BlockChain;