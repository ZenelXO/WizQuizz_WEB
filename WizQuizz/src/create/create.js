document.addEventListener("DOMContentLoaded", function() {
    var localCloudQuestions = localStorage.getItem("questionsInfo");
    var parsedData = JSON.parse(localCloudQuestions);

    if(localCloudQuestions === null || localCloudQuestions.length === 0){
        document.getElementById("goat").style.display = "none";
    }else{
        document.getElementById("goat").style.display = "block";
        document.getElementById("goat2").style.display = "none";

        var tittle = parsedData.questionTittle;
        var answer1 = parsedData.answer1;
        var answer2 = parsedData.answer2;
        var answer3 = parsedData.answer3;
        var answer4 = parsedData.answer4;
        document.getElementById("questionTitleJS").innerHTML = tittle;
        document.getElementById("answer1JS").innerHTML = answer1;
        document.getElementById("answer2JS").innerHTML = answer2;
        document.getElementById("answer3JS").innerHTML = answer3;
        document.getElementById("answer4JS").innerHTML = answer4;
    }

    //Create Quizz
    document.getElementById("descripcion").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Obtener los valores del formulario
        var titulo = document.getElementById("titulo").value;
        var littledescription = document.getElementById("littledescription").value;

        // Crear un objeto JSON con los datos
        var data = {
            "titulo": titulo,
            "littledescription": littledescription
        };

        // Convertir el objeto JSON a una cadena JSON
        var jsonData = JSON.stringify(data);

        // Aquí puedes enviar jsonData a tu servidor o realizar cualquier otra operación con él
        localStorage.setItem("quizzInfo", jsonData);
        var localCloudQuizz = localStorage.getItem("quizzInfo");
        document.getElementById("titulo").innerHTML = titulo;
        document.getElementById("littledescription").innerHTML = littledescription;

        //PRUEBAS
        document.getElementById("prueba").innerHTML = localCloud;
    });
});