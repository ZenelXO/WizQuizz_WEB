document.addEventListener('DOMContentLoaded', async function() {
    const finish = document.getElementById("finish");
    const mark = document.getElementById("mark");
    var resultado = localStorage.getItem("results");
    var numofquestions = localStorage.getItem("numofquestions");
    var varInteger = parseInt(numofquestions);
    const jsonFilePath = "../../data/play/quizz-finish.json";

    // Hacer la solicitud HTTP usando fetch
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            const resultWell = data.finishQuizz["result-well"];
            const resultBad = data.finishQuizz["result-bad"];

            if(resultado >= varInteger/2){
                mark.innerHTML = resultado + "/" + numofquestions;
            }else{
                mark.innerHTML = resultado  + "/" + numofquestions;
            }
        
            if(resultado === "1"){
                finish.innerHTML = resultWell;
            }else{
                finish.innerHTML = resultBad;
            }
            if(resultado === null){
                console.log("sisisisisi")
                mark.innerHTML = "0/0";
            }
            localStorage.clear();
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
    }); 
});