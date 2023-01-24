"use strict";

function findElement(element, parent = document) {
	return parent.querySelector(element);
}
const elCards = findElement("#cards");
const elTemplate = findElement("#template");
const elEditeForm = findElement("#editeForm");
const elSaveBtn = findElement("#saveBtn");
const elSearchForm = findElement("#searchForm");
const elSearch = findElement("#searchInp");

// Render films
function renderFilms(array, parent = elCards) {
	parent.textContent = null;
	const fragment = document.createDocumentFragment();
	array.forEach((film) => {
		const card = elTemplate.content.cloneNode(true);

		const poster = card.querySelector(".card-img-top");
		const title = card.querySelector(".card-title");
		const overview = card.querySelector(".card-text");
		const elGenres = card.querySelector("#genres");
		const date = card.querySelector(".date");
		const elDeleteBtn = card.querySelector("#deleteBtn");
		const elEditeBtn = card.querySelector("#editeBtn");

		elDeleteBtn.dataset.id = film.id;
		elEditeBtn.dataset.id = film.id;

		poster.src = film.poster;
		title.textContent = film.title;
		overview.textContent = film.overview;
		date.textContent = film.release_date;

		film.genres.forEach((genre) => {
			const elLi = document.createElement("li");
			elLi.textContent = genre;
			elGenres.appendChild(elLi);
		});

		fragment.appendChild(card);
	});
	parent.appendChild(fragment);
}
renderFilms(films);

// Delete btn
elCards.addEventListener("click", (evt) => {
	const target = evt.target;

	const newFilm = [];
	if (target.className.includes("delete-btn")) {
		const id = target.dataset.id;

		films.forEach((film) => {
			if (film.id !== id) {
				newFilm.push(film);
			}
		});

		films = newFilm;
		renderFilms(films);
	}

	if (target.className.includes("edite-btn")) {
		const target = evt.target;

		const id = target.dataset.id;
		films.forEach((film) => {
			if (film.id == id) {
				elEditeForm.image.value = film.poster;
				elEditeForm.title.value = film.title;
				elEditeForm.overview.value = film.overview;
				elEditeForm.img.src = film.poster;

				elSaveBtn.addEventListener("click", () => {
					const img = elEditeForm.image.value;
					const title = elEditeForm.title.value;
					const overview = elEditeForm.overview.value;
					const date = elEditeForm.date.value;

					film.poster = img;
					film.title = title;
					film.overview = overview;
					film.release_date = date;

					renderFilms(films);
				});
			}
		});
	}
});

//Search input
elSearchForm.addEventListener("input", (evt) => {
	evt.preventDefault();

	const searchFilm = [];

	films.forEach((film) => {
		if (film.title.toLowerCase().includes(elSearch.value.toLowerCase())) {
			searchFilm.push(film);
		}
	});
	renderFilms(searchFilm);
});
