import { z} from 'zod'

export const VideoSchema = z.object({
    title : z.string().min(3,{message : "title must be at least 2 characters."}),
    description : z.string().min(6,{message : "title must be at least 6 characters."}).max(20),
    video : z.string(),
    thumbnail : z.string(),
})