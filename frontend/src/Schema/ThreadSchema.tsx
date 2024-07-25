import {z} from 'zod'

export const ThreadSchema = z.object({
    title : z.string().min(3,{message : "title must be at least 3 characters."}),
    description : z.string().min(4,{message : "title must be at least 4 characters."}).max(200),
    avatar : z.string()
})