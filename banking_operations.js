//Desafio bootcamp Launchbase
// 4º desafio fase 02 - Aplicação: operações bancárias 

const user = {
    name: "Thauany",
    transactions: [],
    balance: 0
};

function createTransaction(transaction){
    user.transactions.push(transaction)

    if(transaction.type == 'credit'){
        user.balance = user.balance + transaction.value;
    }else{
        user.balance = user.balance - transaction.value;
    }
}

function getHigherTransactionByType(type){
    let higherTransaction = {};
    let higherValue = 0;
    
    for(let transaction of user.transactions){
        if(transaction.type == type && transaction.value > higherValue){
            higherValue = transaction.value;
            higherTransaction = transaction;
        }
    }

    return higherTransaction;
}

function getAverageTransactionValue(){
    let sum = 0;

    for(let transaction of user.transactions){
        sum += transaction.value;
    }

    return sum / user.transactions.length;
}

function getTransactionsCount(){
    let credit = 0;
    let debit = 0;

    for(let transaction of user.transactions){
        if(transaction.type == 'credit'){
            credit++;
        }else{
            debit++;
        }
    }

    return { credit: credit, debit: debit};
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });
createTransaction({ type: "credit", value: 20 });


console.log(user.balance); // 80

console.log(getHigherTransactionByType("credit")); // { type: 'credit', value: 120 }
console.log(getHigherTransactionByType("debit")); // { type: 'debit', value: 80 }

console.log(getAverageTransactionValue()); // 60

console.log(getTransactionsCount()); // { credit: 3, debit: 2 }

