import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courses: [
        { 
            type: "ObjectId",
            ref: "Course"
        }
    ]
})

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    students: [
        { 
            type: "ObjectId",
            ref: "Student"
        }
    ]
})

const Student = mongoose.model("Student", studentSchema)
const Course = mongoose.model("Course", courseSchema)

export { Student, Course }