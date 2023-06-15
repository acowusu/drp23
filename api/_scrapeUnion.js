const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const body = req.body;
  if (body.name) {
    const html = await fetch(
      `https://www.imperialcollegeunion.org/activities/a-to-z/${body.name}`
    ).then((res) => res.text());
    const $ = cheerio.load(html);
    const society = $(
      "#block-dotorg-icu-default-content > div > div.cell.medium-8 > article > h1 > a"
    );
    const societyName = society.text();
    const constitution = $(
      "#block-dotorg-icu-default-content > div > div.cell.medium-4 > section > section > ul:nth-child(6) > li > a"
    );
    const constitutionLink = constitution.attr("href");
    const description = $(".csp-profile").html();
    const image = $("#main > div > div > div > div > img").attr("src");
    const socials = [];
    const links = {
      Instagram: "",
      WhatsApp: "",
    };
    $(
      "#block-dotorg-icu-default-content > div > div.cell.medium-4 > section > section > ul.menu.expanded.align-center.csp-button > li"
    ).each((i, el) => {
      console.log("found");
      const link = $(el).find("a").attr("href");
      const name = $(el).find("a").text().trim();
      switch (name) {
        case "Facebook":
          links.Facebook = link;
          break;
        case "Instagram":
          links.Instagram = link;
          break;
        case "WhatsApp":
          links.WhatsApp = link;
          break;
        default:
          break;
      }
      socials.push({ link, name });
    });
    const team = [];
    $(".csp-committee-entry ").each((i, el) => {
      const name = $(el).find(".person").text();
      const role = $(el).find(".position").text();
      team.push({ name, role });
    });

    res.json({
      societyName,
      constitutionLink,
      description,
      image,
      socials,
      team,
      links,
    });
  } else {
    res.status(400).json({
      errror: "No name provided",
    });
  }
};
