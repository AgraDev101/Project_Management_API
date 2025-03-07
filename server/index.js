import express from "express"
import cors from "cors"
import { connectDB } from "./db/connectDB.js"
import { Student, Course } from "./db/projectSchema.js"

const app = express()

const PORT = 4000

connectDB()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// CREATE
app.post("/student", async (req, res) => {
    try {
        // let a = { name: undefined }
        let student = await Student.insertOne(req.body)
        return res.status(200).json(student)
    } catch (error) {
        console.log(error)
    } finally {
        res.status(400).send({ message: "error" })
    }
})

// READ
app.get("/student", async (req, res) => {
    let student = await Student.find({}, {__v: 0, _id: 1})
    return res.json(student)
})

// DELETE
app.delete("/student/:id", async (req, res) => {
    let student = await Student.findOneAndDelete({_id: req.params.id})
    return res.json(student)
})

// READ
app.get("/student/course", async (req, res) => {
    let student = await Student.find({}, {__v: 0, _id: 0}).populate("courses", "-_id -__v -students")
    return res.json(student)
})

// UPDATE
app.patch("/student/:id", async (req, res) => {
    let student = await Student.findOneAndUpdate({
        _id: req.params.id
    },{
        $push: {
            courses: req.body.courseId
        }
    })
    return res.json(student)
})

// CREATE
app.post("/course", async (req, res) => {
    let course = await Course.insertOne(req.body)
    return res.json(course)
})

// READ
app.get("/course", async (req, res) => {
    let course = await Course.find()
    return res.json(course)
})

// UPDATE
app.patch("/course/:id", async (req, res) => {
    let course = await Course.findOneAndUpdate({
        _id: req.params.id
    }, {
        $push: {
            students: req.body.studentId
        }
    })
    return res.json(course)
})

// READ
app.get("/course/student", async (req, res) => {
    let course = await Course.find({}, {__v: 0, _id: 0}).populate("students", "-_id -__v -courses")
    return res.json(course)
})

app.listen(PORT, () => console.log("listening on port 4000"))