import { Notify } from "notiflix";
import searchImageApi from "./js/searchImageApi";
import renderImage from "./js/renderImage";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const input = document.querySelector("[name='searchQuery']");
const searchImage = new searchImageApi();
const gallary = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

btnLoadMoreHide();

form.addEventListener('submit', onFormSubmit)
btnLoadMore.addEventListener('click', onLoadMore)

function onFormSubmit(event) {
    event.preventDefault();
    gallary.innerHTML = "";
    searchImage.resetPage();
    btnLoadMoreHide();
    const inputName = input.value;

    searchImage.setSearchName(inputName)
    
    searchImage.searchImages()
    .then(dataImages => {
        Notify.success(`Hooray! We found ${dataImages.totalHits} images.`);
        btnLoadMoreShow();
        dataImages.hits.map(image => {
            renderImage(image);
        })
        lightbox.refresh();
    })
    .catch(() => {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    })
}

function btnLoadMoreHide() {
    btnLoadMore.style.display = "none";
}

function btnLoadMoreShow() {
    btnLoadMore.style.display = "block";
}

function onLoadMore() {
    searchImage.searchImages()
    .then(dataImages => {
        let hits = dataImages.hits;
        btnLoadMoreShow();
        hits.map(image => {
            renderImage(image);
        })
        lightbox.refresh();

        if (hits.length > 0 && hits.length < searchImage.per_page) {
            btnLoadMoreHide();
            Notify.info("We're sorry, but you've reached the end of search results.");
        }

        const { height: cardHeight } = gallary.firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2 + 100,
            behavior: "smooth",
        });
    })
}
