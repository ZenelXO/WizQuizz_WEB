let user = "null";
var data;

fetch("../../data/current_session.json").then(res => res.json()).then(data => {
    console.log(data);
});

alert();

window.onload = function(){
    document.getElementById("username").innerHTML = "PaquitoElChocolatero";
}

document.getElementById('user-image-button').onclick = function(){
    document.getElementById('image-input-file').click();
}

