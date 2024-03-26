document.addEventListener('DOMContentLoaded', async function() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    header.appendChild(await loadTemplate('../common/create-header.html'));
    footer.appendChild(await loadTemplate('../common/footer.html'));

    const menuIcon = document.querySelector('.mobile-bars');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show-menu');
    });

    const previewData = await loadJSON('../../data/play/quizz-preview.json');

    renderContent(previewData.preview, '.preview');
    renderContent(previewData.questions, '.quizz-questions');
});

async function loadTemplate(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch template: ${response.statusText}`);
    }
    const text = await response.text();
    const template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

async function loadJSON(file) {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    return response.json();
}

function renderContent(content, containerSelector) {
    const container = document.querySelector(containerSelector);
    content.forEach(item => {
        const section = document.createElement('section');
        const aux_section = document.createElement('section');

        if (containerSelector === '.preview') {
            section.classList.add('quizz-info');
            section.innerHTML = `<img src="${item.image}" width="400" height="300">
                     <div class="quizz-lower-info">
                         <div class="additional-info">
                             <p>${item.author}</p>
                             <p>${item.submit_date}</p>
                         </div>
                         <a href="in-game.html"><input class="quizz-start-button" type="button" value="START GAME"></a>
                     </div>`;

            aux_section.classList.add('quizz-description');
            aux_section.innerHTML = `<h1>${item.title}</h1>
                                <p>${item.description}</p>`;
        } else if (containerSelector === '.quizz-questions') {
            section.classList.add('question');
            let answersHTML = '';
            item.answers.forEach(answer => {
                answersHTML += `<button class="${answer.icon_name}-button"><span><img src="${answer.image}"></span><span>${answer.text}</span></button>`;
            });
            section.innerHTML = `<div class="question-info">
                         <p>${item.question_text}</p>
                         <div class="num-of-question">
                             <h2>${item.question_number}</h2>
                         </div>
                     </div>
                     <div class="answers">${answersHTML}</div>`;
        }
        container.appendChild(section);
        container.appendChild(aux_section);
    });
}
