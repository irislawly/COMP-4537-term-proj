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

/**
 * Get all questions.
 */
 function getAllQuestions() {
    xhttp.open(GET, endPointRoot + "post", true);
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
                    console.log(dbQuestions[position]);
                    questionsArray.push(dbQuestions[position]);
                }
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
    getAllQuestions();

}
//submit comment
function submitComment(){
   
    let name = document.getElementById("name").innerHTML;
    let username = document.getElementById("username").innerHTML;
    let i = 0;
    let text = document.getElementById("textBox").value;

    let obj = {
      //  index: questionsArray.length ,
   
        uid: 1,
        pid: 1,
        msg: text,
  
    }
    console.log(obj);
    console.log("submission: " + name + " " + text); 
    xhttp.open(POST, endPointRoot + "post/submit", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("looks like client side is working");
        }
    };

   // XMLHttpRequestUpload();
}