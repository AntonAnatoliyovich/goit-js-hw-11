const gallary = document.querySelector(".gallery");

export default function renderImage(image) {
    const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    } = image;

    const card = `<div class="photo-card" height=290>
            <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${downloads}
                </p>
            </div>
        </div>`
    gallary.insertAdjacentHTML("beforeend", card)
    // console.log(image);
}


/*
webformatURL - посилання на маленьке зображення для списку карток.
largeImageURL - посилання на велике зображення.
tags - рядок з описом зображення. Підійде для атрибуту alt.
likes - кількість лайків.
views - кількість переглядів.
comments - кількість коментарів.
downloads - кількість завантажень.
*/
