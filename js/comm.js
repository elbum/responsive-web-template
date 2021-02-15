// RESTAPI with axios
// axios 는 promise api 지원. 명시안해도 프로미스.

function getNewsGet() { 
    axios("http://localhost:8082/news",{
        method:"get",
        params: {
            email: "test@test.com",
        }
    }).then((response)=> {
        console.log(response.data['status'],response.data['info']);
        const newsMsg = document.querySelector('.news');
        newsMsg.innerText = response.data['info'];
    }).catch((error) => {
        console.log(error);
    })

}

function getNewsPost() {
    axios("http://localhost:8082/news",{
        method:"post",
        data:{
            email:"test@test.com"
        }
    }).then((response)=> {
        console.log(response.data['status'],response.data['info']);
        const newsMsg = document.querySelector('.news');
        newsMsg.innerText = response.data['info'];
    }).catch((error) => {
        console.log(error);
    })
}
getNewsGet();
