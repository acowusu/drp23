
-- Clear the old data
DELETE FROM tags WHERE 1=1;
DELETE FROM eventTags WHERE 1=1;
DELETE FROM events WHERE 1=1;

-- Inserting data into the tags table
INSERT INTO tags (tag_name) VALUES
    ('Music'),
    ('Sports'),
    ('Art'),
    ('Food'),
    ('Technology');

-- Inserting data into the events table
INSERT INTO events (name, description, thumbnail, society, location, start_datetime, price, latitude, longitude, event_tag_id) VALUES
    ('Concert in the Park', 'Join us for a live music concert in the park', 'https://picsum.photos/seed/concert/1920/1080', 'Music Society', 'Central Park', '2023-06-15 19:30:00', 25.99, 40.7829, -73.9654, 1),
    ('Football Tournament', 'Participate in the annual football tournament', 'https://picsum.photos/seed/football/1920/1080', 'Sports Club', 'City Stadium', '2023-07-10 10:00:00', 10.00, 40.7128, -74.0060, 2),
    ('Art Exhibition', 'Explore a collection of contemporary art', 'https://picsum.photos/seed/art/1920/1080', 'Art Association', 'Gallery XYZ', '2023-06-30 14:00:00', 5.99, 40.7406, -73.9903, 3),
    ('Food Festival', 'Experience a variety of culinary delights', 'https://picsum.photos/seed/food/1920/1080', 'Food Lovers Society', 'Town Square', '2023-07-22 12:00:00', 0.00, 40.7589, -73.9851, 4),
    ('Tech Conference', 'Learn about the latest advancements in technology', 'https://picsum.photos/seed/tech/1920/1080', 'Tech Association', 'Conference Center', '2023-08-05 09:00:00', 50.00, 40.7282, -74.0776, 5);

-- Inserting data into the eventTags table
INSERT INTO eventTags (event_id, tag_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);
