let wint =document.querySelector(".wint");

wint.onclick =function (){
    alert('Hi  Winter')
    weatherColor = 'skyblue'

   setTimeout(function() {
    weatherColor = 'black'
 },3000);
    frameRate(1);
    
}

