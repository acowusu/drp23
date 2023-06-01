module.exports = class {
  constructor({ db }) {

    this.db = db;
  }


  searchWithSociety() {
    return this.db.getRows(
      /*sql */ `
      SELECT e.event_id,
       e.name,
       e.description,
       e.thumbnail,
       e.society,
       e.location,
       e.start_datetime,
       e.price,
       e.latitude,
       e.longitude,
       t.tag_id,
       t.tag_name
      FROM events e
      JOIN eventTags et ON e.event_id = et.event_id
      JOIN tags t ON et.tag_id = t.tag_id
      WHERE e.start_datetime BETWEEN $1 AND $2
        AND e.society = $3
        AND t.tag_name = ANY($4::varchar[])
`,
      [this.startAt, this.endAt, this.society, this.tags]
    );
  }
  searchWithoutSociety() {
    return this.db.getRows(
      /*sql */ `
      SELECT e.event_id,
       e.name,
       e.description,
       e.thumbnail,
       e.society,
       e.location,
       e.start_datetime,
       e.price,
       e.latitude,
       e.longitude,
       t.tag_id,
       t.tag_name
      FROM events e
      JOIN eventTags et ON e.event_id = et.event_id
      JOIN tags t ON et.tag_id = t.tag_id
      WHERE e.start_datetime BETWEEN $1 AND $2
        AND t.tag_name = ANY($4::varchar[])
`,
      [this.startAt, this.endAt, this.tags]
    );
  }

  getEvent({ id = null }) {
    if (id == null) {
      throw "An Event ID MUST be given"
    }
    return this.db.getRow(
      `SELECT
      e.event_id,
      e.name,
      e.description,
      e.thumbnail,
      e.society,
      e.location,
      e.start_datetime,
      e.price,
      e.latitude,
      e.longitude,
      string_agg(t.tag_name, ';') AS tags
    FROM
      events e
    JOIN
      eventTags et ON e.event_id = et.event_id
    JOIN
      tags t ON et.tag_id = t.tag_id
    WHERE
      e.event_id = $1
    GROUP BY
      e.event_id,
      e.name,
      e.description,
      e.thumbnail,
      e.society,
      e.location,
      e.start_datetime,
      e.price,
      e.latitude,
      e.longitude;
    `, [this.id]
    )
  }
  allEvents() {
    if (id == null) {
      throw "An Event ID MUST be given"
    }
    return this.db.getRows(
      `SELECT
      e.event_id,
      e.name,
      e.description,
      e.thumbnail,
      e.society,
      e.location,
      e.start_datetime,
      e.price,
      e.latitude,
      e.longitude,
      string_agg(t.tag_name, ';') AS tags
    FROM
      events e
    JOIN
      eventTags et ON e.event_id = et.event_id
    JOIN
      tags t ON et.tag_id = t.tag_id
    GROUP BY
      e.event_id,
      e.name,
      e.description,
      e.thumbnail,
      e.society,
      e.location,
      e.start_datetime,
      e.price,
      e.latitude,
      e.longitude;
    `, [this.id]
    )
  }

  search({ startAt = new Date(), endAt = new Date((new Date()).getFullYear() + 100, 0, 1), society = null, tags = [] }) {
    this.startAt = startAt
    this.endAt = endAt
    this.society = society
    this.tags = tags

    const eventsMap = new Map();
    const rows = this.society ?
      this.searchWithSociety() : this.searchWithoutSociety()
    rows.forEach((row) => {
      const { event_id, tag_id, tag_name, ...eventData } = row;
      const event = eventsMap.get(event_id);

      if (event) {
        event.tags.push({ tag_id, tag_name });
      } else {
        eventsMap.set(event_id, { ...eventData, tags: [{ tag_id, tag_name }] });
      }
    });
    return Array.from(eventsMap.values())
  }

};