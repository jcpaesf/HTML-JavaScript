const noResult = document.getElementById('no-results');
const content = document.getElementById('content');
const filterSunlight = document.getElementById('filter-sunlight');
const filterWater = document.getElementById('filter-water');
const filterPets = document.getElementById('filter-pets');
const buttonTop = document.getElementById('button-top');

let sunLight = filterSunlight.value;
let water = filterWater.value;
let pets = filterPets.value;

function clearPlants() {
    const plantsItem = document.querySelectorAll('.plants-item');

    plantsItem.forEach(item => {
        item.remove();
    });
}

function orderByFavorite(plants) {
    const orderPlants = plants.sort(item => {
        return item.staff_favorite ? -1 : 1;
    });

    return orderPlants;
}

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
            .then(data => {
                const plants = document.getElementById('plants');

                clearPlants();

                const items = orderByFavorite(data);

                items.forEach((item, index) => {
                    const plantItem = document.createElement('div');

                    plantItem.classList.add('plants-item');

                    const divImg = document.createElement('div');
                    const divFooter = document.createElement('div');

                    const imgPlant = document.createElement('img');
                    imgPlant.src = item.url;

                    if (!index) {
                        plantItem.classList.add('plants-item-1');

                        imgPlant.style.width = '80%';
                        imgPlant.style.height = '80%';

                        const divName = document.createElement('div');
                        const spanName = document.createElement('span');

                        divName.classList.add('favorite-plant-footer')
                        spanName.classList.add('text-favorite-plant');
                        spanName.innerText = item.name;

                        divName.append(spanName);

                        const divPrice = document.createElement('div');
                        const spanPrice = document.createElement('span');

                        divPrice.classList.add('favorite-plant-footer')
                        divPrice.style.justifyContent = 'space-evenly';
                        spanPrice.classList.add('text-favorite-price');
                        spanPrice.innerText = `$${item.price}`;

                        divPrice.appendChild(spanPrice);

                        divFooter.appendChild(divName);
                        divFooter.appendChild(divPrice);
                    } else {
                        const divName = document.createElement('div');
                        const spanName = document.createElement('span');
                        const price = document.createElement('span');

                        spanName.innerText = item.name;
                        spanName.classList.add('text-not-favorite');
                        price.classList.add('text-not-favorite');
                        price.innerText = `$${item.price}`;

                        divName.classList.add('not-favorite');

                        divName.appendChild(spanName);
                        divName.appendChild(price);
                        divFooter.appendChild(divName);
                    }

                    divImg.appendChild(imgPlant);
                    plants.appendChild(plantItem);

                    plantItem.appendChild(divImg);
                    plantItem.appendChild(divFooter);

                    if (item.staff_favorite) {
                        const favoriteDiv = document.createElement('div');

                        favoriteDiv.classList.add('favorite-plant');
                        favoriteDiv.classList.add('text-recommended-favorite');
                        favoriteDiv.append('Staff favorite');

                        plantItem.appendChild(favoriteDiv);
                    }
                })

                noResult.style.display = 'none';
                content.style.display = 'flex';
            })
            .catch(function (error) {
                if (window.innerWidth < 1024) {
                    noResult.style.display = 'flex';
                } else {
                    noResult.style.display = 'grid';
                }
                content.style.display = 'none';
            });
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