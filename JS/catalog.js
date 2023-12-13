
// Функція для отримання CSV-даних
function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text());
}
// Функція для визначення URL для деталей автомобіля
function getDetailsURL(carId) {
    return `details.html?id=${carId}`;
}


// Функція для розбору CSV-даних
function parseCSVData(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');

    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(',');
        const entry = {};

        for (let j = 0; j < headers.length; j++) {
            entry[headers[j]] = cells[j];
        }

        data.push(entry);
    }

    return data;
}

function displayCars(carsData) {
    const carListContainer = document.getElementById('content');

    if (!carListContainer) {
        console.error('Елемент з ідентифікатором "content" не знайдено.');
        return;
    }

    carsData.forEach(car => {
        // Перевірка, чи всі необхідні дані доступні
        if (
            car.image_front &&
            car.name_brand &&
            car.model_variant &&
            car.configuration &&
            car.year &&
            car.price &&
            car.id
        ) {
            const carItemHTML = `<div class="car-item well">
                <img src="${car.image_front}" alt="${car.name_brand}">
                <div>
                    <p>${car.name_brand} ${car.model_variant} ${car.configuration}</p>
                    <p>Year: ${car.year}</p>
                    <p>Price: $${car.price}</p>
                    <button class="detailsButton" data-car-id="${car.id}">Показати деталі</button>
                </div>
            </div>`;

            carListContainer.insertAdjacentHTML('beforeend', carItemHTML);
        }
    });

    // Додавання обробника подій до кнопок "Показати деталі"
    const detailsButtons = document.querySelectorAll('.detailsButton');
    detailsButtons.forEach(button => {
        button.addEventListener('click', handleDetailsButtonClick);
    });
}



// Обробник події для кнопок "Показати деталі"
function handleDetailsButtonClick(event) {
    const carId = event.target.dataset.carId;
    if (carId) {
        const detailsURL = getDetailsURL(carId);
        window.location.href = detailsURL;
    } else {
        console.error('Немає ідентифікатора автомобіля для відображення деталей.');
    }
}


// URL CSV-файлу
const csvURL = 'http://localhost:5500/CSV/cardealer.csv';


// Отримання та відображення даних автомобілів
async function fetchData() {
    const csvData = await fetchCSV(csvURL);
    const carsData = parseCSVData(csvData);
    displayCars(carsData);
    console.log('Список автомобілів створено успішно!');
}

fetchData().catch(error => console.error('Помилка завантаження CSV:', error));

