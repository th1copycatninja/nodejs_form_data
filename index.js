const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "formandmedianodejs",
  api_key: "264551678479288",
  api_secret: "S9tEYDYOHyWCSwVa8wzUwS_uSIE",
});
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "",
  })
);
app.get("/getquery", (req, res) => {
  console.log(req.query);
  return res.send(req.query);
});

app.post("/postquery", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  // multi image upload

  let imageArray = [];
  if (req?.files?.samplefile) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      const result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "users",
        }
      );
      imageArray.push({
        public_key: result.public_id,
        http_url: result.url,
        secure_url: result.secure_url,
      });
    }
  }
  //single image upload
  const imageFile = req.files.samplefile
  const result =await cloudinary.uploader.upload(imageFile.tempFilePath,{
      folder:"users"
  })
  console.log("image result ---", imageArray);
  return res.send({ data: { users: req.body, image:result?result: imageArray } });
});

app.get("/getejs", (req, res) => {
  res.render("getejs");
});

app.get("/postejs", (req, res) => {
  res.render("postejs");
});
app.listen("4000", () => console.log("running is running on port 4000"));
