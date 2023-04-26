import { CourseDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CourseDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"

    public async findCourses(q: string | undefined) {
        let coursesDB

        if (q) {
            const result: CourseDB[] = await BaseDatabase
                .connection(CourseDatabase.TABLE_COURSES)
                .where("id", "LIKE", `%${q}%`)
    

            coursesDB = result
        } else {
            const result: CourseDB[] = await BaseDatabase
                .connection(CourseDatabase.TABLE_COURSES)

            coursesDB = result
        }

        return coursesDB
    }
    public async insertCourse(newCourseDB: CourseDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }

    public async findCoursebyId (id: string){
        const [result]: CourseDB[] | undefined [] = await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).where({id})

        return result

    }

    public async deleteCoursebyId(id:string | undefined){
        await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).delete().from("courses").where({ id})
    }

    public async editCoursebyId(id:string | undefined, objeto : CourseDB){
        await BaseDatabase.connection(CourseDatabase.TABLE_COURSES).update(objeto).where({id})
    }
}