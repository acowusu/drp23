module.exports = class {
  constructor({ db }) {

    this.db = db;
  }

  async create(eventData) {
    const client = await this.db.getClient();

    try {
      await client.query('BEGIN');

      const tagNames = eventData.tagNames;

      const tagIds = await Promise.all(
        tagNames.map(async (tagName) => {
          const { rows } = await client.query('SELECT tag_id FROM tags WHERE tag_name = $1', [tagName]);

          if (rows.length > 0) {
            return rows[0].tag_id;
          } else {
            const insertResult = await client.query('INSERT INTO tags (tag_name) VALUES ($1) RETURNING tag_id', [tagName]);
            return insertResult.rows[0].tag_id;
          }
        })
      );

      const insertResult = await client.query(
        `INSERT INTO events (name, description, thumbnail, society, location, start_datetime, price, latitude, longitude)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING event_id`,
        [
          eventData.name,
          eventData.description,
          eventData.thumbnail,
          eventData.society,
          eventData.location,
          eventData.start_datetime,
          eventData.price,
          eventData.latitude,
          eventData.longitude,
        ]
      );

      const eventId = insertResult.rows[0].event_id;

      await Promise.all(
        tagIds.map(async (tagId) => {
          await client.query('INSERT INTO eventTags (event_id, tag_id) VALUES ($1, $2)', [eventId, tagId]);
        })
      );

      await client.query('COMMIT');
      console.log('Event created successfully!');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error creating event:', error);
    } finally {
      client.release();
      pool.end();
    }
  }
}