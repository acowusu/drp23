module.exports = class {
  constructor({ db }) {
    this.db = db;
  }

  searchWithSociety() {
    if (this.tags.length > 0) {
      return this.db.getRows(
        /*sql */ `
        SELECT e.event_id,
        e.name,
        e.description,
        e.image_url,
        e.society,
        e.location,
        e.date_time,
        e.ticket_price,
        e.latitude,
        e.longitude,
        t.tag_id,
        t.tag_name
        FROM events e
        JOIN eventTags et ON e.event_id = et.event_id
        JOIN tags t ON et.tag_id = t.tag_id
        WHERE e.date_time BETWEEN $1 AND $2
          AND e.society = $3
          AND t.tag_name = ANY($4::varchar[])
        GROUP BY
          e.event_id,
          e.name,
          e.description,
          e.image_url,
          e.society,
          e.location,
          e.date_time,
          e.ticket_price,
          e.latitude,
          e.longitude;
  `,
        [this.startAt, this.endAt, this.society, this.tags]
      );
    } else {
      return this.db.getRows(
        /*sql */ `
        SELECT e.event_id,
        e.name,
        e.description,
        e.image_url,
        e.society,
        e.location,
        e.date_time,
        e.ticket_price,
        e.latitude,
        e.longitude,
        string_agg(t.tag_name, ';') AS tags
        FROM events e
        JOIN 
          eventTags et ON e.event_id = et.event_id
        JOIN 
          tags t ON et.tag_id = t.tag_id
        WHERE 
          e.date_time BETWEEN $1 AND $2
          AND e.society = $3
        GROUP BY
          e.event_id,
          e.name,
          e.description,
          e.image_url,
          e.society,
          e.location,
          e.date_time,
          e.ticket_price,
          e.latitude,
          e.longitude;
  `,
        [this.startAt, this.endAt, this.society]
        )
        .then((rows) => {
          rows.forEach((row) => {
            row.tags = row.tags.split(";");
          });
          return rows;
        });
      }
  }
  searchWithoutSociety() {
    console.log("searching");
    return this.db.getRows(
      /*sql */ `
      SELECT e.event_id,
       e.name,
       e.description,
       e.image_url,
       e.society,
       e.location,
       e.date_time,
       e.ticket_price,
       e.latitude,
       e.longitude,
       t.tag_id,
       t.tag_name
      FROM events e
      JOIN eventTags et ON e.event_id = et.event_id
      JOIN tags t ON et.tag_id = t.tag_id
      WHERE e.date_time BETWEEN $1 AND $2
        AND t.tag_name = ANY($4::varchar[])
`,
      [this.startAt, this.endAt, this.tags]
    );
  }

  getEvent({ event_id = null }) {
    if (event_id == null) {
      throw "An Event ID MUST be given";
    }
    return this.db
      .getRow(
        `SELECT
      e.event_id,
      e.name,
      e.description,
      e.image_url,
      e.society,
      e.location,
      e.date_time,
      e.ticket_price,
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
      e.image_url,
      e.society,
      e.location,
      e.date_time,
      e.ticket_price,
      e.latitude,
      e.longitude;
    `,
        [event_id]
      )
      .then((row) => {
        row.tags = row.tags.split(";");
        return row;
      });
  }
  allEvents() {
    return this.db
      .getRows(
        `SELECT
      e.event_id,
      e.name,
      e.description,
      e.image_url,
      e.society,
      e.location,
      e.date_time,
      e.ticket_price,
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
      e.image_url,
      e.society,
      e.location,
      e.date_time,
      e.ticket_price,
      e.latitude,
      e.longitude;
    `,
        []
      )
      .then((rows) => {
        rows.forEach((row) => {
          row.tags = row.tags.split(";");
        });
        return rows;
      });
  }
  eventsToday() {
    return this.db
      .getRows(
        `SELECT
      e.event_id,
      e.name,
      e.description,
      e.image_url,
      e.society,
      e.location,
      e.date_time,
      e.ticket_price,
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
    CAST(e.date_time AS DATE) = CURRENT_DATE
    GROUP BY
      e.event_id,
      e.name,
      e.description,
      e.image_url,
      e.society,
      e.location,
      e.date_time,
      e.ticket_price,
      e.latitude,
      e.longitude;
    `,
        []
      )
      .then((rows) => {
        rows.forEach((row) => {
          row.tags = row.tags.split(";");
        });
        return rows;
      });
  }

  search({
    startAt = new Date(),
    endAt = new Date(new Date().getFullYear() + 100, 0, 1),
    society = null,
    tags = [],
  }) {
    this.startAt = startAt;
    this.endAt = endAt;
    this.society = society;
    this.tags = tags;
    console.log(startAt, endAt, society, tags);
    return (
      this.society ? this.searchWithSociety() : this.searchWithoutSociety()
    )
  }
};
