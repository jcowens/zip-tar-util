import compress from "./src/compress.js";

compress(
  "C:\\Users\\jere\\Downloads\\SDL-master1",
  "C:\\Users\\jere\\Downloads\\SDL-master1\\ppppp"
)
  .then(() => console.log("Compression complete!"))
  .catch((err) => console.error(err));
