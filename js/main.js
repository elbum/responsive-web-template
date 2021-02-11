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

const transformPrev = (event) => {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    // ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li')
   
    /* classList.clientWidth 는 ul 태그의 실질적인 너비
    liList.length * 260 에서 260 은 각 li 요소의 실질 너비(margin 포함)
    activeLi 는 data-position 에 있는 현재 위치 
    즉, liList.length * 260 + Number(activeLi) 는 현재 위치부터 오른쪽으로 나열되야 하는 나머지 카드들의 너비
    */

    /* classList.clientWidth < (liList.length * 260 + Number(activeLi)) 의미는
    오른쪽으로 나열될 카드들이 넘친 상태이므로, 왼쪽으로 이동이 가능함
    */
   if (classList.clientWidth < (liList.length * 260 + Number(activeLi)))
   {
       activeLi = Number(activeLi) - 260 ;

       if(classList.clientWidth> (liList.length * 260 + Number(activaLi))){
           slidePrev.style.color='#cfd8dc';
           slidePrev.classList.remove('slide-prev-hover');
       }
       
       slideNext.style.color = '#2f3059';
       slideNext.classList.add('slide-next-hover');

       classList.style.transition = 'transform 1s';
       classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
       classList.setAttribute('data-position',activeLi);

   }

    
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