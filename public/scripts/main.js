$(document).ready(function () {

    $("#formId").submit(function (e) {
        e.preventDefault();
        $("#customerInfo").text("");
        $("#accountStatus").text("");

        console.log($("#selectId").val());
        excuteOperation();
    });
    $("#selectId").change(function (e) { 
        e.preventDefault();
        $("#customerInfo").text("");
        $("#accountStatus").text("");

        let selectValue = $("#selectId").val();

        if(selectValue === "balance"){
            $("#customerInfoContainer").css("display","contents");
        }
        else{
            $("#customerInfoContainer").css("display","none");
        }
        
    });

});


function excuteOperation() {
    let selectValue = $("#selectId").val();

    if (selectValue === "new") {
        addAccount();
    }
    else if (selectValue === "deposit") {
        deposit();
    }
    else if (selectValue === "withdraw") {
        withdraw();
    }else if(selectValue === "balance"){
        searchCustomer();
    }
}


function addAccount() {

    let userName = $("#username").val();
    let number = $("#number").val();
    let balance = $("#balance").val();

    $.ajax({
        type: "GET",
        url: "http://localhost:5000/addAccount",
        data: { userName: userName, number: number, balance: balance },
        datType: "json"
    }).done((data) => {
        console.log("we doing gooddd!");
        console.log(data.msg);
        $("#accountStatus").text(data.msg);
        $("#accountStatus").css("color", "green");
        setTimeout(() => {
            $("#accountStatus").text("");
        }, 2000);
    }).fail((err) => {
        console.log(err);
    });

}


function deposit() {
    let userName = $("#username").val();
    let number = $("#number").val();
    let amount = $("#balance").val();


    $.ajax({
        type: "GET",
        url: "http://localhost:5000/deposit",
        data: { userName: userName, number: number, amount: amount },

    }).done((data) => {
        $("#accountStatus").text(data.msg);
        if (data.flag) {
            $("#accountStatus").css("color", "green");
        }
        else {
            $("#accountStatus").css("color", "red");

        }

    }).fail((err) => {
        console.log(err);
    });
}


function withdraw() {
    let userName = $("#username").val();
    let number = $("#number").val();
    let amount = $("#balance").val();

    $.ajax({
        type: "GET",
        url: "http://localhost:5000/withdraw",
        data: { userName: userName, number: number, amount: amount },

    }).done((data) => {
        $("#accountStatus").text(data.msg);
        if (data.flag) {
            $("#accountStatus").css("color", "green");
        }
        else {
            $("#accountStatus").css("color", "red");

        }

    }).fail((err) => {
        console.log(err);
    });
}


function searchCustomer() {

    let userName = $("#username").val();

    $.ajax({
        type: "GET",
        url: "http://localhost:5000/searchCustomer",
        data: { userName: userName }
    }).done((data) => {
        $("#customerInfo").text("Name: " + data.name + "\n\nNumber: " + data.number + "\n\nBalance: " + data.balance);


        $.map(data, (post, index) => {
            //let info = "Name: " +post.name+"\nNumber: "+post.number+"\nBalance: "+post.balance;
            $("#customerInfo").text("Name: " + post.name + "\n\nNumber: " + post.number + "\n\nBalance: " + post.balance);
        });
    }).fail((err) => {
        console.log(err);
    });

}






