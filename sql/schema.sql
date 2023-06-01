CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL
);

CREATE TABLE eventTags (
    event_tag_id SERIAL PRIMARY KEY,
    event_id INT,
    tag_id INT,
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(255),
    society VARCHAR(255),
    location VARCHAR(255),
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    start_datetime TIMESTAMP,
    price NUMERIC(10, 2),
    event_tag_id INT,
    FOREIGN KEY (event_tag_id) REFERENCES eventsTags (event_tag_id)
);