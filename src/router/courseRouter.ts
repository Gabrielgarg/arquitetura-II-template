import express from "express"
import { CoursesController } from "../controller/CoursesController"


export const courseRouter = express.Router()


const courseController = new CoursesController()
courseRouter.get("/", courseController.getCourses)
courseRouter.post("/", courseController.createCourse)
courseRouter.delete("/:id", courseController.deleteCourse)
courseRouter.put("/:id", courseController.editCourse)
