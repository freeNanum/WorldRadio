
import { radioData, Station } from './radio-data.tsx';

document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list') as HTMLUListElement;
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    const display = document.getElementById('display') as HTMLDivElement;
    const countrySearchInput = document.getElementById('country-search') as HTMLInputElement;
    const countryList = document.getElementById('country-list') as HTMLUListElement;

    const allCountries = Object.keys(radioData).sort();

    const displayStations = (country: string) => {
        stationList.innerHTML = '';
        if (!country || !radioData[country]) {
            display.textContent = 'Select a country to see stations';
            return;
        }

        const stations = radioData[country];
        
        stations.sort((a, b) => a.genre.localeCompare(b.genre));

        stations.forEach(station => {
            const listItem = document.createElement('li');
            listItem.tabIndex = 0;
            listItem.setAttribute('role', 'option');
            listItem.setAttribute('aria-selected', 'false');

            const stationName = document.createElement('span');
            stationName.className = 'station-name';
            stationName.textContent = station.name;

            const stationGenre = document.createElement('span');
            stationGenre.className = 'station-genre';
            stationGenre.textContent = station.genre;
            
            listItem.appendChild(stationName);
            listItem.appendChild(stationGenre);

            const clickHandler = () => playStation(station, listItem);
            listItem.addEventListener('click', clickHandler);
            listItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clickHandler();
                }
            });

            stationList.appendChild(listItem);
        });
        display.textContent = `Showing ${stations.length} stations for ${country}`;
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
});