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
const transformNext = (event) => {
    console.log('transform-next',event)
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    console.log('data-position = ',Number(activeLi))
    const liList = classList.getElementsByTagName('li');

    // 하나의 카드라도 왼쪽으로 이동했다면, 오른쪽으로 갈 수 있음.
    if (Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;

        // 왼쪽 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈 수 있으므로 prev 버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click',transformPrev);

        // 맨왼쪽에 카드가 첫번째 카드면. 오른쪽(next)는 갈수 없으므로 next 비활성
        if (Number(activeLi) === 0){
            slideNext.style.color='#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click',transformNext);
        }
    }
}
const transformPrev = (event) => {
    console.log('transform-prev',event)
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    // ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    console.log('data-position = ', Number(activeLi))
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

       if(classList.clientWidth > (liList.length * 260 + Number(activeLi))){
           slidePrev.style.color='#cfd8dc';
           slidePrev.classList.remove('slide-prev-hover');
           slidePrev.removeEventListener('click',transformPrev);
       }

       slideNext.style.color = '#2f3059';
       slideNext.classList.add('slide-next-hover');
       slideNext.addEventListener('click',transformNext);


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

/*--------------------------------------------------------*/

let toucstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;

function processTouchStart(event) {
    mouseStart = true; 
    event.preventDefault(); // 해당요소의 고유 동작 제거 (이미지 끄는거..)
    touchstartX = event.clientX || event.touches[0].screenX;   // 터치까지 처리 
    currentImg = event.target;

    // 드래그처리
    currentImg.addEventListener('mousemove',processTouchMove);
    currentImg.addEventListener('mouseup',processTouchEnd);

    // 모바일 터치 처리
    currentImg.addEventListener('touchmove',processTouchMove);
    currentImg.addEventListener('touchend',processTouchEnd);

    currentClassList = currentImg.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute('data-position');

}
function processTouchMove(event) {
    event.preventDefault();
    let currentX = event.clientX || event.touches[0].screenX;   // 터치까지 처리 ;  // 현재위치
    // 얼만큼 이동중인지//
    nowActiveLi = Number(currentActiveLi) + (Number(currentX)-Number(touchstartX));

    // 카드를 이동
    currentClassList.style.transition = 'transform 0s linear';
    currentClassList.style.transform = 'translateX('+String(nowActiveLi) + 'px)';

}
function processTouchEnd(event){
    event.preventDefault();

    // 마우스 이벤트로 발생한것인지
    if (mouseStart === true) {
        currentImg.removeEventListener('mousemove',processTouchMove); // 마우스무브 이벤트 삭제
        currentImg.removeEventListener('mouseup',processTouchMove); // 마우스업 이벤트 삭제
        // 모바일 터치 처리
        currentImg.addEventListener('touchmove',processTouchMove);
        currentImg.addEventListener('touchend',processTouchEnd);

        // 다시 원래 포지션으로 돌아오기.
        currentClassList.style.transition='transform 1s ease';
        currentClassList.style.transform = 'translateX(0px)';
        currentClassList.setAttribute('data-position',0);

        // 좌우버튼 버튼도 초기화
        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0];
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1];
        let eachLiList = currentClassList.getElementsByTagName('li');
        if(currentClassList.clientWidth < (eachLiList.length*260)) {
            eachSlidePrev.style.color='#2f3059';
            eachSlidePrev.classList.add('slide-prev-hover');
            eachSlidePrev.addEventListener('click',transformPrev);

            eachSlideNext.style.color='#2f3059';
            eachSlideNext.classList.remove('slide-prev-hover');
            eachSlideNext.removeEventListener('click',transformNext);
        } else {
            // 카드가 ul 보다 넘치지 않으면 prev,next 삭제함.  다른코드로 완벽제어했으면 불필요.
            const eachViewAllNode = slidePrev.parentNode;
            eachViewAllNode.removeChild(slidePrev.nextElementSibling);
            eachViewAllNode.removeChild(slidePrev);
        }
        
        mouseStart=false;
    }
}
// 특정 요소를 드래그 하다가 요소 밖에서 드래그를 끝낼 수 있으므로 이벤트 걸어줌
window.addEventListener('dragend',processTouchEnd);
window.addEventListener('mouseup',processTouchEnd);

// 인터페이스간의 오동작을 막기위해, 카드 내의 이미지에만 드래그 인터페이스를 제공
const classImgLists = document.querySelectorAll('ul li img');
for (let i=0;i<classImgLists.length;i++) {
    //해당 요소에 마우스를 눌러서 드래그를 시작.
    classImgLists[i].addEventListener('mousedown',processTouchStart);
    classImgLists[i].addEventListener('touchstart',processTouchStart);

}

// touchstartX,touchmove,touchend  모바일 이벤트