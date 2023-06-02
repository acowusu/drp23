BEGIN;
-- Clear the old data
DELETE FROM eventTags WHERE 1=1;
DELETE FROM tags WHERE 1=1;
DELETE FROM events WHERE 1=1;

-- Inserting data into the tags table
INSERT INTO tags (tag_id, tag_name) VALUES
    ('ffffffff-ffff-ffff-ffff-fffffffffff1','Music'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff2','Sports'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff3','Art'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff4','Food'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff5','Technology'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff6' ,'Academic Related'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff7' ,'Arts & Entertainment'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff8' ,'Charitable'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff9' ,'Cultural'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff10' ,'Departmental'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff11' ,'Faith'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff12' ,'Indoor'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff13' ,'Martial Arts'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff14' ,'Media'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff15' ,'Outdoor'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff16' ,'Social'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff17' ,'Sports');

-- Inserting data into the events table
INSERT INTO events (event_id, name, description, thumbnail, society, location, start_datetime, ticket_price, latitude, longitude) VALUES
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff1' , 'Concert in the Park', 'Join us for a live music concert in the park', 'https://picsum.photos/seed/concert/1920/1080', 'Music Society', 'Central Park', '2023-06-15 19:30:00', 25.99, 40.7829, -73.9654),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff2' , 'Football Tournament', 'Participate in the annual football tournament', 'https://picsum.photos/seed/football/1920/1080', 'Sports Club', 'City Stadium', '2023-07-10 10:00:00', 10.00, 40.7128, -74.0060),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff3' , 'Art Exhibition', 'Explore a collection of contemporary art', 'https://picsum.photos/seed/art/1920/1080', 'Art Association', 'Gallery XYZ', '2023-06-30 14:00:00', 5.99, 40.7406, -73.9903),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff4' , 'Food Festival', 'Experience a variety of culinary delights', 'https://picsum.photos/seed/food/1920/1080', 'Food Lovers Society', 'Town Square', '2023-07-22 12:00:00', 0.00, 40.7589, -73.9851),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff5' , 'Tech Conference', 'Learn about the latest advancements in technology', 'https://picsum.photos/seed/tech/1920/1080', 'Tech Association', 'Conference Center', '2023-08-05 09:00:00', 50.00, 40.7282, -74.0776);

-- Inserting data into the eventTags table
INSERT INTO eventTags (event_id, tag_id) VALUES
    ('ffffffff-ffff-ffff-ffff-fffffffffff1', 'ffffffff-ffff-ffff-ffff-fffffffffff1'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff2', 'ffffffff-ffff-ffff-ffff-fffffffffff2'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff3', 'ffffffff-ffff-ffff-ffff-fffffffffff3'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff4', 'ffffffff-ffff-ffff-ffff-fffffffffff4'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff5', 'ffffffff-ffff-ffff-ffff-fffffffffff5');
COMMIT;

