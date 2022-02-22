"use strict";

//Declaration
const container = document.querySelector(".container");
const text = document.querySelector(".text");
const body = document.querySelector("body");
const main = document.querySelector("main");

const delSection = document.querySelector(".del_comment");
const delBtn = document.querySelector(".del_btn");
const cancelBtn = document.querySelector(".cancel_btn");

//Event Listners
window.addEventListener("load", load);

//functions
async function load() {
  container.innerHTML = "";
  console.log("hi");
  const res = await fetch("data.json");
  const data = await res.json();
  const dict = JSON.parse(localStorage.getItem("comment"));
  const users = dict ? dict : data;
  localStorage.setItem("comment", JSON.stringify(users));
  initial();
}

function initial() {
  const initComment = JSON.parse(localStorage.getItem("comment"));
  let comment = initComment.comments;
  for (let i = 0; i < comment.length; i++) {
    if (comment[i].user.username !== initComment.currentUser.username) {
      description(comment[i].id, comment[i]);
    } else {

      myComment(comment[i].id, comment[i].content, "", comment[i].createdAt);
    }


    if (comment[i].replies.length !== 0) {
      let inner = comment[i].replies;
      for (let i = 0; i < inner.length; i++) {
        if (inner[i].user.username !== initComment.currentUser.username) {
          description(inner[i].id, inner[i]);
        } else {
          myComment(
            inner[i].id,
            inner[i].content,
            inner[i].replyingTo,
            inner[i].createdAt
          );
        }
      }
    }
  }
  deleteComment();
  sending();
  replying();
  editing();
  votes();
}

function description(id, users) {
  // console.log(users);
  const html = `<div class="block" data-id="${id}">
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
  container.insertAdjacentHTML("beforeend", html);
}

function myComment(id, para, replyTo, time, chk) {
  const html = `<div class="block ${replyTo ? "beech" : ""}" data-id="${id}">
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
         ${replyTo ? "@" + replyTo : ""}</span>
          <span class="para"> ${para}</span>
          </p>
        </div>
      </div>
    </div> 
      `;
  if (chk) return html;
  container.insertAdjacentHTML("beforeend", html);
}

function deleteComment() {
  let dict = JSON.parse(localStorage.getItem("comment")) || [];
  const del = document.querySelectorAll(".delete");
  del.forEach((n) =>
    n.addEventListener("click", function (e) {
      let data = n.closest(".block").dataset.id;
      //display modal and overlay
      delSection.classList.remove("hidden");
      const over = document.createElement("div");
      over.classList.add("overlay");
      const scrollTop = `${window.pageYOffset}px`;
      over.style.top = scrollTop;
      // over.style.top=`0%`
      over.style.height='100%'
      main.appendChild(over);
      body.style.overflowY = "hidden";

      //if click cancel
      cancelBtn.addEventListener("click", function () {
        delSection.classList.add("hidden");
        over.classList.remove("overlay");
        body.style.overflowY = "scroll";
      });

      //If click delete
      delBtn.addEventListener("click", function () {
        dict.comments.map((item) => {
          if (item.id === +data) {
            dict.comments.splice(dict.comments.indexOf(item), 1);
          }
        });

        dict.comments.map((item) => {

          if (item.replies.length !== 0) {
            item.replies.forEach((n) => {
              console.log(n);
              if (n.id === +data) {
                item.replies.splice(item.replies.indexOf(n), 1);
              }
            });
          }
        });
        localStorage.setItem("comment", JSON.stringify(dict));
        container.innerHTML = "";

        initial();
        delSection.classList.add("hidden");
        over.classList.remove("overlay");
        body.style.overflowY = "scroll";
      });
    })
  );
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

function replying() {
  const reply = document.querySelectorAll(".repli");

  reply.forEach((n) =>
    n.addEventListener("click", function (e) {
      let blocky = e.target.closest(".block").dataset.id;
      const html = addComment();
      e.target.closest(".block").insertAdjacentHTML("afterend", html);
      sending(blocky);
    })
  );
}

function sending(idd) {
  let dict = JSON.parse(localStorage.getItem("comment")) || [];
  const send = document.querySelectorAll(".send");
  send.forEach((n) =>
    n.addEventListener("click", function (e) {
      let para = e.target.previousElementSibling.value;

      if (text.value) {
        if (text.value === "") return;
        // console.log(text.value);
        details(text.value, dict.comments, "");
        localStorage.setItem("comment", JSON.stringify(dict));
        text.value = "";
        container.innerHTML = "";
        initial();
      }
      dict.comments.map((item) => {
        if (item.id === +idd) {
          details(para, item.replies, item);
        }

        item.replies.map((n) => {
          if (n.id === +idd) {
            details(para, item.replies, n);
          }
        });
      });
      localStorage.setItem("comment", JSON.stringify(dict));
      text.value = "";
      para = "";
      container.innerHTML = "";
      initial();
    })
  );
}

function details(para, local, item) {
  const detail = {
    id: Math.trunc(Math.random() * 200),
    content: `${para}`,
    createdAt: "Now",
    score: 0,
    replyingTo: `${item ? item.user.username : ""}`,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
      },
      username: "juliusomo",
    },
    replies: [],
  };
  local.push(detail);
}


function editing() {
  let dict = JSON.parse(localStorage.getItem("comment")) || [];

  const edit = document.querySelectorAll(".edit");
  // console.log(edit);

  edit.forEach((n) =>
    n.addEventListener("click", function (e) {
      let set = n.closest(".block").dataset.id;
      dict.comments.map((item) => {
        if (item.id === +set) {
          let val = item.content;
          const choice = "update";
          const html = addComment(val, choice);
          e.target.closest(".block").insertAdjacentHTML("beforebegin", html);
          e.target.closest(".block").classList.add("hidden");
          updating(item.id);
        }
        item.replies.map((n) => {
          if (n.id === +set) {
            let val = n.content;
            const choice = "update";
            const html = addComment(val, choice);
            e.target.closest(".block").insertAdjacentHTML("beforebegin", html);
            e.target.closest(".block").classList.add("hidden");
            updating(n.id);
          }
        });
      });
    })
  );
}

function updating(id) {
  let dict = JSON.parse(localStorage.getItem("comment")) || [];

  const update = document.querySelectorAll(".update");
  update.forEach((n) =>
    n.addEventListener("click", function (e) {
      let para = e.target.previousElementSibling.value;
      dict.comments.map((item) => {
        if (item.id === id) {
          item.content = para;
        }

        item.replies.map((t) => {
          if (t.id === id) {
            t.content = para;
          }
        });
      });
      localStorage.setItem("comment", JSON.stringify(dict));
      para = "";
      container.innerHTML = "";
      initial();
    })
  );
}

let count;
function votes(){
const plus=document.querySelectorAll('.plus');
const minus=document.querySelectorAll('.minus');

const num=document.querySelectorAll('.number')
plus.forEach(n=>n.addEventListener('click',function(e){
count=+e.target.nextElementSibling.textContent+1;
e.target.nextElementSibling.textContent=count;
}))

minus.forEach(n=>n.addEventListener('click',function(e){
    if(count===0)return;
count=+e.target.previousElementSibling.textContent-1;
e.target.previousElementSibling.textContent=count;
}))
}

