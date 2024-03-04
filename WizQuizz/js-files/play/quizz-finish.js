document.addEventListener('DOMContentLoaded', async function() {
    const finish = document.getElementById("finish");
    var resultado = localStorage.getItem("results");
    var numofquestions = localStorage.getItem("numofquestions");
    var varInteger = parseInt(numofquestions);
    var intResult = varInteger-resultado;

    if(resultado >= varInteger/2){
        mark.innerHTML = resultado + "/" + numofquestions;
    }else{
        mark.innerHTML = resultado  + "/" + numofquestions;
    }

    if(resultado === "1"){
        finish.innerHTML = "Congratulations!";
    }else{
        finish.innerHTML = "Bad Luck!";
    }
});