import { z} from 'zod'

export const VideoSchema = z.object({
    title : z.string().min(3,{message : "title must be at least 2 characters."}),
    description : z.string().min(400,{message : "title must be at least 400 characters."}),
    video : z.string(),
    thumbnail : z.string(),
})