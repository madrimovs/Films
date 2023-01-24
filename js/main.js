let elList = document.querySelector("#ul");

function renderFilms(arr, list) {
  for (let film of arr) {
    let elLi = document.createElement("li");
    let elImg = document.createElement("img");
    let elTitle = document.createElement("h2");
    let elText = document.createElement("p");
    let elSubList = document.createElement("ul");

    for (let ganres of film.genres) {
      let elSubItem = document.createElement("li");
      elSubItem.textContent = ganres;
      elSubList.appendChild(elSubItem);
    }
    elLi.setAttribute("class", "w-25 border-2");
    elImg.setAttribute("width", "300");

    elImg.src = film.poster;
    elTitle.textContent = film.title;
    elText.textContent = film.overview;

    console.log(film);
    elLi.append(elImg, elTitle, elText, elSubList);
    list.appendChild(elLi);
  }
}

renderFilms(films, elList);
