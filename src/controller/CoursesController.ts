import { Request, Response } from "express"
import { CourseBusiness } from "../business/CourseBusiness"
import { BaseError } from "../erros/BaseError"

export class CoursesController{
    public getCourses = async (req: Request, res:Response) =>{
        try {
            const q = req.query.id as string | undefined

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.getCourse(q)
    
            res.status(200).send(output)
        } catch (error) {
            
        }
    }
    public createCourse = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.createCourse(input)
    
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            // if (res.statusCode === 200) {
            //     res.status(500)
            // }
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public deleteCourse = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string

            // const input = {
            //     id: req.params.id
            // }

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.deleteCourse(id)
    
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            // if (res.statusCode === 200) {
            //     res.status(500)
            // }
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editCourse = async (req: Request, res: Response) => {
        try {
            // const id = req.params.id as string

            const input = {
                id: req.params.id as string | undefined,
                newname: req.body.name as string | undefined,
                newlessons: req.body.lessons as number | undefined
            }

            const courseBusiness = new CourseBusiness()
            const output = await courseBusiness.editCourse(input)
    
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            // if (res.statusCode === 200) {
            //     res.status(500)
            // }
    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

}