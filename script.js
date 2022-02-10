"use strict";
const comment = document.querySelector(".comment");
const body = document.querySelector("body");

const delSection = document.querySelector(".del_comment");
const delBtn = document.querySelector(".del_btn");
const cancelBtn = document.querySelector(".cancel_btn");
const heady = document.querySelectorAll(".heady");

async function load() {
  try {
    const response = await fetch("data.json");
    const users = await response.json();
    users.comments.forEach((element) => {
      description(element);
    });
    users.comments[1].replies.forEach((element) => {
      if (element.id === 4) {
        myComment(element.content, element.replyingTo, element.createdAt);
        sending();
        deleteComment();
        editing();

      } else {
        description(element);
        replying();
      }
    });
    votes();
  } catch (e) {
    console.log(e);
  }
}

load();

function description(users) {
  // console.log(users);
  const html = `<div class="block">
    <div class="division">
      <div class="num">
        <img src="images/icon-plus.svg" class="plus">
        <div class="number">${users.score}</div>
        <img src="images/icon-minus.svg" class="minus">
      </div>
      <div class="section">
        <div class="heady">
          <div class="profile">
       <img src="${users.user.image.png}" class="julio" />
            <span class="name">${users.user.username}</span>
            <span class="time">${users.createdAt}</span>
          </div>
          
          
          <div class="reply"><img src="images/icon-reply.svg" class="img_reply"><span class="repli">Reply</span></div>
        </div>
        <p>
        <span class="dark">${
          !users.replyingTo ? "" : "@" + users.replyingTo
        }</span>
        <span class="para"> ${users.content}</span>
        </p>
      </div>
    </div>
    </div>
    `;

  comment.insertAdjacentHTML("beforebegin", html);
}

function myComment(para, replyTo, time, chk) {
  const html = `    <div class="block ${(chk)?'beech':''}">
    <div class="division">
      <div class="num">
        <img src="images/icon-plus.svg" class="plus">
        <div class="number">12</div>
        <img src="images/icon-minus.svg" class="minus">
      </div>
      <div class="section">
        <div class="heady">
          <div class="profile">
            <img src="images/avatars/image-juliusomo.png" class="julio" />
            <span class="name">juliusomo</span>
            <span class="time">${time ? time : "Now"}</span>
          </div>
          <div class="option">
          <div class="delete"><img src="images/icon-delete.svg">Delete</div>
          <div class="edit"><img src="images/icon-edit.svg">Edit</div>
  
        </div>
           </div>
        <p>
        <span class="dark">
       ${(replyTo) ? "@" + replyTo : ""}</span>
        <span class="para"> ${para}</span>
        </p>
      </div>
    </div>
  </div> 
    `;
  if (chk) return html;
  comment.insertAdjacentHTML("beforebegin", html);
}

function addComment(val, choice) {
  const html = `  <div class="comment">
    <img src="images/avatars/image-juliusomo.png" class="julio" />
    <textarea
      id="texty"
      class="text"
      row="60"
      col="200"
      value="uu"
      placeholder="Add the comment"

    >${val ? val : ""}</textarea>
    <button class="btn ${choice === "update" ? "update" : "send"}">${
    choice === "update" ? "UPDATE" : "SEND"
  }</button>
  </div>`;


  return html;
}
function deleteComment() {
  const del = document.querySelectorAll(".delete");
  del.forEach((n) =>
    n.addEventListener("click", function (e) {
      delSection.classList.remove("hidden");
      body.style.backgroundColor = "rgba(0,0,0,0.6)";
      body.style.overflowY = "hidden";
      cancelBtn.addEventListener("click", function () {
        delSection.classList.add("hidden");
        body.style.backgroundColor = "hsl(228, 33%, 97%)";
        body.style.overflowY = "scroll";
      });

      delBtn.addEventListener("click", function () {
        delSection.classList.add("hidden");
        body.style.backgroundColor = "hsl(228, 33%, 97%)";
        body.style.overflowY = "scroll";
        e.target.closest(".block").style.display = "none";
      });

    })
  );
}
const text = document.querySelector(".text");
let a;

function editing() {
  console.log("changyy");

  const edit = document.querySelectorAll(".edit");
console.log(edit);

  edit.forEach((n) =>
    n.addEventListener("click", function (e) {
      console.log( e.target);
      let val =
        e.target.closest(".section").children[1].lastElementChild.textContent;

      let v =
        e.target.closest(".section").children[1].firstElementChild.textContent;
    
      const choice = "update";
      const html = addComment(val, choice);
      let updateTo= e.target.closest('.block').previousElementSibling
      e.target.closest(".block").insertAdjacentHTML("beforebegin", html);
      e.target.closest(".block").classList.add("hidden");
      a = e.target;

      updating(v,updateTo);
      deleteComment();
    })
  );
}
let t=0;
let b = 0;
let m = 0;

function sending(blocky) {
  const send = document.querySelectorAll(".send");

  send.forEach((n) =>
    n.addEventListener("click", function (e) {      
      // console.log("sendiiii");
      let para = e.target.previousElementSibling.value;
      let replyTo =
        e.target.parentElement.previousElementSibling.children[0]
          .lastElementChild.firstElementChild.firstElementChild
          .firstElementChild.nextElementSibling.textContent;
      let time = "Now";
      if(replyTo==='juliusomo'){
        if (text.value === "") return;
        const html = myComment(text.value);
        deleteComment();
        text.value = "";
      }
      else{
        if (para === "") return;
      const html = myComment(para, replyTo, time, 1);
      let k= blocky.insertAdjacentHTML("afterend", html);
      e.target.parentElement.classList.add('hidden');
      }
  deleteComment();
editing();
    })
  );
}
function updating(replyTo,updateTo) {
  // console.log("fieeeeee");
  const update = document.querySelectorAll(".update");
  update.forEach((n) =>
    n.addEventListener("click", function (e) {
      console.log("updatiiiii");
      // console.log(updateTo);
      if (e.target.classList.contains("update")) {
        let para = e.target.previousElementSibling.value;
     if(replyTo)   replyTo=replyTo.replace('@','')
        if((replyTo.trim()).length===0)replyTo=undefined;
        // if(!updateTo.classList.contains('hidden')){
        let time="Now"
        const html=myComment(para, replyTo,time,1);
        updateTo.insertAdjacentHTML('afterend',html);
        e.target.parentElement.classList.add("hidden");
    //   }
    // else{
    //   myComment(para,replyTo)
    //   e.target.parentElement.classList.add("hidden");

    // }
    }
      // editing();
      deleteComment();
    })
  );
}


function replying() {
  // console.log("repliii");
  const reply = document.querySelectorAll(".repli");

  reply.forEach((n) =>
    n.addEventListener("click", function (e) {
     
// if(m)m.classList.add('.hidden')
      // console.log(e.target.parentElement.classList);
      // console.log(e.target.closest(".block"));
      let blocky = e.target.closest(".block");
      // console.log(e.target.closest(".heady").nextElementSibling.textContent);
      const html = addComment();
      e.target.closest(".block").insertAdjacentHTML("afterend", html);
      // m=e.target.closest('main').nextElementSibling;
      // console.log(m);

      sending(blocky);
    })
  );
}

let count;
function votes(){
const plus=document.querySelectorAll('.plus');
const minus=document.querySelectorAll('.minus');

const num=document.querySelectorAll('.number')
plus.forEach(n=>n.addEventListener('click',function(e){
    // console.log(e.target.nextElementSibling.textContent);
count=+e.target.nextElementSibling.textContent+1;
e.target.nextElementSibling.textContent=count;
}))

minus.forEach(n=>n.addEventListener('click',function(e){
    if(count===0)return;
    // console.log(e.target.previousElementSibling.textContent);
count=+e.target.previousElementSibling.textContent-1;
e.target.previousElementSibling.textContent=count;
}))
}



// function practice(){
//     // console.log("changyy");
//   let replyTo, updateTo;

//     const edit = document.querySelectorAll(".edit");
//     edit.forEach((n) =>
//       n.addEventListener("click", function (e) {
//         console.log(e.target.parentElement.parentElement.parentElement.parentElement.parentElement);
//         let val =
//           e.target.closest(".section").children[1].lastElementChild.textContent;
  
//        replyTo =
//           e.target.closest(".section").children[1].firstElementChild.textContent;
      
//         const choice = "update";
//         const html = addComment(val, choice);
//          updateTo= e.target.closest('.block').previousElementSibling
//         // let updateTo=e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
//         e.target.closest(".block").insertAdjacentHTML("beforebegin", html);
//         e.target.closest(".block").classList.add("hidden");
//         a = e.target;


//   const update = document.querySelectorAll(".update");
//   console.log(update);
//   update.forEach((n) =>
//     n.addEventListener("click", function (e) {
//       console.log("updatiiiii");
//       console.log(updateTo);
//       if (e.target.classList.contains("update")) {
//         // console.log(e.target.previousElementSibling);
//         let para = e.target.previousElementSibling.value;
//      if(replyTo)   replyTo=replyTo.replace('@','')
//         if((replyTo.trim()).length===0)replyTo=undefined
//         // if(!updateTo.classList.contains('hidden')){
//         let time="Now"
//         const html=myComment(para, replyTo,time,1);
//         updateTo.insertAdjacentHTML('afterend',html);
//         e.target.parentElement.classList.add("hidden");
//     //   }
//     // else{
//     //   myComment(para,replyTo)
//     //   e.target.parentElement.classList.add("hidden");

//     // }
//     }
//     })
//   );
//         deleteComment();
//       })
//     );

//     }

