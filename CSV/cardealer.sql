
USE cardealership;
CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_front VARCHAR(255),
    image_rear VARCHAR(255),
    image_side VARCHAR(255),
    image_real VARCHAR(255),
    brand VARCHAR(255),
    model_variant VARCHAR(255),
    configuration VARCHAR(255),
    year INT,
    body_type VARCHAR(255),
    price INT,
    engine VARCHAR(255),
    color_body VARCHAR(255),
    color_interior VARCHAR(255),
    height_mm INT,
    width_mm INT,
    range_km INT,
    drive_type VARCHAR(255)
);

INSERT INTO cars (image_front, image_rear, image_side, image_real, brand, model_variant, configuration, year, price, engine, color_body, color_interior, height_mm, width_mm, range_km, drive_type, body_type)
VALUES
('Audi-E-tron-PNG.png', 'Audi-E-tron-PNG.png', 'Volkswagen-ID5-GTX-2022-side.png', 'Audi-E-tron-PNG.png', 'Audi', 'Q8 E-tron','Quattro', 2022, 90000.00, 'Electric 55 114 kWh', 'White', 'Black', 4915, 1937, 580, 'AWD', 'SUV'),
('Volkswagen-ID5-GTX-2022-front.png', 'Volkswagen-ID5-GTX-2022-rear.png', 'Volkswagen-ID5-GTX-2022-side.png', 'vw-id4-PNG.png', 'Volkswagen', 'ID.5', 'GTX', 2023, 30000.00, 'Electric 82 kWh 4MOTION', 'Red', 'White', 4599, 1852, 200, 'FWD', 'Hatchback');

SELECT * FROM cars;

