-- Queries containing : denote that the variables will get data from the backend programming language

-- Display all data from a table
SELECT feed_id, name, stock FROM Feeds;
SELECT pump_id, flow_rate, age FROM Pumps;
SELECT tank_id, volume, pump_id FROM Tanks;
SELECT fish_id, species, age, tank_id, volume_needed FROM Fishes;
SELECT plant_id, species, tank_id FROM Plants;

-- Add data to a table
INSERT INTO Feeds (name, stock) VALUES (':feed_name_input', :feed_stock_input);
INSERT INTO Pumps (flow_rate, age) VALUES (:pump_flow_rate_input, :pump_age_input);
INSERT INTO Tanks (volume, pump_id) VALUES (:tank_volume_input, :fk_pump_id_input);
INSERT INTO Fishes (species, age, tank_id, volume_needed) VALUES (':fish_species_input', :fish_age_input, :fk_tank_id_input, :fish_volume_needed_input);
INSERT INTO Plants (species, tank_id) VALUES (':plant_species_input', :fk_tank_id_input);

-- Find specific items from a table
SELECT feed_id, name, stock FROM Feeds WHERE feed_id LIKE '%:feed_id_filter%' AND name LIKE '%:feed_name_filter%' AND stock LIKE '%:feed_stock_filter%';
SELECT pump_id, flow_rate, age FROM Pumps WHERE pump_id LIKE '%:pump_id_filter%' AND flow_rate LIKE '%:pump_flow_rate_filter%' AND age LIKE '%:pump_age_filter%';
SELECT tank_id, volume, pump_id FROM Tanks WHERE tank_id LIKE '%:tank_id_filter%' AND volume LIKE '%:tank_volume_filter%' AND pump_id LIKE '%:fk_pump_id_filter%';
SELECT fish_id, species, age, tank_id, volume_needed FROM Fishes WHERE fish_id LIKE '%:fish_id_filter%' AND species LIKE '%:fish_species_filter%' AND age LIKE '%:fish_age_filter%' AND tank_id LIKE '%:fk_tank_id_filter%' AND volume_needed LIKE '%:fish_volume_needed_filter%';
SELECT plant_id, species, tank_id FROM Plants WHERE plant_id LIKE '%:plant_id_filter%' AND species LIKE '%:plant_species_filter%' AND tank_id LIKE '%:fk_tank_id_filter%';

-- Update items from a table
UPDATE Feeds SET name = ':curr_feed_name', stock = :curr_feed_stock WHERE feed_id = :curr_feed_id;
UPDATE Pumps SET flow_rate = :curr_pump_flow_rate, age = :curr_pump_age WHERE pump_id = :curr_pump_id;
UPDATE Tanks SET volume = :curr_tank_volume, pump_id = :curr_fk_pump_id WHERE tank_id = :curr_tank_id;
UPDATE Fishes SET species = ':curr_fish_species', age = :curr_fish_age, tank_id = :curr_fk_tank_id, volume_needed = :curr_fish_volume_needed WHERE fish_id = :curr_fish_id;
UPDATE Plants SET species = ':curr_plant_species', tank_id = :curr_fk_tank_id WHERE plant_id = :curr_plant_id;

-- Delete items from a table
DELETE FROM Feeds WHERE feed_id = :feed_checkbox;
DELETE FROM Pumps WHERE pump_id = :pump_checkbox;
DELETE FROM Tanks WHERE tank_id = :tank_checkbox;
DELETE FROM Fishes WHERE fish_id = :fishes_checkbox;
DELETE FROM Plants WHERE plant_id = :plant_checkbox;

-- Get all data needed from tables to M:M page
SELECT * from Plants;
SELECT * from Pumps;
Select plant_id, pump_id from Plants_Pumps;

-- Add to MM table
INSERT INTO Plants_Pumps (plant_id, pump_id) values (:plant_id_input, :pump_id_input);

-- Delete from MM table
DELETE FROM Plants_Pumps WHERE plant_id = :plant_id_input AND pump_id = :pump_id_input;

-- Update MM table
UPDATE Plants_Pumps SET plant_id = :plant_id_input, pump_id = :pump_id_input WHERE plant_id = :old_plant_id AND pump_id = :old_pump_id;


-- Get all data needed from tables to M:M page
SELECT * from Fishes;
SELECT * from Feeds;
Select feed_id, fish_id from Fish_Feeds;

-- Add to MM table
INSERT INTO Fish_Feeds (feed_id, fish_id) values (:feed_id_input, :fish_id_input);

-- Delete from MM table
DELETE FROM Fish_Feeds WHERE fish_id = :fish_id_input AND feed_id = :feed_id_input;

-- Update MM table
UPDATE Fish_Feeds SET feed_id = :feed_id_input, fish_id = :fish_id_input WHERE feed_id = :old_feed_id AND fish_id = :old_fish_id;