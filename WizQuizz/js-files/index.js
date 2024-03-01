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
        if (containerSelector === '.about-us-content') {
            div.classList.add('about-us-info');
            div.innerHTML = `<img src="${item.image}" width="320" height="180" class="image" alt="">
                             <p>${item.text}</p>`;
        } else if (containerSelector === '.news-content') {
            div.classList.add('new');
            div.innerHTML = `<a href=""><img src="${item.image}" width="640" height="360" class="image" alt=""></a>
                             <a href=""><h2>${item.headline}</h2></a>
                             <p>${item.description}</p>`;
        }
        container.appendChild(div);
    });
}

Promise.all([
    loadJSON('../../data/home/who_content.json'),
    loadJSON('../../data/home/news_content.json')
])
    .then(([whoData, newsData]) => {
        renderContent(whoData.info, '.about-us-content');
        renderContent(newsData.news, '.news-content');
    });