import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface createSlic {
    videos : any [],
    loading : boolean,
    error : any | null,
}

interface dataTypes {
    data:any
}


export const createVideo = createAsyncThunk(
    "video/createVideo",
    async (data:dataTypes, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/v1/videos/upload`, data);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState:createSlic = {
    videos : [],
    loading : false,
    error : null
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {}, // You can add additional reducers here if needed
    extraReducers: (builder) => {
        builder
            .addCase(createVideo.pending, (state) => {
                state.loading = true;
            })
            .addCase(createVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.videos.push(action.payload);
            })
            .addCase(createVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});



export default videoSlice.reducer