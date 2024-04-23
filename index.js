const password_text=document.querySelector("[password-text]");
const copied_text=document.querySelector("[copied_text]");
const password_length=document.querySelector("[password-length]");
const slider_password=document.querySelector("[slider_password]");
const uppercase_checkbox=document.querySelector("[uppercase_checkbox]");
const lowercase_checkbox=document.querySelector("[lowercase_checkbox]");
const numbers_checkbox=document.querySelector("[numbers_checkbox]");
const symbols_checkbox=document.querySelector("[symbols_checkbox]");
const copy_button=document.querySelector("[copy_button]");
const strength_display=document.querySelector("[strength_display]")
const generate_password=document.querySelector("[generate_password]");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols="!@#$%^&*()_+{}|:<>?[]\;'.,/~`";


let password="";
let pass_length=10;
let checkCount=0;
func_slider();
default_strength();
callcheckcount();

function func_slider(){
    slider_password.value=pass_length;
    password_length.innerHTML=pass_length;
}

function default_strength(){
    strength_display.style.backgroundColor="#808080";
}

function generate_random(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generate_uppercase(){
    return String.fromCharCode(generate_random(65,90));
}

function generate_lowercase(){
    return String.fromCharCode(generate_random(97,122));
}

function generate_numbers(){
    return generate_random(0,9);
}

function generate_symbols(){
    return symbols.charAt(generate_random(0,symbols.length-1));
}

function strength_checker(){
    let uppercase=false;
    let lowercase=false;
    let symbols=false;
    let numbers=false;
    if(uppercase_checkbox.checked){
        uppercase=true;
    }
    if(lowercase_checkbox.checked){
        lowercase=true;
    }
    if(symbols_checkbox.checked){
        symbols=true;
    }
    if(numbers_checkbox.checked){
        numbers=true;
    }

    if(uppercase && lowercase && symbols && numbers){
        if(password.length>=8){
            strength_display.style.backgroundColor="#006400";
        }else if(password.length<8 && password.length>=5){
            strength_display.style.backgroundColor="#90EE90";
        }else{
            strength_display.style.backgroundColor="ff0000";
        }
    }else if((uppercase||lowercase) && (numbers||symbols)){
        if(password.length<7){
            strength_display.style.backgroundColor="ff0000";
        }else{
            strength_display.style.backgroundColor="#90EE90";
        }
    }else {
        strength_display.style.backgroundColor="#ff0000";
    }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(password_text.value);
        copied_text.innerHTML="copied";
    }catch(e){
        copied_text.innerHTML="failed";
    }

    copied_text.style.visibility="visible";

    setTimeout(()=>{
        copied_text.style.visibility="hidden";
    },2000);
}


slider_password.addEventListener('input',(e)=>{
    pass_length=e.target.value;
    func_slider();
});

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',callcheckcount);
});

function callcheckcount(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    //for condition when password length selected is less than the checkbox selected
    if(checkCount>pass_length){
        pass_length=checkCount;
        func_slider();
    }
}

copy_button.addEventListener('click',()=>{
    if(password_text.value){
        copycontent();
    }
})

function shuffle(array){
    let len = array.length,
    currentIndex;
    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
    let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
    var temp = array[currentIndex];
    array[currentIndex] = array[randIndex];
    array[randIndex] = temp;
    }
    let str="";
    array.forEach((it)=>{
        str+=it;
    })
    return str;
}

generate_password.addEventListener('click',()=> {

    if(checkCount==0){
        return ;
    }
    if(pass_length<checkCount){
        pass_length=checkCount;
        func_slider();
    }

    password="";
    let funcArrr=[];
    if(uppercase_checkbox.checked){
        funcArrr.push(generate_uppercase);
    }
    if(lowercase_checkbox.checked){
        funcArrr.push(generate_lowercase);
    }
    if(symbols_checkbox.checked){
        funcArrr.push(generate_symbols);
    }
    if(numbers_checkbox.checked){
        funcArrr.push(generate_numbers);
    }

    for(let i=0;i<funcArrr.length;i++){
        password+=funcArrr[i]();
    }

    for(let i=0;i<pass_length-funcArrr.length;i++){
        password+=funcArrr[generate_random(0,funcArrr.length)]();
    }
    password=shuffle(Array.from(password));
    strength_checker();
    password_text.value=password;

})