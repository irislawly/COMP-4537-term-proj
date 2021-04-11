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

function getTable(){
    (async () => {
        let result = await fetch(endPointRoot + "admin")
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((res) => {
           // document.getElementById("stats").innerHTML = "";
            for (let i = 0; i < res.length; i++) {
                questionsArray.push(res[i]);
              console.log(res[i]);
            }
            let table = document.getElementById("table");
            let tbl = document.createElement('table');
            tbl.style.width = '300px';
            tbl.style.padding = '10px';
            tbl.style.border = '1px solid lightblue';
  

            for (var i = 0; i < questionsArray.length; i++) {
                var tr = tbl.insertRow();
               
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(questionsArray[i]["method"]));
                
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(questionsArray[i]["endpoint"]));
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(questionsArray[i]["requests"]));
                td.style.border = '1px solid black';
                td.style.padding = '10px';

            }
            table.appendChild(tbl);


          });
      })();
}


/**
 * Checks that user is admin.
 */
function load() {
    if (localStorage.getItem("userNum") == 1) {
        getTable();
    } else {
        alert("Not admin! Try logging in right account.");
        window.location.replace("./login.html")
    }

}