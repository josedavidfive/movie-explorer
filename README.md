# 🎬 Movie Explorer

A modern frontend web app built with **Vanilla JavaScript ES6+** that lets users search movies, apply filters, explore cast and trailers, and discover where to watch them — all powered by the **TMDB API**.

🔗 Live demo: https://josedavidhernandez.com/movie-explorer

![Movie Explorer Screenshot](https://i.imgur.com/fYzVMBY.jpeg)

---

## 🚀 Features

- Movie search with **debounce** to avoid excessive API requests
- **Infinite scroll** — load more movies as you scroll
- Filter by **genre, decade, rating and popularity**
- **Dark / Light mode** persisted in localStorage
- **Search history** — last 10 searches saved as chips
- Movie modal with **trailer, cast, streaming availability in Spain**
- **Leaflet map** showing production countries with markers
- Skeleton loading animation while fetching data
- Error handling for empty results and API failures
- Fully **responsive** — mobile, tablet and desktop

---

## 🛠 Tech Stack

- Vanilla JavaScript ES6+
- HTML5 / CSS3
- TMDB API
- Leaflet
- localStorage

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer
```

Open `index.html` with **Live Server** or any static server.

> ⚠️ This project uses a public TMDB API key with usage limitations.
> To use your own key, edit `js/utils/constants.js` and replace `API_KEY`.

---

## 📁 Project Structure
movie-explorer/
├── index.html
├── css/
│   ├── main.css
│   ├── layout.css
│   └── components.css
└── js/
├── main.js
├── api/
│   └── tmdb-api.js
├── components/
│   ├── filters.js
│   ├── loader.js
│   ├── movie-card.js
│   ├── movie-list.js
│   ├── movie-modal.js
│   └── search-bar.js
├── models/
│   └── Movie.js
├── services/
│   ├── map-service.js
│   ├── storage-service.js
│   └── theme-service.js
└── utils/
├── constants.js
├── debounce.js
└── helpers.js

---

## 🔑 API

This project uses the [TMDB API](https://developer.themoviedb.org/). Register for a free API key and replace it in `js/utils/constants.js`.

---

## 👨‍💻 Author

**José David Hernández**
[josedavidhernandez.com](https://josedavidhernandez.com) · [LinkedIn](https://linkedin.com/in/josedavidhernandez) · [GitHub](https://github.com/josedavidhernandez)
