const API_URL_RANDOM =
    "https://api.thecatapi.com/v1/images/search?limit=3&api_key=74b7f83d-ba55-429a-9f30-5f050833f46b";

const API_URL_FAV =
    "https://api.thecatapi.com/v1/favourites?api_key=74b7f83d-ba55-429a-9f30-5f050833f46b";

const API_URL_DEL = (id) =>
    `https://api.thecatapi.com/v1/favourites/${id}?api_key=74b7f83d-ba55-429a-9f30-5f050833f46b`;

const spanError = document.getElementById("error");
const loadRandomKittens = async () => {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("RANDOM", data);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status;
    } else {
        const img = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        const img3 = document.getElementById("img3");
        const btnRand1 = document.getElementById("btnRandom1");
        const btnRand2 = document.getElementById("btnRandom2");
        const btnRand3 = document.getElementById("btnRandom3");

        img.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        btnRand1.onclick = () => saveFavKittens(data[0].id);
        btnRand2.onclick = () => saveFavKittens(data[1].id);
        btnRand3.onclick = () => saveFavKittens(data[2].id);
    }
};

const loadFavKittens = async () => {
    const res = await fetch(API_URL_FAV);
    const data = await res.json();
    console.log("FAV", data);
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        const section = document.getElementById("favCats");
        section.innerHTML = "";

        data.forEach((cat) => {
            const article = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("a");
            const icon = document.createElement("img");

            img.src = cat.image.url;
            img.width = 150;

            btn.onclick = () => deleteFavKittens(cat.id);
            img.appendChild(icon);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
};

async function saveFavKittens(id) {
    const res = await fetch(API_URL_FAV, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            image_id: id,
        }),
    });
    const data = await res.json();
    console.log(res);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log("CAT SAVED");
    }

    loadFavKittens();
}

async function deleteFavKittens(id) {
    const res = await fetch(API_URL_DEL(id), {
        method: "DELETE",
    });
    const data = await res.json();
    console.log(res);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log("CAT DELETED");
    }
    loadFavKittens();
}

loadRandomKittens();
loadFavKittens();
const btn = document.getElementById("btn");
btn.addEventListener("click", loadRandomKittens);
