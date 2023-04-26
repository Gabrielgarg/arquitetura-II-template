import { CourseDatabase } from "../database/CourseDatabase"
import { BadRequestError } from "../erros/BadRequestError"
import { Course } from "../models/Couser"
import { CourseDB } from "../types"


export class CourseBusiness {
    public getCourse = async (q: string | undefined) => {
        const courseDatabase = new CourseDatabase()
        const courseDB = await courseDatabase.findCourses(q)

        const course: Course[] = courseDB.map((courseDB) => new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons,
            courseDB.created_at
        ))

        return course
    }
    public createCourse = async (input: any) => {
        const { id, name, lessons} = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof lessons !== "number") {
            throw new BadRequestError("'lessons' deve ser um number")
        }

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCoursebyId(id)

        if (courseDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newCourse = new Course(
            id,
            name,
            lessons,
            new Date().toISOString()
        ) // yyyy-mm-ddThh:mm:sssZ

        const newCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons(),
            created_at: newCourse.getCreatedAt()
        }

        await courseDatabase.insertCourse(newCourseDB)

        const output = {
            message: "Cadastro realizado com sucesso",
            user: newCourse
        }

        return output
    }

    public deleteCourse = async (q: string | undefined) => {


        if (typeof q !== "string") {
            throw new BadRequestError("'id' deve ser string")
            
        }
        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCoursebyId(q)

        if (!courseDBExists) {
            throw new BadRequestError("'id' não existe")
        }

        await courseDatabase.deleteCoursebyId(q)

        return "Item deletado com sucesso!"
    }

    public editCourse = async (input: any) => {
        
        const {id, newname, newlessons} = input
        
        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCoursebyId(id)
        
        if (!courseDBExists) {
            throw new BadRequestError("'id' não existe")
        }

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")  
        }

        if(newname){
            if (typeof newname !== "string") {
                throw new BadRequestError("'name' deve ser string")  
            }
        }

        if(newlessons){
            if (typeof newlessons !== "number") {
                throw new BadRequestError("'lessons' deve ser number")  
            }
        }


        const newCourse = new Course(
            id,
            newname || courseDBExists.name,
            newlessons || courseDBExists.lessons,
            new Date().toISOString()
    )

    const newCourseDb: CourseDB = {
        id: newCourse.getId(),
        name: newCourse.getName(),
        lessons: newCourse.getLessons(),
        created_at: newCourse.getCreatedAt()
    }




        await courseDatabase.editCoursebyId(id,newCourseDb)

        return "Item editado com sucesso!"
    }


}