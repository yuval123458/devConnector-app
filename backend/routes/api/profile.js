const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const router = express.Router();
const Profile = require("../../models/ProfileModel");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

//    GET new profile for logged user
//    access is private
//    api/profile/me
router.get("/me", checkAuth, async (req, res) => {
  try {
    console.log("GET request");
    const profile = await Profile.findOne({ user: req.userData });

    if (!profile) {
      throw new Error({ msg: "could not find user in profile model" });
    }

    res.json(profile);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "could not search for user in profile model" });
  }
});

//    post new profile for logged users
//    access is private
//    api/profile
router.post(
  "/",
  [
    checkAuth,
    check("status", "status must be filled").not().isEmpty(),
    check("skills", "skills must be filled").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }
    console.log("request to post");

    const {
      company,
      website,
      location,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      facebook,
      linkedin,
      instagram,
      twitter,
    } = req.body;

    const requiredFields = {};

    requiredFields.user = req.userData;
    console.log(req.userData);

    company
      ? (requiredFields.company = company)
      : (requiredFields.comapny = null);

    website
      ? (requiredFields.website = website)
      : (requiredFields.website = null);

    location
      ? (requiredFields.location = location)
      : (requiredFields.location = null);

    bio ? (requiredFields.bio = bio) : (requiredFields.bio = null);

    githubusername
      ? (requiredFields.githubusername = githubusername)
      : (requiredFields.githubusername = null);

    requiredFields.status = status;

    requiredFields.social = {};

    youtube
      ? (requiredFields.social.youtube = youtube)
      : (requiredFields.social.youtube = null);

    linkedin
      ? (requiredFields.social.linkedin = linkedin)
      : (requiredFields.social.linkedin = null);

    facebook
      ? (requiredFields.social.facebook = facebook)
      : (requiredFields.social.facebook = null);

    twitter
      ? (requiredFields.social.twitter = twitter)
      : (requiredFields.social.twitter = null);

    instagram
      ? (requiredFields.social.instagram = instagram)
      : (requiredFields.social.instagram = null);

    requiredFields.skills = skills.split(",").map((skill) => skill.trim());

    let newProfile;
    let user;
    try {
      newProfile = await Profile.findOne({ user: req.userData });
      if (newProfile) {
        newProfile = await Profile.findOneAndUpdate(
          { user: req.userData },
          { $set: requiredFields },
          { new: true }
        );
        return res.json({ updatedProfile: newProfile });
      }
    } catch (err) {
      return res.status(401).json({
        msg: "could not update and save new profile",
      });
    }
    try {
      newProfile = new Profile(requiredFields);
      await newProfile.save();
      return res.json({ createdProfile: newProfile });
    } catch (err) {
      return res.status(401).json({
        msg: "could not create and save new profile",
      });
    }
  }
);

//   api/profile
//   GET all profiles
//   access public

router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);

    if (!profiles || profiles.length === 0) {
      return res.status(401).json({
        msg: "could not find any profiles",
      });
    }

    return res.json(profiles);
  } catch (err) {
    return res.status(401).json({
      msg: "could not search for profiles",
    });
  }
});

//    api/profile/user/:userId
//    GET specific user profile by user Id
//    access: public

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let profile = await Profile.findOne({ user: userId });

    res.json({ profile: profile });
  } catch (err) {
    return res.status(401).json({
      msg: "could not find profile for the given userid",
    });
  }
});

//    api/profile
//    DELETE user and his profile & posts
//    access: private

router.delete("/", checkAuth, async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.userData });
    await Profile.findOneAndRemove({ user: req.userData });

    res.json({ msg: "user deleted!" });
  } catch (error) {
    return res.status(401).json({
      msg: "could not find and delete user",
    });
  }
});

//  api/profile/experience
//  PUT experience in users profile
//  access: private

router.put(
  "/experience",
  [
    checkAuth,
    [
      check("title").not().isEmpty(),
      check("company").not().isEmpty(),
      check("from").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const { title, company, location, from, to, current, description } =
      req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ msg: "must fill all required fields!" });
    }

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      let profile = await Profile.findOne({ user: req.userData });
      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (error) {
      return res.status(401).json({
        msg: "could not add experience",
      });
    }
  }
);

//    api/profile/experience/:expId
//    DELETE request to delete a specific profile exp
//    access: private

router.delete("/experience/:expId", checkAuth, async (req, res) => {
  const { expId } = req.params;

  try {
    let profile = await Profile.findOne({ user: req.userData });
    profile.experience = profile.experience.filter((exp) => exp.id !== expId);
    console.log(profile.experience);
    await profile.save();
    res.json({ profile: profile });
  } catch (error) {
    return res.status(401).json({
      msg: "could delete experience",
    });
  }
});

//    api/profile/education
//    PUT education in users profile
//    access: private

router.put(
  "/education",
  [
    checkAuth,
    [
      check("school").not().isEmpty(),
      check("degree").not().isEmpty(),
      check("fieldofstudy").not().isEmpty(),
      check("from").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ msg: "must fill all required fields!" });
    }

    const newEdc = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      let profile = await Profile.findOne({ user: req.userData });
      profile.education.unshift(newEdc);
      await profile.save();

      res.json(profile);
    } catch (error) {
      return res.status(401).json({
        msg: "could not add education",
      });
    }
  }
);

//    api/profile/education/:edcId
//    DELETE request to delete a specific profile education
//    access: private

router.delete("/education/:edcId", checkAuth, async (req, res) => {
  const { edcId } = req.params;

  try {
    let profile = await Profile.findOne({ user: req.userData });
    profile.education = profile.education.filter((edc) => edc.id !== edcId);
    console.log(profile.experience);
    await profile.save();
    res.json(profile);
  } catch (error) {
    return res.status(401).json({
      msg: "could delete education",
    });
  }
});

//   api/profile/github/:username
//   GET user reops from github
//   access: public

router.get("/github/:username", async (req, res) => {
  const opt = {
    uri: `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${config.get(
      "githubclientId"
    )}&client_secret=${config.get("githubclientSecret")}`,
    method: "GET",
    headers: {
      "user-agent": "node.js",
    },
  };

  request(opt, (error, response, body) => {
    if (error) console.log(error);

    if (response.statusCode !== 200) {
      return res.status(404).json({ msg: "could not find user" });
    }

    res.json(JSON.parse(body));
  });
});

module.exports = router;
