const { json } = require('body-parser');
const sql = require('mysql');
/* 
const conn = sql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bank'
});
 */

const createAccount = function (req, res, customer) {
    const conn = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "bank",
        port: "3306"
    });

    conn.connect((err) => {
        if (err) throw err;
        console.log("database Connected...");
        conn.query(`Insert Into accounts (name,number,balance) VALUES ('${customer.userName}','${customer.number}','${customer.balance}')`, (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows);
            if (!result.affectedRows) {
                res.send({ msg: "Please Try Again! " });
            }
            else {
                res.send({ msg: "Account Added Successfully!" });
            }

        });
    });

}




const deposit = function (req, res, amount) {


    const conn = sql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "root",
        database: "bank"

    });
    conn.connect((err) => {
        if (err) throw err;
        console.log("database connected...");

        conn.query(`Select * from accounts where number ='${amount.number}'`, (err, result, fields) => {
            if (err) throw err;

            if (!result.length) {
                res.json({ msg: "Sorry we don't know that account number.", flag: false });
                return;
            } else {

                let currentBalance = result[0].balance;
                let updatedBalance = currentBalance + parseInt(amount.amount);

                conn.query(`UPDATE accounts SET balance = '${updatedBalance}' where number = '${amount.number}'`, (err, result) => {
                    res.json({ msg: "Deposit successful, Current Balance: " + updatedBalance, flag: true });
                });
            }

        });


    });

}


const withdraw = function (req, res, amount) {


    const conn = sql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "root",
        database: "bank"

    });
    conn.connect((err) => {
        if (err) throw err;
        console.log("database connected...");

        conn.query(`Select * from accounts where number ='${amount.number}'`, (err, result, fields) => {
            if (err) throw err;

            if (!result.length) {
                res.json({ msg: "Sorry we don't know that account number.", flag: false });
                return;
            } else {
                let currentBalance = result[0].balance;
                let withdrawAmount = parseInt(amount.amount);
                if (currentBalance < withdrawAmount) {
                    res.json({ msg: "Sorry you don't have enough money to withdraw. $" + withdrawAmount+"     MaxLimit: $"+currentBalance, flag: false });
                    return;
                }
                let updatedBalance = currentBalance - withdrawAmount;

                conn.query(`UPDATE accounts SET balance = '${updatedBalance}' where number = '${amount.number}'`, (err, result) => {
                    res.json({ msg: "Withdraw successful, Current Balance: " + updatedBalance, flag: true });
                });
            }

        });


    });


    //

}

const customerInfo = function (req, res, customer) {
    const conn = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "bank",
        port: "3306"
    });

    conn.connect((err) => {
        if (err) throw err;
        console.log("database Connected...");
        conn.query(`Select * from accounts where name ='${customer.userName}'`, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });

}


/*
const deleteAccount = function (req, res, deleteName) {

    const conn = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "bank",
        port: "3306"
    });

    conn.connect((err) => {
        if (err) throw err;
        console.log("database connected...");
        conn.query(`DELETE FROM accounts WHERE name = '${deleteName.name}' `, (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows);
            if (!result.affectedRows) {
                res.json({ status: "Sorry their is no Account by that Name" });
            }
            else {
                res.json({ status: "Account DELETED!" });
            }
        });
    });



}*/





module.exports = { createAccount, customerInfo, deposit, withdraw };




