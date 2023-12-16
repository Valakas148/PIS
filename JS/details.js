/**
 * Отримує CSV-дані за вказаною URL-адресою.
 * @param {string} url - URL для отримання CSV-даних.
 * @returns {Promise<string>} - Об'єкт Promise, який розв'язується з CSV-даними
 */
function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text());
}

/**
 * Розбирає CSV-дані і повертає масив об'єктів.
 * @param {string} csv - Рядок тексту CSV для розбору.
 * @returns {Array<Object>} - Масив об'єктів, представляючи розібрані CSV-дані.
 */
function parseCSVData(csv) {
    const lines = csv.split('\n'); // Розділяємо CSV-рядки
    const headers = lines[0].split(','); // Отримуємо заголовки колонок

    const data = []; // Примаємо пустий масив для зберігання об'єктів даних

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

// Отримання ID автомобіля з URL
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

// URL вашого CSV-файлу
const csvURL = 'http://localhost:5500/CSV/cardealer.csv';


/**
 * Отримує та відображає дані про автомобіль за його ID.
 */
async function fetchData() {
    const csvData = await fetchCSV(csvURL); // Отримуємо CSV-даних за допомогою функції fetchCSV
    const carsData = parseCSVData(csvData); // Розбір CSV-даних у масив об'єктів за допомогою функції parseCSVData

    // Знаходимо автомобіль за його ID
    const selectedCar = carsData.find(car => car.id === carId);

    if (selectedCar) {
        // Додавання фотографій
        const imageContainer = document.getElementById('dynamicCarImages');

        // Створення і вставка HTML-елементів для фотографій
        const imageFront = document.createElement('div');
        imageFront.innerHTML = `<img src="${selectedCar.image_front}" alt="${selectedCar.name_brand} ${selectedCar.model_variant}" style="width: ${600}; height: ${600};">`;
        imageContainer.appendChild(imageFront);

        const imageRear = document.createElement('div');
        imageRear.innerHTML = `<img src="${selectedCar.image_rear}" alt="${selectedCar.name_brand} ${selectedCar.model_variant}" style="width: ${600}; height: ${600};">`;
        imageContainer.appendChild(imageRear);

        const imageSide = document.createElement('div');
        imageSide.innerHTML = `<img src="${selectedCar.image_side}" alt="${selectedCar.name_brand} ${selectedCar.model_variant}" style="width: ${600}; height: ${600};">`;
        imageContainer.appendChild(imageSide);

        const imageReal = document.createElement('div');
        imageReal.innerHTML = `<img src="${selectedCar.image_real}" alt="${selectedCar.name_brand} ${selectedCar.model_variant}" style="width: ${600}; height: ${600};">`;
        imageContainer.appendChild(imageReal);


        // Додавання інформації про машину в таблицю
        document.getElementById('brand').textContent = selectedCar.name_brand;
        document.getElementById('model').textContent = selectedCar.model_variant;
        document.getElementById('configuration').textContent = selectedCar.configuration;
        document.getElementById('year').textContent = selectedCar.year;
        document.getElementById('body').textContent = selectedCar.body_type;

        document.getElementById('color-body').textContent = selectedCar.color_body;
        document.getElementById('color-interior').textContent = selectedCar.color_interior;
        document.getElementById('engine').textContent = selectedCar.engine;
        document.getElementById('range-miles').textContent = selectedCar.range_miles;
        document.getElementById('height').textContent = selectedCar.height;
        document.getElementById('width').textContent = selectedCar.width;

        document.getElementById('price').textContent = `Ціна: $ ${selectedCar.price}`;
        document.getElementById('catalog_numb').textContent = `Каталожний номер: ${selectedCar.id}`;
    } else {
        console.error('Автомобіль з ID ' + carId + ' не знайдено.');
    }
    // Ініціалізація слайдера за допомогою бібліотеки Slick
    $(document).ready(function(){
        $('#dynamicCarImages').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    });
    
}


// Викликати функцію для завантаження та відображення даних
fetchData().catch(error => console.error('Помилка завантаження CSV:', error));


/**
 * Викликається після завантаження DOM. Встановлює обробники подій для кнопки "Зв'язатися з менеджером", закриття модального вікна та відправки форми.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Отримання елементів DOM
    let ConnectManager = document.getElementById('contactButton');

    let modal1 = document.getElementById('modal-1');

    let closeButton = modal1.getElementsByClassName('modal__close-button')[0];

    let tagBody = document.body;
    console.log(ConnectManager);

    // Встановлення обробника подій для кнопки "ConnectManager"
    ConnectManager.onclick = function (e) {
        e.preventDefault();
        modal1.classList.add('modal_active'); // Активує клас для показу модального вікна
        tagBody.classList.add('hidden'); // Додає клас для схову тіла сторінки
        }

        // Встановлення обробника подій для кнопки закриття модального вікна
        closeButton.onclick = function (e) {
            e.preventDefault();
            modal1.classList.remove('modal_active'); // Знімає клас для показу модального вікна
            tagBody.classList.remove('hidden'); // Видаляє клас для схову тіла сторінки
        }

        // Встановлення обробника подій для закриття модального вікна при кліку поза ним
        modal1.onmousedown = function (e) {
            let target = e.target;
            let modalContent = modal1.getElementsByClassName('modal__content')[0];
                    // Закриття модального вікна, якщо клік відбувається поза його контентом
            if (e.target.closest('.' + modalContent.className) === null) {
            this.classList.remove('modal_active');
            tagBody.classList.remove('hidden');
            }
        };

        // Обробка форми
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            submitForm(); // Виклик функції для обробки відправки форми
            closeModal(); // Закриття модального вікна
        });
})



/**
 * Функція для створення або оновлення CSV-файлу з даними клієнта.
 * @param {string} name - Ім'я клієнта.
 * @param {string} lastName - Прізвище клієнта.
 * @param {string} email - Електронна адреса клієнта.
 * @param {string} phone - Номер телефону клієнта.
 * @param {string} catalogNumber - Каталожний номер машини.
 */
function createOrUpdateCSV(name, lastName, email, phone, catalogNumber) {
    let csvRow = `${name},${lastName},${email},${phone},${catalogNumber}\n`; // Створення рядка CSV

    // Перевірка, чи існує вже файл
    if (!localStorage.getItem('csvData')) {
        // Якщо немає, створюємо новий файл із заголовками
        let headers = 'name,lastName,email,phone,catalogNumber\n';
        localStorage.setItem('csvData', headers);
    }

    // Додаємо нові дані до існуючого файлу
    let currentData = localStorage.getItem('csvData');
    currentData += csvRow;
    localStorage.setItem('csvData', currentData);

    // Створюємо Blob об'єкт
    let blob = new Blob([currentData], { type: 'text/csv' });

    // Створюємо посилання для завантаження Blob об'єкта
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'client.csv';

    // Додаємо посилання на сторінку та викликаємо його клік
    document.body.appendChild(link);
    link.click();

    // Видаляємо посилання після завантаження файлу
    document.body.removeChild(link);
}

/**
 * Функція для обробки відправки форми.
 */
function submitForm() {
    let name = document.getElementById('clientName').value;
    let lastName = document.getElementById('clientLastName').value;
    let email = document.getElementById('clientEmail').value;
    let phone = document.getElementById('clientPhone').value;
    let catalogNumber = document.getElementById('catalogNumber').value;

    // Виклик функції для створення або оновлення CSV-файлу
    createOrUpdateCSV(name, lastName, email, phone, catalogNumber);
}
