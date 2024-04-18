const Video = require("../models/videoModel");
const VideoTag = require("../models/videoTagsModel");

exports.addTag = async (req, res) => {
  const tag = req.body.tagName;
  if (!tag) {
    return res.json({ error: "Tag name cannot be empty" });
  }
  if (tag.split(" ").length > 1) {
    return res.json({ error: "Tagname cannot contain spaces. Use one word" });
  }
  try {
    const exist = await VideoTag.findOne({ tag });
    if (exist) {
      return res.json({
        error: "This tag already exists, you can use it by selecting it.",
      });
    } else {
      const newTag = new VideoTag({ tag });
      newTag.save();
      res.json(newTag);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await VideoTag.find({}).sort({ createdAt: -1 });
    return res.json({ tags });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTag = async (req, res) => {
  try {
    const id = req.params.id;
    const tagName = req.body.tag;

    if (tagName.split(" ").length > 1) {
      return res.json({ error: "Tagname cannot contain spaces. Use one word" });
    }

    const tag = await VideoTag.findById(id);
    if (!tag) {
      res.json({ error: "This tag does not exist" });
    } else {
      const editTag = await VideoTag.findByIdAndUpdate(
        id,
        { tag: tagName },
        { new: true }
      );
      return res.json(editTag);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTag = async (req, res) => {
  const id = req.params.id;
  try {
    //find if there is a video with that tag before attempting to delete the tag
    const videoExists = await Video.find({ tag: id });
    if (videoExists.length > 0) {
      return res.json({
        error: `cannot delete Tag name because it is currently used by a video, change the tag of video: "${videoExists[0].title}" if you want to delete this tag `,
      });
    }

    const exist = await VideoTag.findByIdAndDelete(id);
    if (exist) {
      return res.json(exist);
    } else {
      return res.json({ error: "cannot delete Tag name, try again later" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addVideo = async (req, res) => {
  const details = req.body.videoInfo;
  const embedlink = details.link;

  //check if it is iframe link(embed)
  const tempLink = details.link.split("<iframe");
  if (tempLink.length == 1) {
    return res.json({ error: "please enter youtube embed string" });
  }
  details.link = details.link.split("src=")[1].split('"')[1];

  if (!details.title)
    return res.json({
      error: "Video title cannot be empty. Please input a title",
    });
  if (!details.link) {
    return res.json({ error: "Please enter the link of the video" });
  } else {
    const isLink = details.link.split("https://").length == 2;
    if (!isLink)
      return res.json({ error: "This is not a link. Please enter a link" });
  }

  if (!details.tag) return res.json({ error: "Please select a video tag" });

  try {
    //find if video already exist under the same tag
    const exists = await Video.findOne({
      tag: details.tag,
      link: details.link,
    });

    if (exists) {
      return res.json({
        error:
          "This video already exists under this tag. If you want it under a different tag, please select the new tag.",
      });
    }
    const video = new Video({
      link: details.link,
      embedlink,
      title: details.title,
      description: details.description,
      tag: details.tag,
    });
    video.save();
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

exports.getVideos = async (req, res) => {
  const videos = await Video.find({})
    .populate("tag", "tag")
    .sort({ title: 1, tag: -1 })
    .exec();
  return res.json(videos);
};

exports.getRecentVideo = async (req, res) => {
  const videos = await Video.find({}, "link description")
    .sort({ createdAt: -1 })
    .limit(1);
  return res.json(videos[0]);
};

exports.updateVideo = async (req, res) => {
  const details = req.body.videoInfo;
  const embedlink = details.link;

  //check if it is iframe link(embed)
  const tempLink = details.link.split("<iframe");
  if (tempLink.length == 1) {
    return res.json({ error: "please enter youtube embed string" });
  }
  details.link = details.link.split("src=")[1].split('"')[1];

  if (!details.title)
    return res.json({
      error: "Video title cannot be empty. Please input a title",
    });
  if (!details.link) {
    return res.json({ error: "Please enter the link of the video" });
  } else {
    const isLink = details.link.split("https://").length == 2;
    if (!isLink)
      return res.json({ error: "This is not a link. Please enter a link" });
  }

  if (!details.tag) return res.json({ error: "Please select a video tag" });

  try {
    await Video.findByIdAndUpdate(details._id, {
      link: details.link,
      embedlink,
      title: details.title,
      description: details.description,
      tag: details.tag,
    });

    const allList = await Video.find({})
      .populate("tag", "tag")
      .sort({ title: 1 });

    return res.json(allList);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await Video.findByIdAndDelete(id);
    if (video) {
      return res.json(video);
    } else {
      return res.json({ error: "Unable to delete video, try again latter" });
    }
  } catch (error) {
    console.log(error);
  }
};
