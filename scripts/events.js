import Plants from './plants';

const onload = () => {
    const filterSunlight = document.getElementById('filter-sunlight');
    const filterWater = document.getElementById('filter-water');
    const filterPets = document.getElementById('filter-pets');
    const buttonTop = document.getElementById('button-top');

    let sunLight = filterSunlight.value;
    let water = filterWater.value;
    let pets = filterPets.value;

    const plants = new Plants();

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function renderPlants(data) {
        plants.displayNoResults(false);
        plants.displayYesResults(true);

        plants.render(data);
    }

    function noResults(error) {
        plants.noData();

        console.error(error);
    }

    function getGreenFriend(sunLight, water, pets) {
        if (sunLight && water && pets) {
            const url = new URL('https://front-br-challenges.web.app/api/v2/green-thumb/');

            const params = {
                sun: sunLight,
                water,
                pets
            };

            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json())
                .then(data => renderPlants(data))
                .catch(error => noResults(error));
        }
    }

    filterSunlight.addEventListener('change', (event) => {
        sunLight = event.target.value;
        getGreenFriend(sunLight, water, pets);
    });
    filterWater.addEventListener('change', (event) => {
        water = event.target.value;
        getGreenFriend(sunLight, water, pets);
    });
    filterPets.addEventListener('change', (event) => {
        pets = event.target.value;
        getGreenFriend(sunLight, water, pets);
    });
    buttonTop.addEventListener('click', scrollToTop);
}

window.onload = onload;