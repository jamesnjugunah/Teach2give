// Verify Password
//Verify MFA
//check balance
//check balance
//check daily limit
//process withdrawal
        //1. call verify password
        //2. call verify MFA
        //3. check balance
        //4. check daily limit
import bcrypt from 'bcryptjs';
import readline from 'readline';

const password = "Jimmy22kar?";
const hashedPassword = bcrypt.hashSync(password,10);
const stardandMFA = "1234";
const balance = 20000;
const dailyLimit = 5000;
let inputPassword;
let inputMFA;
let amount;
 
// console.log(hashedPassword);

function verifyPassword(inputPassword){

    if (bcrypt.compareSync(inputPassword, hashedPassword)){
        return true;

    }else {
        return false;
    }
}

function verifyMFA(inputMFA){
    if(inputMFA === stardandMFA){
        return true;
    }else{
        return false;
    }

}
function checkBalance(balance){
    return balance;
}
function checkDailyLimit(dailyLimit){
    return dailyLimit;
}

function processWithdrawal(inputPassword, inputMFA, amount){
    if(verifyPassword(inputPassword) && verifyMFA(inputMFA) ) {
        console.log("Registration successfull");
        if(amount <= checkBalance(balance)){
            if(amount <= checkDailyLimit(dailyLimit)){
                console.log("Withdrawal successfull");
            }else{
                console.log("Daily limit exceeded")
            }
        }else{
            console.log("Not enough funds");s
        }
    }else{
        console.log("Withdrawal failed");
    }
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your password: ', (inputPassword) => {
    rl.question('Enter your MFA code: ', (inputMFA) => {
        rl.question('Enter the amount to withdraw: ', (amount) => {
            processWithdrawal(password, inputMFA, parseFloat(amount));
            rl.close();
        });
    });
});