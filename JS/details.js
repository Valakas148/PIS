// Функція для отримання CSV-даних
function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text());
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

// Отримання ID автомобіля з URL
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

// URL вашого CSV-файлу
const csvURL = 'http://localhost:5500/CSV/cardealer.csv';

// Отримання та відображення даних автомобіля
async function fetchData() {
    const csvData = await fetchCSV(csvURL);
    const carsData = parseCSVData(csvData);

    // Знаходимо автомобіль за його ID
    const selectedCar = carsData.find(car => car.id === carId);

    if (selectedCar) {
        // Додавання фотографій
        const imageContainer = document.getElementById('dynamicCarImages');

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



document.addEventListener('DOMContentLoaded', () => {
    let EditProfileButt = document.getElementById('contactButton');

    let modal1 = document.getElementById('modal-1');

    let closeButton = modal1.getElementsByClassName('modal__close-button')[0];

    let tagBody = document.body;
    console.log(EditProfileButt);

    EditProfileButt.onclick = function (e) {
        e.preventDefault();
        modal1.classList.add('modal_active');
        tagBody.classList.add('hidden');
        }

        closeButton.onclick = function (e) {
            e.preventDefault();
            modal1.classList.remove('modal_active');
            tagBody.classList.remove('hidden');
        }

        modal1.onmousedown = function (e) {
            let target = e.target;
            let modalContent = modal1.getElementsByClassName('modal__content')[0];
            if (e.target.closest('.' + modalContent.className) === null) {
            this.classList.remove('modal_active');
            tagBody.classList.remove('hidden');
            }
        };

                // Обробка форми
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            submitForm();
            closeModal();
        });
})

function createOrUpdateCSV(name, lastName, email, phone, catalogNumber) {
    let csvRow = `${name},${lastName},${email},${phone},${catalogNumber}\n`;

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

function submitForm() {
    let name = document.getElementById('clientName').value;
    let lastName = document.getElementById('clientLastName').value;
    let email = document.getElementById('clientEmail').value;
    let phone = document.getElementById('clientPhone').value;
    let catalogNumber = document.getElementById('catalogNumber').value;


    createOrUpdateCSV(name, lastName, email, phone, catalogNumber);
}
