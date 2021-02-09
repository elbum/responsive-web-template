const backtotop = document.getElementById('backtotop');

function checkScroll(){
    // 웹페이지가 얼만큼 스크롤 되어있는가
    // MDN 참고

    let pageYOffset = window.pageYOffset;
    if (pageYOffset !== 0) {
        backtotop.classList.add('show');

    } else {
        backtotop.classList.remove('show');
    }

}

function moveBackToTop(){
    if(window.pageYOffset!==0){
        window.scrollTo({top:0,behavior:"smooth"})
    }
}

window.addEventListener('scroll',checkScroll,false);
backtotop.addEventListener('click',moveBackToTop);
// ----------------------------------------------------------------
// 좌우 슬라이딩 버튼 핸들링

const transformPrev = () => {
    
}
const slidePrevList = document.getElementsByClassName('slide-prev');

for (let i=0;i<slidePrevList.length;i++) {
    //ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');

    // 카드가 ul 태그 너비보다 넘치면, 왼쪽버튼 활성화. 오른쪽은 비활성화
    if (classList.clientWidth < (liList.length*260)) {
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click',transformPrev);
    } else {
        // 넘치지 않으면 삭제
        // 태그 삭제시 부모로 가서 child 를 삭제해야 함.
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }

}