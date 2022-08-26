const menuBtn = document.querySelector('.nav__menu')

menuBtn.addEventListener('click', function(){

    if(menuBtn.classList.contains('open')){
        menuBtn.classList.remove('open');
    }
    else{
        menuBtn.classList.add('open');
    }
})