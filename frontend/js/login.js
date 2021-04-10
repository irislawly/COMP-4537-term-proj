//Declare a new XMHttpRequest
const xhttp = new XMLHttpRequest();
const endPointRoot = "https://www.irislawcst.com/COMP4537/labs/termproject/API/V1/"


const GET = "GET";
const PUT = "PUT";
const POST = "POST";

let count = 1;
let score = 0;
let arrayString
let postArray = [];

function submit() {
    console.log("Submit pressed");
    let pass = document.getElementById("pass").value;
    console.log(pass);
    let name = document.getElementById("name").value;
    if (!pass || !name) {
        alert("Inputs empty");
    }
    loginUser(name, pass);


}


function loginUser(name, pass) {
    let obj = {
        name: name,
        pass: pass
    }
    xhttp.open(POST, endPointRoot + "user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let q = new Promise((resolve, reject) => {
                if (JSON.parse(this.responseText).length > 0) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('Fail');
                }
            })
            q.then((dbQuestions) => {
                console.log('Username found');
                for (let i = 0; i < dbQuestions.length; i++) {
                    console.log(dbQuestions[i]);
                }
                localStorage.setItem("userNum", dbQuestions[0]["id"]);
                window.location.href = './home.html';

            }).catch((dbQuestions) => {
                console.log('Error');
                //if not found, create new?
                if (confirm('Do you want to create new user account with this info?')) {

                    console.log('Account created.');
                    addUser( obj);
                
                        setTimeout(function(){
                            alert("Try relogging");
                         }, 1000);
                    
                   
                } else {

                    console.log('Account not created.');
                }
            })
        }
    };
}

function addUser( obj) {
    xhttp.open(POST, endPointRoot + "user/new", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let q = new Promise((resolve, reject) => {
                if (JSON.parse(this.responseText).length > 0) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('Fail');
                }
            })
            q.then((dbQuestions) => {
                console.log('Added');
                for (let i = 0; i < dbQuestions.length; i++) {
                    console.log(dbQuestions[i]);
                }
                localStorage.setItem("userNum", dbQuestions[0]["id"]);
                window.location.href = './home.html';

            }).catch((dbQuestions) => {
                console.log('Error!');
                
 
            })
        }
    };
}