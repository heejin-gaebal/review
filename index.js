const recipeArry = [];  //레시피 배열

function addList(){
    //재료 입력받기
    //수량 입력받기
    const ingrdnt = document.querySelector("#ingrdnt").value;
    const qntty = document.querySelector("#qntty").value;

    const obj = { //묶어서 객체로 표현
        ingrdnt : ingrdnt,
        qntty : qntty
    };
    //배열저장
    recipeArry.push(obj); 
    console.log(recipeArry);
}

function completeList(){
    // 배열을 JSON 형태로 저장
    const jsonStr = JSON.stringify(recipeArry);
    localStorage.setItem("레시피", jsonStr);
}

function selectTodo(){
    const result = localStorage.getItem("레시피");
    const resultArry = JSON.parse(result);
    //json의 문자열을 js로 변환하기

    for(let obj of resultArry){
        const check = document.createElement("h3");
        check.innerHTML = obj.ingrdnt + " : " + obj.qntty;

        const recipeList = document.querySelector("#ingrdnt_list");
        recipeList.appendChild(check);
    }
}

function timeDelay(){
    setTimeout(function(){
        alert('리스트 작성하구 확인완료 ~.~');
        selectTodo();
    }, 1000);
}

function checkList(){
    timeDelay();
}