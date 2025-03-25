const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3000;
const dbConnection = require("./config/database");
const mountRoutes = require("./routes/index");  
const globalErrorHandling = require("./middlewares/error_middleware");
const ApiError = require("./utils/api_error");
const cookieParser = require('cookie-parser');

dotenv.config({ path: "config.env" });
dbConnection();

//Middlewares
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
  console.log(`process ${process.env.NODE_ENV}`);
});
app.use(
  cors({
    origin: "http://localhost:5173", // Allow multiple origins
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 
app.use(cookieParser());

// For form data

mountRoutes(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));

  console.log(`Server is running in ${process.env.NODE_ENV} mode.`);
}

//routes



//hanlding express rejections
app.all("*", (req, res, next) => {
  next(new ApiError(`cannot find this route :${req.originalUrl}`, 400));
});
app.use(globalErrorHandling);

// handling error outside express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled rejection Error :${err.name} | ${err.message}`);
  server.close(() => {
    console.error("shutting down ..........");
    process.exit(1);
  });
});
