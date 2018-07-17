"use strict";const gameBoard=(()=>{let e=Array(9).fill("");const t=t=>{return!Boolean(e[t])};const r=()=>{for(let t=0;t<e.length;t++){e[t]=""}};return{contents:e,isEmptyAtIndex:t,reset:r}})();const displayController=(()=>{const e=()=>{let e=document.querySelectorAll(".square");for(let t of e){r(t);n(t)}};const t=e=>{for(let t of e){let e=document.querySelector(`[data-board-index="${t}"]`);e.children[1].classList.add("winner")}};const r=e=>{e.children[1].innerHTML=""};const n=e=>{e.children[1].classList.remove("winner");e.classList.remove("is-flipped")};return{colorSquares:t,clearSquares:e}})();const playerFactory=(e,t,r)=>{return{symbol:e,name:t,imgsrc:r}};const gameFactory=(()=>{const e=[...document.querySelectorAll(".square")];let t=playerFactory("X","Player 1","images/Letter-X.png");let r=playerFactory("O","Player 2","images/Letter-O.png");let n=0;let o=false;const a=()=>{e.forEach(e=>{e.onclick=(()=>{s(e);m()})})};const s=e=>{let t=e.getAttribute("data-board-index");if(!gameBoard.isEmptyAtIndex(t)||o===true){return}else{n++;l(t);c(e)}};const l=e=>{gameBoard.contents[e]=d().symbol};const c=e=>{i(e);e.classList.add("is-flipped")};const i=e=>{let t=e.children[1];let r=document.createElement("img");r.src=d().imgsrc;t.appendChild(r)};const d=()=>{return n%2===0?r:t};const m=()=>{const e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];if(n>=5){e.forEach(e=>{if(gameBoard.contents[e[0]]===""){return}else if(gameBoard.contents[e[0]]===gameBoard.contents[e[1]]&&gameBoard.contents[e[0]]===gameBoard.contents[e[2]]){o=true;displayController.colorSquares(e);u(`${d().name} won! Play again?`)}})}if(!gameBoard.contents.includes("")){o=true;u("The game tied. Play again?")}};const u=e=>{if(confirm(e)){g()}else{return}};const g=()=>{o=false;n=0;gameBoard.reset();displayController.clearSquares()};return{loadSquares:a}})();gameFactory.loadSquares();