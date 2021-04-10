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

/**
 * Get all questions.
 */
 function getPost() {
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
        
                for (let i= 0; i < dbQuestions.length; i++) {
                  
                    if(dbQuestions[i].index == localStorage.getItem("postNum")){
                        console.log( dbQuestions[i]);
                        postArray.push(dbQuestions[i]);                
                        let postCont = document.getElementById("postDiv");      
                        let postDiv = document.createElement("div");
                        postDiv.setAttribute("class", "posts");
                        let postUser = document.createElement("div");
                        let para = document.createTextNode(dbQuestions[i]["username"]+ " " + i);
                        postUser.appendChild(para);
                        let textPara = document.createElement("p");
                        textPara.innerHTML = dbQuestions[i]["msg"];
                        let likeButt = document.createElement("button");
                        likeButt.setAttribute("onclick", "addLike("+i+")");
                        likeButt.setAttribute("id" , "likeButt_"+i);
                        likeButt.innerHTML =  dbQuestions[i]["likes"] + " Likes";
                        postDiv.appendChild(postUser);
                        postDiv.appendChild(textPara);
                        postDiv.appendChild(likeButt);
                        postCont.appendChild(postDiv);
    
                    }
                }
            }).catch((dbQuestions) => {
                console.log('Error');
            })
            getComments();
        }
    };
}

function addLike(i){
    console.log("Likes: " + i + postArray);
    console.log(postArray);
    let l = 0;
  
        l =postArray[0].likes ;

       l++;
       let obj = {
           index: postArray[0].index,
           likes: l,
       }
       document.getElementById("likeButt_"+i).innerHTML=l + " Likes";
       console.log("change " + obj.likes);
       xhttp.open(PUT, endPointRoot + "post/like", true);
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
    window.onload = console.log(localStorage.getItem("postNum"));
    if(localStorage.getItem("postNum") == null){
        alert("No post chosen.");
    }
    getPost();
  //  getComments();
}

function getComments(){
    let obj = {
        //  index: questionsArray.length 
          pid: localStorage.getItem("postNum"),
      }
    xhttp.open(POST, endPointRoot + "post/comment", true);
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
                console.log('Retrieved items');
                for (let i= 0; i < dbQuestions.length; i++) {
                    console.log( dbQuestions[i]);       
                         
                        let postCont = document.getElementById("commentDiv");      
                        let postDiv = document.createElement("div");
                        postDiv.setAttribute("class", "posts");
                        let postUser = document.createElement("div");
                        let para = document.createTextNode("Demo name " + dbQuestions[i]["name"] + i);
                        postUser.appendChild(para);
                        let textPara = document.createElement("p");
                        textPara.innerHTML = dbQuestions[i]["msg"];
                        postDiv.appendChild(postUser);
                        postDiv.appendChild(textPara);
                        postCont.appendChild(postDiv);
                        
                }
            }).catch((dbQuestions) => {
                console.log('Error');
            })
        }
    };

}
//submit comment
function submitComment(){
   
    let name = document.getElementById("name").innerHTML;
    let username = document.getElementById("username").innerHTML;
    let i = 0;
    let text = document.getElementById("textBox").value;

    let obj = {
      //  index: questionsArray.length ,
   
        uid: localStorage.getItem("userNum"),
        pid: localStorage.getItem("postNum"),
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