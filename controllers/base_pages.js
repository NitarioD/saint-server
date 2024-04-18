const BasePages = require("../models/basePagesModel");

exports.handlePageEdit = async (req, res) => {
  const pageType = req.params.page_type;
  try {
    if (pageType === "home") {
      const homeDetails = req.body.homeDetails;
      // update base home page if exists, else create new one
      const homeExists = await BasePages.find({
        "home.header.h1": { $ne: null, $exists: true },
      });
      if (homeExists.length == 0) {
        const newHomePage = new BasePages({
          home: {
            banner_img: homeDetails.banner_img,
            header: {
              h1: homeDetails.header.h1,
              p: homeDetails.header.p,
            },
            welcome: {
              h2: homeDetails.welcome.h2,
              p: homeDetails.welcome.p,
            },
            cards: await homeDetails.cards.map((card) => {
              return {
                h3: card.h3,
                p: card.p,
                category: card.h3.toLowerCase(),
                button: card.button,
              };
            }),
            support: {
              h2: homeDetails.support.h2,
              h3: homeDetails.support.h3,
              financial: {
                h3: homeDetails.support.financial.h3,
                p: homeDetails.support.financial.p,
              },
              prayer: {
                h3: homeDetails.support.prayer.h3,
                p: homeDetails.support.prayer.p,
              },
            },
          },
          point_man: {
            title: "The Point Man",
            content: "",
          },
          the_sgf: {
            title: "About The Scripture Grace Foundation",
            content: "",
          },
          footer_info: {
            about_us: "",
            location: "",
            quick_links: [{ name: "", link: "" }],
          },
        });
        newHomePage.save();
        return res.json({ ok: true });
      } else {
        await BasePages.findOneAndUpdate(
          {
            "home.header.h1": { $ne: null, $exists: true },
          },
          {
            home: {
              banner_img: homeDetails.banner_img,
              header: {
                h1: homeDetails.header.h1,
                p: homeDetails.header.p,
              },
              welcome: {
                h2: homeDetails.welcome.h2,
                p: homeDetails.welcome.p,
              },
              cards: await homeDetails.cards.map((card) => {
                return {
                  h3: card.h3,
                  p: card.p,
                  category: card.h3.toLowerCase(),
                  button: card.button,
                };
              }),
              support: {
                h2: homeDetails.support.h2,
                h3: homeDetails.support.h3,
                financial: {
                  h3: homeDetails.support.financial.h3,
                  p: homeDetails.support.financial.p,
                },
                prayer: {
                  h3: homeDetails.support.prayer.h3,
                  p: homeDetails.support.prayer.p,
                },
              },
            },
          },
          { new: true }
        );
        return res.json({ ok: true });
      }
    } else if (pageType === "point_man") {
      const details = req.body.details;

      if (details.split("<h1>").length == 2) {
        return res.json({
          error:
            "Please remove content in 'h1'. No heading one allowed in this post",
        });
      }

      // update basepage to have point_man page
      const existingData = await BasePages.find({
        "home.header.h1": { $ne: null, $exists: true },
      });
      if (existingData.length == 0)
        return res.json({
          error: "Please, create home page before creating point man page",
        });

      await BasePages.findOneAndUpdate(
        {
          "point_man.title": "The Point Man",
        },
        {
          point_man: {
            title: "The Point Man",
            content: details,
          },
        }
      );
      return res.json({ ok: true });
    } else if (pageType === "the_sgf") {
      const details = req.body.details;

      if (details.split("<h1>").length == 2) {
        return res.json({
          error:
            "Please remove content in 'h1'. No heading one allowed in this post",
        });
      }

      // update basepage to have point_man page
      const existingData = await BasePages.find({
        "home.header.h1": { $ne: null, $exists: true },
      });

      if (existingData.length == 0)
        return res.json({
          error: "Please, create home page before creating point man page",
        });

      await BasePages.findOneAndUpdate(
        {
          "the_sgf.title": "About The Scripture Grace Foundation",
        },
        {
          the_sgf: {
            title: "About The Scripture Grace Foundation",
            content: details,
          },
        }
      );
      return res.json({ ok: true });
    } else if (pageType === "footer_info") {
      const details = req.body.details;

      // update basepage to have details about footer
      const existingData = await BasePages.find({
        "home.header.h1": { $ne: null, $exists: true },
      });

      if (existingData.length == 0)
        return res.json({
          error: "Please, create home page before creating point man page",
        });

      console.log(details.quick_links);

      await BasePages.findOneAndUpdate(
        {
          "home.header.h1": { $ne: null, $exists: true },
        },
        {
          footer_info: {
            about_us: details.about_us,
            location: details.location,
            quick_links: details.quick_links,
          },
        }
      );
      return res.json({ ok: true });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.handleGetFooterInfo = async (req, res) => {
  try {
    const exists = await BasePages.find({
      "footer_info.about_us": { $ne: null, $exists: true },
    });
    if (exists.length != 0) {
      return res.json({ details: exists[0] });
    } else {
      return res.json({ error: "Content is empty, content in admin area" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.handleGetHomePage = async (req, res) => {
  try {
    const homeExists = await BasePages.find({
      "home.header.h1": { $ne: null, $exists: true },
    });
    if (homeExists.length != 0) {
      return res.json({ homeDetails: homeExists[0] });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.handleGetPointManPage = async (req, res) => {
  try {
    const pointManExists = await BasePages.find({
      "point_man.content": { $ne: null, $exists: true },
    });
    if (pointManExists.length != 0) {
      return res.json({
        content: `<h1>The Point Man</h1>${pointManExists[0].point_man.content}`,
      });
    } else {
      return res.json({
        content: "<h1>The Point Man</>",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.handleGetAboutSGFPage = async (req, res) => {
  try {
    const aboutSGFExists = await BasePages.find({
      "the_sgf.content": { $ne: null, $exists: true },
    });

    if (aboutSGFExists.length != 0) {
      return res.json({
        content: `<h1>About The Scripture Grace Foundation</h1>${aboutSGFExists[0].the_sgf.content}`,
      });
    } else {
      return res.json({
        content: "<h1>About The Scripture Grace Foundation</h1>",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
