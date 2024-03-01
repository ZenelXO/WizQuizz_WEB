function loadJSON(file) {
    return fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('There was an error in the response.');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function renderContent(content, containerSelector) {
    const container = document.querySelector(containerSelector);
    content.forEach(item => {
        const div = document.createElement('div');
        if (containerSelector === 'aside') {
            div.classList.add('filter');
            div.innerHTML = `<span><img src="${item.icon}" alt="NavIcon" width="64" height="64"></span>
                         <span>${item.text}</span>`;
        } else if (containerSelector === '.quizz-selection') {
            div.classList.add('quizz');
            div.innerHTML = `<a href="quizz-preview.html">
                            <img src="${item.image}" width="400" height="300" class="image">
                            <h2>${item.title}</h2>
                            </a>`;
        }
        container.appendChild(div);
    });
}

Promise.all([
    loadJSON('../../data/play/filters_content.json'),
    loadJSON('../../data/play/quizz_content.json')
])
    .then(([filtersData, quizzData]) => {
        renderContent(filtersData.filters, 'aside');
        renderContent(quizzData.quizz, '.quizz-selection');
    });