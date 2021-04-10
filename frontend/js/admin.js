//Declare a new XMHttpRequest
const xhttp = new XMLHttpRequest();
const endPointRoot = "https://www.irislawcst.com/COMP4537/labs/termproject/API/V1/"


const GET = "GET";
const PUT = "PUT";
const POST = "POST";

let count = 1;
let score = 0;
let arrayString
let questionsArray = [];

let postArray = [];


/**
 * Get all questions.
 */
 function getTable() {
    xhttp.open(GET, endPointRoot + "admin", true);
    xhttp.send();
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
                console.log('Retrieved items');
        
                for (let position = 0; position < dbQuestions.length; position++) {
                  // console.log(dbQuestions[position]);
                    questionsArray.push(dbQuestions[position]);
                    console.log(questionsArray);
                }

                var body = document.body,
                tbl  = document.createElement('table');
                tbl.style.width  = '100px';
                tbl.style.border = '1px solid black';
            
                for(var i = 0; i < questionsArray.length; i++){
                    var tr = tbl.insertRow();

                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode( questionsArray[i]["method"]));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode( questionsArray[i]["endpoint"]));
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(questionsArray[i]["req"]));
                    td.style.border = '1px solid black';
  
                }
                body.appendChild(tbl);
                
                
            }).catch((dbQuestions) => {
                console.log('Error');
            })
        }
    };
}

/**
 * Checks that database and size of page accurate.
 */
 function load() {
    if(localStorage.getItem("userNum") == 1){
    getTable();
    }else{
        alert("Not admin! Try logging in right account.");
        window.location.replace("./login.html")
    }

}