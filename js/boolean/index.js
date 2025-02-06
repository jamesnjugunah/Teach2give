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

const password = "Jimmy22kar?";
const hashedPassword = bcrypt.hashSync(password,10);
const stardandMFA = "1234";
const balance = 20000;
const dailyLimit = 5000;
 
console.log(hashedPassword);

function verifyPassword(password){
    if (bcrypt.compareSync(password, hashedPassword)){
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

function processWithdrawal(password, MFA, amount){
    if(verifyPassword(password) && verifyMFA(MFA) ) {
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
console.log(processWithdrawal("Jimmy22kar?", "1234", 15000));