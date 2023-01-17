"use strict";

                                //REQUEST
///////////////////////////////////////////////////////////////////////////////
let request
if (window.XMLHttpRequest){
    request = new XMLHttpRequest();
}
else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}

                                //Body Check cookie
///////////////////////////////////////////////////////////////////////////////
//ПРОВЕРКА COOKIE
function checkCookie(){
    let cookieObj = {}
    let cookie = document.cookie;
    let cookieMass = cookie.split('; ');
    let razdel
    for (let i = 0;i < cookieMass.length;i++){
        razdel = cookieMass[i].split('=');
        cookieObj[razdel[0]] = razdel[1];
    }
    if('passRepeat' in cookieObj){
        window.location=".Index_userReg.html";
    }
}
                                //PopUp
///////////////////////////////////////////////////////////////////////////////
$('.popupClose').click(function () {
	$(this).closest('.popUpWrapper').fadeOut(400);
});
(function popUp(){
    setTimeout(function (){
        $('.popUpWrapper').fadeIn(250)
    },3000)
})()
                                //SportSection
///////////////////////////////////////////////////////////////////////////////
let flagNav = true;
let navigate = $('nav');

setTimeout(() =>{
    navigate.show();
},300)

$('nav a').click(function (){
    let link = $(this).attr('href');
    let top = $(link).offset().top;
    $('body,html').animate({scrollTop: `${top}`}, 1200);
})

function hideNav(){
    if($(window).scrollTop() < 100){
        navigate.css({
            top: '90px'
        })
        return
    }
    if(!flagNav){
        navigate.addClass('active')
        $('nav ul').hide()
    }else {
        $('nav ul').show()
        navigate.removeClass('active')
    }
    navigate.css({
        top: $(window).scrollTop()
    })
}

$(window).scroll(function (){
    flagNav = $(window).scrollTop() <= 200;
    hideNav()
})

navigate.mouseenter(function (){
    flagNav = true;
    hideNav();
});
navigate.on('mouseleave', function (){
    if($(window).scrollTop() > 350){
        flagNav = false
    }
    hideNav();
})
                                //SportChoose
///////////////////////////////////////////////////////////////////////////////

$('.familyInfo div').hover(function (){
    $(this).find('h4').toggleClass('active')
})

                                //SportChoose
///////////////////////////////////////////////////////////////////////////////

//ОБРАБОТЧИК ПРИ КРИКЕ НА ВКЛАДКУ
$('.hSport').click(function (){
    let activeHeaderSport = $(this).hasClass('active') ? $(this) : $(this).parent().find('.hSport.active');
    let activeImgSportItem = $('.ImgMotivation').find('.imgSportItem.active');
    if(!$(this).hasClass('active')){
        activeImgSportItem.addClass('animate__animated animate__backOutLeft');
        activeHeaderSport.next().slideUp(400).removeClass('active');
        activeHeaderSport.removeClass('active animate__animated animate__bounce');
        setTimeout(() =>{
            $(this).addClass('active animate__animated animate__bounce');
            activeHeaderSport.find('span').html('&#9660');
        },200)

        setTimeout(() =>{
            activeImgSportItem.removeClass('active animate__animated animate__backOutLeft');
            $('.imgSportItem').eq($('.hSport').index(this)).addClass('active animate__animated animate__backInLeft')
        },400)

        setTimeout(() =>{
            $(this).next().slideToggle(400).addClass('active');
            $(this).find('span').html('&#9650;');
        },700)
    }
});

                                //Table calorie Use
///////////////////////////////////////////////////////////////////////////////

let tableMessage
let tableData1

//ФУНКЦИЯ С СИНХРОННЫМ ЗАПРОСОМ ПОЛУЧАЕТ ДАННЫЕ ИЗ JSON ФАЙЛОВ ДЛЯ ТАБЛИЦЫ
function getAsunc(url,variable){
    request.open("GET", url, false)
    request.onreadystatechange = function (){
        if (request.readyState === 4){
            variable = JSON.parse(request.response)
        }
    }
    request.send();
    return variable;
}
tableData1 = getAsunc("JSON/tableData.json",tableData1);                //получаем таблицы
tableMessage = getAsunc("JSON/tableMessage.json",tableMessage);         //получаем сообщения для таблиц

//КЛАСС С ОСНОВНЫМИ ДАННЫМИ ДЛЯ ТАБЛИЦЫ
class TableData {
    constructor(num,tbody,tableInfo,messageTable,messagePlace) {
        this.num = num;
        this.tbody = tbody;
        this.tableInfo = tableInfo;
        this.messageTable = messageTable;
        this.messagePlace = messagePlace;
    }
}

//КЛАСС ПРОИЗВОДИТ ОПЕРАЦИИ НАД ТАБЛИЦЕЙ
class TableUse extends TableData{
    //ДОБАВЛЯЕТ АНИМАЦИЮ
    tableAnimate(div){
        div.animate({
            height: [ "toggle", "swing" ]
        }, 400, "linear");
    }
    //ОЧИЩАЕТ ТАБЛИЦУ И ЗАПОЛНЯЕТ НОВЫЕ ДАННЫЕ
    tableCreate(){
        this.tbody.empty();
        let rowsTable = Object.values(this.tableInfo)[this.num];
        for (let i = 0;i < rowsTable.length;i++){
            this.tbody.append(`<tr></tr>`);
            for (let j = 0;j < rowsTable[i].length;j++){
                this.tbody.children().eq(i).append(`<td>${rowsTable[i][j]}</td>`)
            }
        }
    }
    //ДОБАВЛЯЕТ НОВОЕ ОПИСАНИЕ ДЛЯ ТАБЛИЦЫ
    messageCreate(){
        this.messagePlace.html(Object.values(this.messageTable)[this.num]);
    }
}

//ВЫЗЫВАЕТСЯ АВТОМАТИЧЕСКИ И ЗАПОЛНЯЕТ ТАБЛИЦУ ПРИ ОТКРЫТИИ САЙТА
(function dataTable(){
    let yourTable = new TableUse(0,$('tbody'),tableData1,tableMessage,$('.messageInfo'));
    yourTable.messageCreate();
    yourTable.tableCreate();
}())

//ОБРАБОТЧИК ПРИ КЛИКЕ НА НАЗВАНИЕ ТАБЛИЦЫ
$('.nameTable').click(function (){
    let activeNameTable = $(this).hasClass('active') ? $(this) : $(this).parent().find('.nameTable.active');
    if(!$(this).hasClass('active')){
        activeNameTable.removeClass('active')
        $(this).addClass('active')
    }

    //СОЗДАЛИ ЭКЗЕМПЛЯР КЛАССА
    let yourTable = new TableUse($(this).index(),$('tbody'),tableData1,tableMessage,$('.messageInfo'));
    yourTable.tableAnimate($('.forTable'));

    //ЗАПУСТИЛИ МЕТОДЫ
    setTimeout(() => {
        yourTable.tableCreate();
        yourTable.tableAnimate($('.messageInfo'));
        yourTable.tableAnimate($('.forTable'));
    },400);
    setTimeout(() => {
        yourTable.messageCreate();
        yourTable.tableAnimate($('.messageInfo'));
    },800);
})

                                //Send Commentaries
///////////////////////////////////////////////////////////////////////////////
let fulComs
request.open("GET", "JSON/fullCommentaries.json",false)
request.onreadystatechange = function (){
    if (request.readyState === 4){
        fulComs = JSON.parse(request.response)
    }
}
request.send();

(function commentLoad(){
    let fulComsRevers = []
    for(let key in fulComs){
        fulComsRevers.push(fulComs[key])
    }
    fulComsRevers = fulComsRevers.reverse()
    for (let i = 0; i < fulComsRevers.length;i++){
        $('.fullComments').append(`<div class="sendComment">
            <div class="commAva" style='background-image: url("${fulComsRevers[i].ava}");
            background-size: ${fulComsRevers[i].size};
            background-position: ${fulComsRevers[i].position}'></div>
            <div class="bodyComment">
               <span class="commName">${fulComsRevers[i].name}</span>
               <span class="commTime">${fulComsRevers[i].time}</span>
               <span class="commText">${fulComsRevers[i].text}</span>
               <div class="commLike">
                    <img src="Img/icons/likeUn.png" alt="like">
                    <span>${fulComsRevers[i].like}</span>
                </div>
            </div>`)
    }
    $('.countComm').html(`${fulComsRevers.length}`)
})()

$('.newCommentText').on('input',function (){
    if($(this).val().length > 0){
        $('.commentSend').addClass('active')
    } else {
        $('.commentSend').removeClass('active')
    }
})

$('.commLike').click(commLike)
function commLike(){
    let like = Number($(this).children('span').text());
    $(this).toggleClass('active')
    if ($(this).hasClass('active')) {
        like++;
        $(this).children('span').html(like);
        $(this).children('img').attr('src', 'Img/icons/likeActive.png');
    } else {
        like--;
        $(this).children('span').html(like);
        $(this).children('img').attr('src', 'Img/icons/likeUn.png');
    }
}

                                //weather
///////////////////////////////////////////////////////////////////////////////
(function loadBlockFood(){
    for(let i = 0;i < 3;i++){
        $('.receptBlock').append(`<div class="receptResult">
                        <h2></h2>
                        <div class="foodImg">
                            <img src="" alt="food"><br>
                        </div>
                        <span class="spanFood">Время приготовления: <span class="timeFood"></span> минут</span><br>
                        <span class="spanFood">Количество порций: <span class="portionFood"></span></span><br>
                        <a href="" class="sourceLink"><img class="rightImg" src="Img/icons/rightImg.png" alt="img">Нажми сюда и узнай рецепт</a>
                    </div>`)
        $.ajax({
            url: 'https://api.spoonacular.com/recipes/random?apiKey=048815340ecd464e9e312b3d9a04c90e',
            dataType: 'json'
        }).done(function (data){
            let recipes = data.recipes[0]
            $('.receptResult h2').eq(i).html(recipes.title)
            $('.foodImg img').eq(i).attr('src', recipes.image)
            $('.timeFood').eq(i).html(recipes.readyInMinutes)
            $('.portionFood').eq(i).html(recipes.servings)
            $('.sourceLink').eq(i).attr('href',recipes.sourceUrl)
        })
    }
})()
$('.searchRecept button').click(function (){
    for (let i = 0; i < 3;i++){
        ajaxRequest(`https://api.spoonacular.com/recipes/search?` +
            `apiKey=048815340ecd464e9e312b3d9a04c90e&number=3&query=${$('.searchRecept input').val()}`,i)
    }
})
function ajaxRequest(url,num){
    $.ajax({
        url: url ,
        dataType: 'json'
    }).done(function (data){
        let result = data.results[num]
        $('.receptResult h2').eq(num).html(result.title)
        $('.foodImg img').eq(num).attr('src', data.baseUri + result.image)
        $('.timeFood').eq(num).html(result.readyInMinutes)
        $('.portionFood').eq(num).html(result.servings)
        $('.sourceLink').eq(num).attr('href',result.sourceUrl)
        console.log(result.sourceUrl)
    });
}



