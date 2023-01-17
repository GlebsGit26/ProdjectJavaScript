                                //Header
///////////////////////////////////////////////////////////////////////////////
$('.exit').click(function (){
    clearCookie()
    window.location=".Index.html";
})

let cookieObj = {}
let massReg = ['firstName','date','lastName','email','password','passRepeat']

//ПРОВЕРКА КУККИ
function checkCookie(){
    let cookie = document.cookie;
    let cookieMass = cookie.split('; ');
    let razdel
    for (let i = 0;i < cookieMass.length;i++){
        razdel = cookieMass[i].split('=');
        cookieObj[razdel[0]] = razdel[1];
    }
    $('.nameUser').text(cookieObj.firstName + ' ' + cookieObj.lastName)
}

//ОЧCИТКА КУККИ ПРИ ВЫХОЕ ИЗ СТРАНИЦЫ
function clearCookie(){
    let expDateClear = new Date();
    expDateClear = expDateClear.toUTCString();
    for (let i = 0;i < massReg.length; i++){
        if(massReg[i] in cookieObj){
            document.cookie = `${massReg[i]}=${cookieObj[massReg[i]]}; expires =${expDateClear}`
        }
    }
}
                                //Commentaries
///////////////////////////////////////////////////////////////////////////////
$('.commentSend').click(function (){
    let textComm = $('.newCommentText')
    let sendComm = $('.sendComment')
    if(textComm.val().length > 1){
        sendComm.eq(0).before(`<div class="sendComment">
                <div class="commAva"></div>
                <div class="bodyComment">
                   <span class="commName">${$('.nameUser').text()}</span>
                   <span class="commTime">${dateUser(0,10)} в ${dateUser(11,17)}</span>
                   <span class="commText">${textComm.val().replace(/\s+/g, ' ').trim()}</span>
                   <div class="commLike">
                        <img src="Img/icons/likeUn.png" alt="like">
                        <span>0</span>
                    </div>
                </div>`)
        textComm.val('')
    }
    $('.commLike').eq(0).click(commLike)
    $('.countComm').html(`${sendComm.length + 1}`)
})
function dateUser(n1,n2){
    let userTime = new Date();
    return userTime.toLocaleString().slice(n1, n2);
}



