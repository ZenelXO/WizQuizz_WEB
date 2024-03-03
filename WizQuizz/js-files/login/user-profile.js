const nickname_display = document.getElementById("username")
const user_image_display = document.getElementById("user-image-button")
const user_description_display = document.querySelector(".description p")
const account_date_display = document.querySelector(".account-creation-date p")
const quizs_finished_display = document.querySelector(".quizs-finished p")
const input_image = document.getElementById("image-input-file")

fetch("../../data/current_session.json").then(res => res.json()).then(data => {
    nickname_display.innerHTML = data.user.nickname;
    user_image_display.src = data.user.profile_picture;
    user_description_display.innerHTML = data.user.user_description;
    account_date_display.innerHTML = "MEMBER SINCE " + data.user.account_creation;
    quizs_finished_display.innerHTML = data.user.quizs_played + " QUIZS FINISHED";
});

user_image_display.onclick = function(){
    input_image.click();
}

input_image.onchange = function (evt){
    var tgt = evt.target || window,
        files = tgt.files;
    
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            user_image_display.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
}