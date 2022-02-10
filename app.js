'use strict';
const heady=document.querySelectorAll('.heady');
const btn=document.createElement('button');
// let documentFragment = document.createDocumentFragment();
const div=document.createElement('div');

div.classList.add('beech');
div.textContent="hgfds";
// document.body.appendChild(div)
// heady.appendChild(div)

heady.forEach(n=>{
    console.log(n);

// console.log(n);

// documentFragment.appendChild(n);
    // n.appendChild(div)
    n.appendChild(div.cloneNode(true))
    // console.log(n);

})

btn.classList.add('btn');
div.appendChild(btn)
// document.body.appendChild(btn)
btn.textContent="hiiiii";

btn.addEventListener('click',function(){
    console.log("hi");
})
console.log(btn);
const html=`  <div class="block">
<div class="division">
  <div class="num">
    <img src="images/icon-plus.svg">
    <div class="number">12</div>
    <img src="images/icon-minus.svg">
  </div>
  <div class="section">
    <div class="heady">
      <div class="profile">
        <img src="images/avatars/image-amyrobson.png" class="julio" />
        <span class="name">ambyrobson</span>
        <span class="time">1 month ago</span>
      </div>
      <div class="option">
        <div class="delete"><img src="images/icon-delete.svg">Delete</div>
        <div class="edit"><img src="images/icon-edit.svg">Edit</div>

      </div>
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
      expedita placeat aliquam maiores sapiente ducimus! Repellat sint
      eveniet pariatur corrupti.
    </p>
  </div>
</div>
</div>`

document.body.insertAdjacentHTML('beforebegin',html)
