
/**
 * Отримує CSV-дані з вказаної URL-адреси.
 * @param {string} url - URL-адреса CSV-файлу.
 * @returns {Promise<string>} Об'єкт Promise, який розв'язується з CSV-даними.
 */
function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text());
}

/**
 * Генерує URL для сторінки деталей автомобіля на основі його ідентифікатора.
 * @param {string} carId - Ідентифікатор автомобіля.
 * @returns {string} URL для деталей заданого автомобіля.
 */
function getDetailsURL(carId) {
    return `details.html?id=${carId}`;
}


/**
 * Розбирає CSV-дані у масив об'єктів.
 * @param {string} csv - CSV-дані для розбору.
 * @returns {Object[]} Масив об'єктів, які представляють розібрані CSV-дані.
 */
function parseCSVData(csv) {
    // Розділяємо CSV-рядки
    const lines = csv.split('\n');
    // Отримуємо заголовки колонок
    const headers = lines[0].split(',');

    // Примаємо пустий масив для зберігання об'єктів даних
    const data = [];

    // Цикл ітерації по рядках CSV-даних(йдемо з 2 рядка, бо перший це заголовок)
    for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(',');
        const entry = {};

        // Заповнюємо об'єкт значеннями, використовуючи заголовки колонок
        for (let j = 0; j < headers.length; j++) {
            entry[headers[j]] = cells[j];
        }

        // Додаємо об'єкт до масиву даних
        data.push(entry);
    }

    return data;
}

/**
 * Відображає список автомобілів на веб-сторінці.
 * @param {Object[]} carsData - Масив об'єктів даних про автомобілі.
 */
function displayCars(carsData) {
    // Отримуємо контейнер для відображення списку автомобілів
    const carListContainer = document.getElementById('content');

    // Перевірка наявності контейнера
    if (!carListContainer) {
        console.error('Елемент з ідентифікатором "content" не знайдено.');
        return;
    }

    // Ітерація по кожному об'єкту автомобіля у вхідному масиві
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
            // Формування HTML-коду для відображення автомобіля
            const carItemHTML = `<div class="car-item well">
                <img src="${car.image_front}" alt="${car.name_brand}">
                <div>
                    <p>${car.name_brand} ${car.model_variant} ${car.configuration}</p>
                    <p>Year: ${car.year}</p>
                    <p>Price: $${car.price}</p>
                    <button class="detailsButton" data-car-id="${car.id}">Показати деталі</button>
                </div>
            </div>`;

            // Додавання HTML-коду до контейнера
            carListContainer.insertAdjacentHTML('beforeend', carItemHTML);
        }
    });

    // Додавання обробника подій до кнопок "Показати деталі"
    const detailsButtons = document.querySelectorAll('.detailsButton');
    detailsButtons.forEach(button => {
        button.addEventListener('click', handleDetailsButtonClick);
    });
}



/**
 * Обробник події для кнопок "Показати деталі".
 * @param {Event} event - Об'єкт події click.
 */
function handleDetailsButtonClick(event) {
    // Отримання ідентифікатора автомобіля з атрибуту data-car-id кнопки
    const carId = event.target.dataset.carId;

    // Перевірка наявності ідентифікатора
    if (carId) {
        const detailsURL = getDetailsURL(carId); // Формування URL для сторінки деталей на основі ідентифікатора
        window.location.href = detailsURL; // Перенаправлення на сторінку деталей
    } else {
        console.error('Немає ідентифікатора автомобіля для відображення деталей.');
    }
}


// URL CSV-файлу
const csvURL = 'http://localhost:5500/CSV/cardealer.csv';


/**
 * Асинхронно отримує та відображає дані про автомобілі на сторінці.
 */
async function fetchData() {
    const csvData = await fetchCSV(csvURL); // Отримання CSV-даних за допомогою функції fetchCSV
    const carsData = parseCSVData(csvData);  // Розбір CSV-даних у масив об'єктів за допомогою функції parseCSVData
    displayCars(carsData); //Відображення списку автомобілів на сторінці за допомогою функції displayCars
    console.log('Список автомобілів створено успішно!');
}

//Запуск процесу отримання і показу даних
fetchData().catch(error => console.error('Помилка завантаження CSV:', error));

