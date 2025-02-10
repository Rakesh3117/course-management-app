import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { categories, partnerData, Industries } from "./dummyCoursesList.js";
import { FullyDetailedCourses } from "./FullyDetailedCourses.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    id: 1,
    email: "test@gmail.com",
    password: "dummyPassword123",
    enrolled_courses: [{ id: 1 }, { id: 2 }, { id: 3 }],
    favourite_courses: [],
  },
  {
    id: 2,
    email: "demo@gmail.com",
    password: "1234",
    enrolled_courses: [],
    favourite_courses: [],
  },
];

const SECRET_KEY = "studyPortal";

const validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token." });
  }
};

app.get("/api/enrolled", validateToken, (req, res) => {
  try {
    const user = req.user;
    return res.send(user);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).send({ message: "User does not exist" });
    if (user.password !== password)
      return res.status(400).send({ message: "Password is incorrect" });

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    res
      .status(200)
      .send({ message: "Login successful", user: payload, jwtToken: token });
  } catch {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "All fields are required" });
    if (users.find((user) => user.email === email))
      return res
        .status(400)
        .send({ message: "User already exists. Please login." });

    users.push({
      id: uuidv4(),
      email,
      password,
      firstname,
      lastname,
      purchased_courses: [],
      favourite_courses: [],
    });
    res.status(201).send({ message: "User created successfully" });
  } catch {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/all", validateToken, async (req, res) => {
  try {
    if (!categories)
      return res
        .status(400)
        .json({ message: "No Data Found. Try again later." });
    res.status(200).json(categories);
  } catch {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/categories", validateToken, async (req, res) => {
  try {
    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ message: "No Data Found. Try again later." });
    }
    const categoriesList = categories.map((category) => ({
      name: category?.name,
      technologyId: category?.technologyId,
    }));

    res.status(200).json(categoriesList);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/partnersData", validateToken, async (req, res) => {
  try {
    if (partnerData && Industries) {
      return res.status(200).json({ partnerData, Industries });
    }
    return res.status(400).json({ message: "No Partners to show" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/:tech", async (req, res) => {
  const { tech } = req.params;
  try {
    const result = categories.filter((category) => category?.name === tech);
    if (!result) {
      return res.status(404).json({ message: "Technology not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/:technologyId/:id", validateToken, async (req, res) => {
  try {
    const { technologyId, id } = req.params;

    if (!technologyId || !id) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const technology = FullyDetailedCourses?.find(
      (course) => course?.technologyId == technologyId
    );

    if (!technology) {
      return res.status(404).json({ message: "Technology Not Found" });
    }

    const specificCourse = technology?.courses?.filter(
      (program) => program?.id == id
    );

    if (!specificCourse) {
      return res
        .status(404)
        .json({ course: technology, message: "Course Not Found" });
    }

    return res.status(200).json({
      ...specificCourse?.[0],
      technologyId: technology?.technologyId,
      technologyName: technology?.name,
    });
  } catch (err) {
    console.error("Error fetching course data:", err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/add-course-to-enrolled-list", validateToken, (req, res) => {
  try {
    const { technologyId, courseId, enrolledCourse } = req.body;
    const user = req.user;

    if (!technologyId || !courseId || !enrolledCourse) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userDetails = users?.find((u) => u.id === user.id);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    userDetails.enrolled_courses = userDetails.enrolled_courses || [];
    const isEnrolledCourseExist = userDetails?.enrolled_courses?.some(
      (course) => course?.technologyId == technologyId && course?.id == courseId
    );

    if (isEnrolledCourseExist) {
      return res
        .status(403)
        .json({ message: "Course Already In your Enrolled List" });
    }

    userDetails?.enrolled_courses?.push(enrolledCourse);

    return res
      .status(201)
      .json({ message: "Course added successfully", userDetails });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
