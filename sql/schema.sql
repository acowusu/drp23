
BEGIN;
DROP TABLE IF EXISTS eventTags;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS subscription;
DROP TABLE IF EXISTS society;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS societyType;

CREATE TABLE tags (
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag_name VARCHAR(255) NOT NULL
);



CREATE TABLE events (
    event_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(2048),
    society VARCHAR(255),
    location VARCHAR(255),
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    date_time TIMESTAMP,
    ticket_price NUMERIC(10, 2)
);

CREATE TABLE eventTags (
    event_tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID,
    tag_id UUID,
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);



CREATE TYPE societyType AS ENUM ('Academic Related',
                'Arts & Entertainment',
                'Charitable',
                'Cultural',
                'Departmental',
                'Faith',
                'Indoor',
                'Martial Arts',
                'Media',
                'Outdoor',
                'Social',
                'Sports');

CREATE TABLE society (
    society_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    type  societyType,
    description TEXT,
    metadata JSONB
);

CREATE TABLE users 
(
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL 
);

CREATE TABLE subscription (
    subscription_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    society_id UUID,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (society_id) REFERENCES society (society_id)
);



COMMIT;
