import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import { UserSchema } from "./userSchema.mjs";
import { farmer, buyer } from "./Mongoose Schemas/mongooseUserSchema.mjs";
import "./loginAuthentification.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import passport from "passport";
import multer from "multer";
import { item } from "./Mongoose Schemas/mongooseItemSchema.mjs";
import MongoStore from "connect-mongo";
import e from "express";
const PORT = 3001;
const app = express();
app.use(
  session({
    secret: "BuyAndSell",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://mongo:27017/farmersMarketSesssion",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://mongo:27017/MarketApp");
const storage = multer.memoryStorage();
const upload = multer({ storage });

function ensureAuthFarmer(req, res, next) {
  if (req.isAuthenticated() && req.user.role == "farmer") return next();
  res.status(401).json({ msg: "Unautherised" });
}
app.get("/api/farmerDashbord", ensureAuthFarmer, (req, res) => {
  res.json({ message: "Welcome to dashboard!" });
});

function ensureAuthBuyer(req, res, next) {
  if (req.isAuthenticated() && req.user.role == "buyer") return next();
  res.status(401).json({ msg: "Unautherised" });
}
app.get("/api/buyerDashbord", ensureAuthBuyer, (req, res) => {
  res.json({ message: "Welcome to dashboard!" });
});

app.get("/api/getItem", async (req, res) => {
  try {
    const allItems = await item.find();
    return res.json(allItems);
  } catch (err) {
    console.log(err);
    return res.json({ msg: "sth went wrong" });
  }
});

app.get("/api/getFarmersItems", ensureAuthFarmer, async (req, res) => {
  try {
    const items = await item.find();
    const usersItem = items.filter(
      (foundItem) => foundItem.ownerID.toString() === req.user._id.toString()
    );
    return res.json(usersItem);
  } catch (err) {
    console.log(err);
    return res.json({ msg: "sth went wrong" });
  }
});

app.get("/api/getItemByName", async (req, res) => {
  try {
    const items = await item.find({ productName: req.body.value });
    const usersItem = items.filter(
      (foundItem) => foundItem.ownerID.toString() === req.user._id.toString()
    );
    return res.json(usersItem);
  } catch (err) {
    console.log(err);
    return res.json({ msg: "sth went wrong" });
  }
});

app.post(
  "/api/addItem",
  ensureAuthFarmer,
  upload.single("image"),
  async (req, res) => {
    const { name, discription, price, categorieValue } = req.body;
    if (!req.file) return console.log("No File Found");
    const bufferImage = req.file.buffer;
    if (!bufferImage) return console.log("No bufferImage");

    const savedItem = new item({
      productName: name,
      productDiscription: discription,
      price,
      productPicture: bufferImage,
      productCategorie: categorieValue,
      ownerID: req.user._id,
    });
    await savedItem.save();
  }
);

app.post("/api/register", checkSchema(UserSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
  const {
    firstName,
    lastName,
    username,
    password,
    birthday,
    role,
    phoneNumber,
    email,
  } = matchedData(req);

  if (role === "farmer") {
    const newFarmer = new farmer({
      firstName,
      lastName,
      username,
      password,
      dateOfBirth: birthday,
      role,
      phoneNumber,
      email,
    });
    try {
      const savedUser = await newFarmer.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
  if (role === "buyer") {
    const newBuyer = new buyer({
      firstName,
      lastName,
      username,
      password,
      dateOfBirth: birthday,
      role,
      phoneNumber,
      email,
    });
    try {
      const savedUser = await newBuyer.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  if (!req.user)
    return res
      .status(400)
      .json({ msg: "failed to connect", authenticated: false });
  res.status(200).json({
    message: "Login successful",
    user: req.user,
    authenticated: true,
  });
});
app.get("/api/farmerDashbord", ensureAuthFarmer, (req, res) => {
  console.log("Welcome to Dashbord");
  res.json({ message: "Welcome to dashboard!" });
});

app.delete("/api/deleteItem", ensureAuthFarmer, async (req, res) => {
  const { id } = req.body;
  try {
    await item.findOneAndDelete({ _id: id });
    console.log("Deleted succesfuly ");
  } catch (err) {
    console.log(err);
  }
});

app.patch(
  "/api/editItem",
  ensureAuthFarmer,
  upload.single("image"),
  async (req, res) => {
    const { id, nameP, discriptionP, priceP } = req.body;
    const response = await item.findOne({ _id: id });
    if (nameP != "" && nameP != response.productName)
      await item.findByIdAndUpdate(id, { productName: nameP });
    if (discriptionP != "" && discriptionP != response.productDiscription)
      await item.findByIdAndUpdate(id, { productDiscription: discriptionP });
    if (priceP != "" && priceP != response.price)
      await item.findByIdAndUpdate(id, { price: priceP });
    if (categorieValue != "" && categorieValue != response.productCategorie)
      await item.findByIdAndUpdate(id, { productCategorie: categorieValue });
    const bufferImage = req.file.buffer;
    if (bufferImage)
      await item.findByIdAndUpdate(id, { productPicture: bufferImage });
  }
);

app.get("/api/ownerInfo/:ownerID", ensureAuthBuyer, async (req, res) => {
  const { ownerID } = req.params;
  try {
    const ownerInfo = await farmer.findById(ownerID);
    return res.json({
      firstName: ownerInfo.firstName,
      lastName: ownerInfo.lastName,
      phoneNumber: ownerInfo.phoneNumber,
      email: ownerInfo.email,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server Conected on port ${PORT}`);
});
