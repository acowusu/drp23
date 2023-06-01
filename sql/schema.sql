
BEGIN;
DROP TABLE IF EXISTS eventTags;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag_name VARCHAR(255) NOT NULL
);



CREATE TABLE events (
    event_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(255),
    society VARCHAR(255),
    location VARCHAR(255),
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    start_datetime TIMESTAMP,
    price NUMERIC(10, 2)
);

CREATE TABLE eventTags (
    event_tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID,
    tag_id UUID,
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);

COMMIT;
