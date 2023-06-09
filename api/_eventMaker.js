module.exports = class {
  constructor({ db, subscriptionManager }) {
    this.db = db;
    this.subscriptionManager = subscriptionManager;
  }

  async create({
    name,
    description,
    image_url,
    society,
    location,
    date_time,
    ticket_price,
    latitude,
    longitude,
    tags,
  }) {
    const client = await this.db.getClient();
    let id;
    try {
      await client.query("BEGIN");

      const tagIds = await Promise.all(
        tags.map(async (tagName) => {
          const { rows } = await client.query(
            "SELECT tag_id FROM tags WHERE tag_name = $1",
            [tagName]
          );

          if (rows.length > 0) {
            return rows[0].tag_id;
          } else {
            const insertResult = await client.query(
              "INSERT INTO tags (tag_name) VALUES ($1) RETURNING tag_id",
              [tagName]
            );
            return insertResult.rows[0].tag_id;
          }
        })
      );

      const insertResult = await client.query(
        `INSERT INTO events (name, description, image_url, society, location, date_time, ticket_price, latitude, longitude)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING event_id`,
        [
          name,
          description,
          image_url,
          society,
          location,
          date_time,
          ticket_price,
          latitude,
          longitude,
        ]
      );

      const eventId = insertResult.rows[0].event_id;
      id = eventId;
      await Promise.all(
        tagIds.map(async (tagId) => {
          await client.query(
            "INSERT INTO eventTags (event_id, tag_id) VALUES ($1, $2)",
            [eventId, tagId]
          );
        })
      );

      await client.query("COMMIT");

      console.log("Event created successfully!");
      //  add to algolia

      await this.db.addSearchable({
        objectID: eventId,
        name,
        description,
        image_url,
        society,
        location,
        date_time,
        ticket_price,
        latitude,
        longitude,
        timestamp: new Date(date_time).valueOf(),
        _geoloc: {
          lat: latitude,
          lon: longitude,
        },
      });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error creating event:", error);
    } finally {
      client.release();
    }
    await this.subscriptionManager.notify({
      name,
      description,
      image_url,
      society,
      location,
      date_time,
      ticket_price,
      latitude,
      longitude,
      tags,
    });
    return id;
  }
};
