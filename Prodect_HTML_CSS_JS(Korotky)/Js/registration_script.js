'use strict';

//РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ ДЛЯ ПРОВЕРКИ EMAIL И ПАРОЛЯ
let regEmail = /^[a-zA-Z_\.-]{3,}@[a-zA-Z\.]{2,30}\.[a-z]{2,}$/;
let regPassword = /((?=.*[1-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
let cookieObj = {};

//ПРОВЕРКА ДАННЫХ
function testData(e){
    e.preventDefault()
    let inputPlace = $('input')
    if(regEmail.test(inputPlace.eq(0).val())){
        inputPlace.eq(0).siblings('.wrong').removeClass('active')
        cookieObj['email'] = inputPlace.eq(0).val()
    }
    else {
        inputPlace.eq(0).siblings('.wrong').addClass('active')
        return false
    }
    if(regPassword.test(inputPlace.eq(1).val())){
        inputPlace.eq(1).siblings('.wrong').removeClass('active')
        cookieObj['password'] = inputPlace.eq(1).val()
    }
    else {
        inputPlace.eq(1).siblings('.wrong').addClass('active')
        return false
    }

    if(inputPlace.eq(1).val() !== inputPlace.eq(2).val()) {
        inputPlace.eq(2).siblings('.wrong').addClass('active')
        return false
    }
    else {
        inputPlace.eq(2).siblings('.wrong').removeClass('active')
        cookieObj['passRepeat'] = inputPlace.eq(2).val()
    }
    if('passRepeat' in cookieObj){
        window.location=".Index_userReg.html";
    }
    addCookie();
}


//ФУНКЦИЯ ДОБАВЛЕНИЯ КУККИ(ВЫЗЫВАЕТСЯ ЕСЛИ ПРОВЕРКА ДАННЫХ УСПЕШНА)
function addCookie(){
    let expDateAdd = new Date();
    expDateAdd.setMinutes(expDateAdd.getMinutes() + 10);
    expDateAdd = expDateAdd.toUTCString();
    for (let key in cookieObj){
        if(key === 'email' || key === 'password' || key === 'passRepeat'){
           document.cookie = `${key}=${cookieObj[key]}; expires=${expDateAdd}`
        }
    }
}