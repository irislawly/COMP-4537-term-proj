//Declare a new XMHttpRequest
const xhttp = new XMLHttpRequest();
const endPointRoot = "https://www.irislawcst.com/COMP4537/labs/termproject/API/V1/"


const GET = "GET";
const PUT = "PUT";
const POST = "POST";
const DELETE = "DELETE";

let count = 1;
let score = 0;
let arrayString;
let questionsArray = [];
let isAdmin = false;
/**
 * Get all questions.
 */
function getAllQuestions() {
    xhttp.open(GET, endPointRoot + "home", true);
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
            let postCont = document.getElementById("timelineDiv");

            q.then((dbQuestions) => {
             
                console.log('Retrieved items');
                console.log( dbQuestions[0]);
           
                if(localStorage.getItem("userNum") == 1){
                    isAdmin = true;
                    console.log(isAdmin);
                }
              
                for (let i = 0; i < dbQuestions.length ; i++) {
                 
                    questionsArray.push(dbQuestions[i]);
                    let postDiv = document.createElement("div");
                    postDiv.setAttribute("class", "posts");
                    let postUser = document.createElement("h3");
                    postUser.innerHTML =  dbQuestions[i]["username"];
                    let moreButt = document.createElement("button");
                    moreButt.setAttribute("onclick", "viewPost("+i+")");
                    moreButt.setAttribute("id" , "viewButt_"+i);
                    moreButt.setAttribute("class", "view");
                    moreButt.innerHTML = "View More"
                    let deleteButt = document.createElement("button");
                    deleteButt.setAttribute("onclick", "deletePost("+i+")");
                    deleteButt.setAttribute("id" , "deleteButt_"+i);
                    deleteButt.setAttribute("class", "del");
                    deleteButt.innerHTML = "Delete"

                    let textPara = document.createElement("p");
                    textPara.setAttribute("class", "bubble");
                    textPara.innerHTML = dbQuestions[i]["msg"];
                    let likeButt = document.createElement("button");
                    likeButt.setAttribute("onclick", "addLike("+i+")");
                    likeButt.setAttribute("id" , "likeButt_"+i);
                    likeButt.setAttribute("class", "like");
                    likeButt.innerHTML =  dbQuestions[i]["likes"] + " Likes";

      
                   
                    if(isAdmin==true){
                    document.getElementById("name").innerHTML = "Admin";
                    postDiv.appendChild(deleteButt);
                    }
                    postDiv.appendChild(postUser);
                    postDiv.appendChild(textPara);

                    postDiv.appendChild(likeButt);
                    postDiv.appendChild(moreButt);
                    postCont.appendChild(postDiv);

                }

            }).catch((dbQuestions) => {
                console.log('Error');
            })
        }
    };
}

function addLike(i){
 console.log("Likes: " + i);
 let l = 0;
     l =questionsArray[i].likes ;
    l++;
    let obj = {
        index: questionsArray[i].index,
        likes: l,
    }
    document.getElementById("likeButt_"+i).innerHTML=l + " Likes";
    xhttp.open(PUT, endPointRoot + "home/like", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Put on the client side is working");
        }
    }
}
/**
 * Checks that database and size of page accurate.
 */
function load() {
    getAllQuestions();
}

function deletePost(i){
    console.log("clicked delete " + i );
    let obj = {
        index: questionsArray[i].index,
    
    }
    xhttp.open(DELETE, endPointRoot + "home/delete", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Put on the client side is working");
        }

    }
    reload(1000);
}

function viewPost(i){
    localStorage.setItem("postNum", questionsArray[i].index);
    window.location.href = './post.html';
 
}

function submitPost() {
    let name = document.getElementById("name").innerHTML;
    let text = document.getElementById("textBox").value;
    let obj = {
        id: localStorage.getItem("userNum"),
        msg: text,
        likes: "0",
    }
    console.log(obj);
    console.log("submission: " + name + " " + text); 
    xhttp.open(POST, endPointRoot + "home/submit", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("looks like client side is working");
        }
    };
    reload(3250);
   
}

function reload(time){
    setTimeout(function(){
        window.location.reload(1);
     }, time);
}