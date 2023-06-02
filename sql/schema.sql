BEGIN;
DROP TABLE IF EXISTS eventTags;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
    tag_id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    tag_name varchar(255) NOT NULL
);
CREATE TABLE events (
    event_id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    name varchar(255) NOT NULL,
    description text,
    thumbnail varchar(255),
    society varchar(255),
    location varchar(255),
    latitude numeric(9, 6),
    longitude numeric(9, 6),
    start_datetime timestamp,
    ticket_price numeric(10, 2)
);
CREATE TABLE eventTags (
    event_tag_id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    event_id uuid,
    tag_id uuid,
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);
COMMIT;
