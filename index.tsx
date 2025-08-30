
import { radioData, Station } from './radio-data.tsx';

document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list') as HTMLUListElement;
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    const display = document.getElementById('display') as HTMLDivElement;
    const countrySearchInput = document.getElementById('country-search') as HTMLInputElement;
    const countryList = document.getElementById('country-list') as HTMLUListElement;
    const favoritesBtn = document.getElementById('favorites-btn') as HTMLButtonElement;

    const allCountries = Object.keys(radioData).sort();
    const FAVORITES_KEY = 'worldRadioFavorites';
    let favorites = new Set<string>();
    let isFavoritesView = false;
    let lastSelectedCountry = '';

    const loadFavorites = () => {
        const savedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (savedFavorites) {
            favorites = new Set(JSON.parse(savedFavorites));
        }
    };

    const saveFavorites = () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    };

    const updateFavoriteButton = (button: HTMLButtonElement, isFavorited: boolean, stationName: string) => {
        button.classList.toggle('favorited', isFavorited);
        button.textContent = isFavorited ? '★' : '☆';
        button.setAttribute('aria-pressed', String(isFavorited));
        button.setAttribute('aria-label', isFavorited ? `Unfavorite ${stationName}` : `Favorite ${stationName}`);
    };

    const toggleFavorite = (country: string, station: Station, favButton: HTMLButtonElement) => {
        const stationId = `${country}:${station.name}`;
        if (favorites.has(stationId)) {
            favorites.delete(stationId);
        } else {
            favorites.add(stationId);
        }
        saveFavorites();
        updateFavoriteButton(favButton, favorites.has(stationId), station.name);

        if (isFavoritesView) {
            displayFavorites();
        }
    };
    
    const createStationListItem = (station: Station, country: string) => {
        const listItem = document.createElement('li');
        listItem.tabIndex = 0;
        listItem.setAttribute('role', 'option');
        listItem.setAttribute('aria-selected', 'false');

        const stationInfo = document.createElement('div');
        stationInfo.className = 'station-info';

        const stationName = document.createElement('span');
        stationName.className = 'station-name';
        stationName.textContent = station.name;

        const stationGenre = document.createElement('span');
        stationGenre.className = 'station-genre';
        stationGenre.textContent = station.genre;
        
        stationInfo.appendChild(stationName);
        stationInfo.appendChild(stationGenre);

        const stationId = `${country}:${station.name}`;
        const favButton = document.createElement('button');
        favButton.className = 'favorite-btn';
        const isFavorited = favorites.has(stationId);
        updateFavoriteButton(favButton, isFavorited, station.name);

        favButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(country, station, favButton);
        });

        const clickHandler = () => playStation(station, listItem);
        listItem.addEventListener('click', clickHandler);
        listItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                clickHandler();
            }
        });

        listItem.appendChild(stationInfo);
        listItem.appendChild(favButton);
        return listItem;
    };

    const displayStations = (country: string) => {
        lastSelectedCountry = country;
        stationList.innerHTML = '';
        if (!country || !radioData[country]) {
            display.textContent = 'Select a country to see stations';
            return;
        }

        const stations = radioData[country];
        
        stations.sort((a, b) => a.genre.localeCompare(b.genre));

        stations.forEach(station => {
            const listItem = createStationListItem(station, country);
            stationList.appendChild(listItem);
        });
        display.textContent = `Showing ${stations.length} stations for ${country}`;
    };
    
    const displayFavorites = () => {
        stationList.innerHTML = '';
        if (favorites.size === 0) {
            display.textContent = 'You have no favorite stations yet.';
            return;
        }

        display.textContent = `Showing ${favorites.size} favorite stations`;
        const favoriteStations: { station: Station, country: string }[] = [];
        
        favorites.forEach(stationId => {
            const [country, stationName] = stationId.split(':', 2);
            const stationData = radioData[country]?.find(s => s.name === stationName);
            if (stationData) {
                favoriteStations.push({ station: stationData, country });
            }
        });
        
        favoriteStations.sort((a,b) => a.station.name.localeCompare(b.station.name));

        favoriteStations.forEach(({ station, country }) => {
            const listItem = createStationListItem(station, country);
            stationList.appendChild(listItem);
        });
    };

    const playStation = (station: Station, listItem: HTMLLIElement) => {
        const currentPlaying = stationList.querySelector('.playing');
        if (currentPlaying) {
            currentPlaying.classList.remove('playing');
            currentPlaying.setAttribute('aria-selected', 'false');
        }

        listItem.classList.add('playing');
        listItem.setAttribute('aria-selected', 'true');
        
        audioPlayer.pause();
        audioPlayer.src = "";
        
        audioPlayer.src = station.url;
        audioPlayer.load();

        const playPromise = audioPlayer.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                display.textContent = `${station.name} — ${station.city} — ${station.genre}`;
            }).catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Audio fetch aborted by user action. This is normal.');
                } else {
                    console.error(`Audio playback failed for ${station.name}:`, error.message);
                    display.textContent = `Failed to play: ${station.name}`;
                    listItem.classList.remove('playing');
                    listItem.setAttribute('aria-selected', 'false');
                }
            });
        }
    };

    const updateCountryList = (filter = '') => {
        countryList.innerHTML = '';
        const filteredCountries = allCountries.filter(country => 
            country.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredCountries.length === 0 && filter.length > 0) {
            countryList.classList.remove('visible');
            countrySearchInput.setAttribute('aria-expanded', 'false');
            return;
        }

        const countriesToShow = filter.length > 0 ? filteredCountries : allCountries;

        countriesToShow.forEach(country => {
            const listItem = document.createElement('li');
            listItem.textContent = country;
            listItem.setAttribute('role', 'option');
            listItem.tabIndex = -1;

            listItem.addEventListener('mousedown', () => {
                countrySearchInput.value = country;
                countryList.classList.remove('visible');
                countrySearchInput.setAttribute('aria-expanded', 'false');
                displayStations(country);
            });
            countryList.appendChild(listItem);
        });

        countryList.classList.add('visible');
        countrySearchInput.setAttribute('aria-expanded', 'true');
    };

    favoritesBtn.addEventListener('click', () => {
        isFavoritesView = !isFavoritesView;
        favoritesBtn.classList.toggle('active', isFavoritesView);
        countrySearchInput.disabled = isFavoritesView;

        if (isFavoritesView) {
            displayFavorites();
        } else {
            displayStations(lastSelectedCountry);
        }
    });

    countrySearchInput.addEventListener('input', () => {
        updateCountryList(countrySearchInput.value);
    });

    countrySearchInput.addEventListener('focus', () => {
        updateCountryList(countrySearchInput.value);
    });

    countrySearchInput.addEventListener('blur', () => {
        setTimeout(() => {
            countryList.classList.remove('visible');
            countrySearchInput.setAttribute('aria-expanded', 'false');
        }, 200);
    });

    loadFavorites();
});