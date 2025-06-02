function login(){
    const userid = document.querySelector("#id");
    alert(userid.value + "님, 안녕하세요☆");
    
    window.location.href = "front_main.html?value=" + encodeURIComponent(userid.value);
}

function filter(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("open");
}

function newPro(){
    const newPro = document.querySelector(".product_box ul");
    newPro.innerHTML = "<li><span>[NEW]</span> 루쥬 코코 플래쉬</li> <li><span>[NEW]</span> 레 베쥬 쿠션</li> <li><span>[NEW]</span> 루쥬 알뤼르 벨벳</li>"

    //버튼 on|off
    const onOff1 = document.querySelector("#new");
    const onOff2 = document.querySelector("#best");
    onOff1.classList.add("on");
    onOff2.classList.remove("on");
}

function bestPro(){
    const bestPro = document.querySelector(".product_box ul");
    bestPro.innerHTML = "<li><span>[BEST]</span> 31 le rouge</li> <li><span>[BEST]</span> 레 심볼즈 드 샤넬</li> <li><span>[BEST]</span> 레드 까멜리아</li>"
    
    //버튼 on|off
    const onOff1 = document.querySelector("#new");
    const onOff2 = document.querySelector("#best");
    onOff1.classList.remove("on");
    onOff2.classList.add("on");
    console.log("베스트상품");
}

function colorFunc(){
    document.querySelectorAll(".colorForm input").forEach(input => {
        input.addEventListener("focus", function() {
            const selectedColor = this.id; // input의 id가 색상 이름이므로 가져오기
            const palette = document.querySelector(".palette");

            palette.style.backgroundColor = selectedColor;
            console.log(palette);
        });
    })
}
colorFunc();


// 모든 제품에 클릭 이벤트 추가
document.querySelectorAll(".cosmetics_wrap ul li span").forEach(span => {
    span.addEventListener("click", addToCart);
});

function addToCart(event){
    // 이벤트 객체가 올바르게 전달되었는지 확인
    if (!event) {
        console.error("이벤트 객체가 전달되지 않았습니다!");
        return;
    }

    // 로컬스토리지에서 넘버값 지정 
    if(localStorage.getItem("seq") === null){
        localStorage.setItem("seq", 0);
    }

    // 로컬스토리지에서 가져온 데이터
    const cartStr = localStorage.getItem("cart");
    let cartArry = JSON.parse(cartStr) || [];

    console.log(cartArry);

    // 클릭된 제품의 정보 가져오기
    const productElement = event.target.closest("li"); // 클릭된 요소의 부모 찾기
    if (!productElement) {
        console.error("클릭된 요소가 제품 목록 내부에 없습니다.");
        return;
    }

    // 제품명과 가격을 올바르게 가져오기
    const product = productElement.querySelector(".prodctName").innerHTML;
    const price = Number(productElement.querySelector(".price").innerHTML);

    // 고유한 번호 설정
    let no = Number(localStorage.getItem("seq"));
    localStorage.setItem("seq", ++no);

    // 객체 만들기
    const productVo = {
        product,
        price,
        no
    };

    console.log(productVo);

    // 객체 배열에 담기
    cartArry.push(productVo);

    // 로컬 스토리지에 저장
    localStorage.setItem("cart", JSON.stringify(cartArry));
    
    alert("장바구니 추가 완료!");
}
function selectList(){
    //로컬스토리지 값 가져오기
    const cartStr = localStorage.getItem("cart");
    const cartArry = JSON.parse(cartStr);

    //테이블에 데이터 넣기
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for(let productVo of cartArry){
        const no = productVo.no;
        const product = productVo.product;
        const price = productVo.price;
        tbody.innerHTML += `<tr onclick = "selectOne(this);">
        <td>${no}</td>
        <td>${product}</td>
        <td>${price}</td>
        <td><button onclick="deleteBoard(${no});">X</button></td>
        </tr>`;
    }
}
selectList();

function deleteBoard(no){
    // 버튼 -> td -> tr(부모) -> 자식들 -> 첫번째td -> 넘버    
    // const no = x.parentNode.parentNode.children[0].innerHTML;

    const cartStr = localStorage.getItem("cart");
    const cartArry = JSON.parse(cartStr);

    for(let i=0; i<cartArry.length; i++){
        if(cartArry[i].no == no){
            cartArry.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartArry));

    selectList();
}

function selectOne(x){
    //이벤트가 발생한 요소에 대해 단건 상세조회

    //이벤트 발생한 요소(tr)태그 얻기
    //tr태그 내 게시글 번호 얻기
    const no = x.children[0].innerHTML //tr 자식 td의 0번째
    //번호 이용해서 로컬스토리지에서 꺼내기
    const cartStr = localStorage.getItem("cart");
    const cartArry = JSON.parse(cartStr);

    for(let vo of cartArry){
        if(productVo.no == no){
            //모달창에 데이터 넣기
            document.querySelector("#no").innerHTML = productVo.no;
            document.querySelector("#title").innerHTML = productVo.product;
            document.querySelector("#content").innerHTML = productVo.price;

            //모달창 생성 모달+오버레이
            const modal = document.querySelector("#modal");
            modal.classList.add("active");
            
            const overlay = document.querySelector("#overlay");
            overlay.classList.add("active");
        }
    }
}

function detail(){
    //모달창 생성 모달+오버레이
    const modal = document.querySelector("#modal");
    modal.classList.add("active");
    
    const overlay = document.querySelector("#overlay");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}
function closeModal(x){ //호출하는 함수의 인자값을 받아와서 x로 표현
    x.classList.remove("active");
    document.body.style.overflow = "auto";
}





