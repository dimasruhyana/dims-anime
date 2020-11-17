// 1.Versi AJAX

// function getSearchAnimes() {
//     $('.anime-list').html('');

// $.ajax({
//     url: 'https://api.jikan.moe/v3/search/anime?q=' + $('#search-input').val(),
//     success: results => {
//         const animes = results.results;
//         let cards = '';
//         animes.forEach(anime => {
//             cards += `<div class="col-md-3 my-3">
//                 <div class="card">
//                 <img src="${anime.image_url}" class="card-img-top">
//                     <div class="card-body">
//                         <div class="card-title"><h5>${anime.title}</h5></div>
//                         <a href="#" class="btn btn-success mt-2">Show Detail</a>
//                     </div>
//                  </div>
//                 </div>
//                 `;
//         });
//         $('.anime-list').html(cards);
//     },
//     error: err => {
//         console.log(err);
//     }
// });
// }

// $('#search-button').on('click', function () {
//     getSearchAnimes();
// });

// $('#search-input').on('keyup', function (e) {
//     if (e.keyCode === 13) {
//         getSearchAnimes();
//     }
// })


// $.ajax({
//     url: 'https://api.jikan.moe/v3/top/anime',
//     success: results => {
//         const tAnime = results.top;
//         let cards = '';
//         tAnime.forEach(tA => {
//             cards += `<div class="col-md-3 my-3">
//             <div class="card">
//             <img src="${tA.image_url}" class="card-img-top">
//                 <div class="card-body">
//                     <div class="card-title"><h5>${tA.title}</h5></div>
//                     <a href="#" class="btn btn-success mt-2">Show Detail</a>
//                     <div class="card-text rank-anime">${tA.rank}</div>
//                 </div>
//              </div>
//             </div>
//             `;
//         });
//         $('.top-anime-list').html(cards);
//     },
//     error: err => {
//         console.log(err);
//     }
// });

// 2. fetch

fetch('https://api.jikan.moe/v3/top/anime')
    .then(res => res.json())
    .then(res => {
        const tAnime = res.top;
        let cards = '';
        tAnime.forEach(tA => cards += getCardsTA(tA));

        const tAnimeList = document.querySelector('.top-anime-list');
        tAnimeList.innerHTML = cards;
    });

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', async function () {
    try {
        const searchInput = document.querySelector('#search-input');
        const anime = await getAnime(searchInput.value);
        updateUI(anime);
    } catch (err) {
        console.error(err);
    }
});


const searchInput2 = document.querySelector('#search-input');
searchInput2.addEventListener('keyup', async function (e) {
    try {
        if (e.keyCode === 13) {
            const anime = await getAnime(searchInput2.value);
            updateUI(anime);
        }
    } catch (err) {
        console.log(err);
    }
});

function getAnime(keyword) {
    return fetch('https://api.jikan.moe/v3/search/anime?q=' + keyword)
        .then(res => {
            if (!res.ok) {
                throw new Error(statusText);
            }
            return res.json();
        })
        .then(res => res.results);
}

function updateUI(anime) {
    let cards = '';
    anime.forEach(a => cards += getCards(a));
    const animeList = document.querySelector('.anime-list');
    animeList.innerHTML = cards;
}

function getCards(a) {
    return `<div class="col-md-3 my-3">
    <div class="card">
    <img src="${a.image_url}" class="card-img-top img-anime">
        <div class="card-body">
            <div class="card-title"><h5>${a.title}</h5></div>
            <a href="#" class="btn btn-success mt-2">Show Detail</a>
        </div>
     </div>
    </div>`;
}

function getCardsTA(tA) {
    return `<div class="col-md-3 my-3">
    <div class="card">
    <img src="${tA.image_url}" class="card-img-top img-anime">
        <div class="card-body">
            <div class="card-title"><h5>${tA.title}</h5></div>
            <a href="#" class="btn btn-success mt-2">Show Detail</a>
            <div class="card-text rank-anime">${tA.rank}</div>
        </div>
     </div>
    </div>
    `;
}