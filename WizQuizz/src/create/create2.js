window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () =>{
        document.body.removeChild(loader);
    })
})

document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('.mobile-bars');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show-menu');
    });

    //Create Questions
    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Obtener los valores del formulario
        var tittle = document.getElementById("questionTittle").value;
        var answer1 = document.getElementById("answer1").value;
        var answer2 = document.getElementById("answer2").value;
        var answer3 = document.getElementById("answer3").value;
        var answer4 = document.getElementById("answer4").value;

        // Crear un objeto JSON con los datos
        var data = {
            "questionTittle": tittle,
            "answer1": answer1,
            "answer2": answer2,
            "answer3": answer3,
            "answer4": answer4
        };

        // Convertir el objeto JSON a una cadena JSON
        var jsonData = JSON.stringify(data);

        // Aquí puedes enviar jsonData a tu servidor o realizar cualquier otra operación con él
        localStorage.setItem("questionsInfo", jsonData);
        var localCloudQuestions = localStorage.getItem("questionsInfo");

        //PRUEBAS
        
    });
});