"use strict";

let cookieObj = {};                                                 //объект для кукки файлов
//РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ ДЛЯ ПРОВЕРКИ ДАННЫХ
let nameReg = new RegExp(/^[a-zа-я]{2,20}$/i)
let dateReg =  /(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).((19|20)\d\d)/
let phoneNumbReg = /^[-\s\(\)0-9]{10,20}$/
let skypeReg = /^[a-z0-9.-]{1,}$/i

//МАССИВ С REGEXP,ИМЕНЕМ,И ОБЯЗАТЕЛЬНЫМ ИЛИ НЕТ ВВОДОМ
let massReg = [[nameReg,"firstName","sure"],[dateReg,"date","sure"],
    [phoneNumbReg,"phone","notSure"], [nameReg,"lastName","sure"],[skypeReg,"skype","notSure"]];

//ПРОВЕРКА ДАННЫХ В ПОЛЯХ ВВОДА
function checkForm (e){
        e.preventDefault()
    let frm = $('.fullForm input');
    let wrong = $('.wrong');
    for(let i = 0;i < massReg.length;i++){
         if(massReg[i][0].test(frm.eq(i).val())){                   //проверка данных ввода
            wrong.eq(i).css('visibility','hidden');
            cookieObj[massReg[i][1]] = frm.eq(i).val()
        }
        else {
           if(massReg[i][2] === 'sure' || frm.eq(i).val().length > 0){
               wrong.eq(i).css('visibility','visible');
               return false           //обязательный или не обязательный ввод поля
           }
        }
    }
    addCookie()
    window.location=".Registration_Page_Password.html";
}
//ФУНКЦИЯ ДОБАВЛЕНИЯ КУККИ(ВЫЗЫВАЕТСЯ ЕСЛИ ПРОВЕРКА ДАННЫХ УСПЕШНА)
function addCookie(){
    let expDateAdd = new Date();
    expDateAdd.setMinutes(expDateAdd.getMinutes() + 10);
    expDateAdd = expDateAdd.toUTCString();
    for (let key in cookieObj){
        if(key === 'firstName' || key === 'date' || key === 'lastName'){
           document.cookie = `${key}=${cookieObj[key]}; expires=${expDateAdd}`
        }
    }
}



