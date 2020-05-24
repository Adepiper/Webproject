const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiUrl = 'https://api.lyrics.ovh';

async function searchSongs(term) {
  const res = await fetch(`${apiUrl}/suggest/${term}`);

  const data = await res.json();

  showData(data);
}

function showData(data) {
  result.innerHTML = `
    <ul class="songs">
        ${data.data
          .map(
            song => `
        <li>
        <span><strong>${song.artist.name}</strong> -${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>
    
        `
          )
          .join('')}
    </ul>
    `;

  if (data.prev || data.next) {
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick ="getMoreSongs('${data.prev}')">Prev</button>`
            : ''
        }
        ${
          data.next
            ? `<button class="btn" onclick ="getMoreSongs('${data.next}')">Next
            </button>`
            : ''
        }
        `;
  } else {
    more.innerHTML = '';
  }
}

async function getLyrics(artist, songtitle) {
  const res = await fetch(`${apiUrl}/v1/${artist}/${songtitle}`);

  const data = await res.json();

  console.log(data.lyrics);

  // result.innerHTML = `<h2><strong>${artist}</strong> -//${songtitle}</h2>
  //<p>${lyrics}</p>`;
  //more.innerHTML = '';
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

  const data = await res.json();

  showData(data);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener('click', e => {
  const clkBtn = e.target;

  if (clkBtn.tagName === 'BUTTON') {
    const artist = clkBtn.getAttribute('data-artist');
    const songTitle = clkBtn.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});
