import { radioData, Station } from './radio-data.tsx';

document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-select') as HTMLSelectElement;
    const stationList = document.getElementById('station-list') as HTMLUListElement;
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    const display = document.getElementById('display') as HTMLDivElement;

    const populateCountries = () => {
        const countries = Object.keys(radioData).sort();
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    };

    const displayStations = (country: string) => {
        stationList.innerHTML = '';
        if (!country || !radioData[country]) {
            display.textContent = 'Select a country to see stations';
            return;
        }

        const stations = radioData[country];
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
        // Remove 'playing' class from any currently playing station
        const currentPlaying = stationList.querySelector('.playing');
        if (currentPlaying) {
            currentPlaying.classList.remove('playing');
            currentPlaying.setAttribute('aria-selected', 'false');
        }

        // Add 'playing' class to the selected station
        listItem.classList.add('playing');
        listItem.setAttribute('aria-selected', 'true');
        
        // Stop any current audio and unload the source to prevent errors on quick switching
        audioPlayer.pause();
        audioPlayer.src = ""; // Unload the current source
        
        audioPlayer.src = station.url;
        audioPlayer.load();

        const playPromise = audioPlayer.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully.
                display.textContent = `${station.name} — ${station.city} — ${station.genre}`;
            }).catch(error => {
                // The 'AbortError' is expected when a user switches stations quickly.
                // We can safely ignore it to keep the console clean.
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

    countrySelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        displayStations(target.value);
    });

    // Initial setup
    populateCountries();
});
