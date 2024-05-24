import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const generateParagraphs = createAsyncThunk("paragraphs/generateParagraphs", async({paras,format})=> {
    const res = await axios(`https://baconipsum.com/api/?type=all-meat&paras=${paras}&format=${format}`)
    return await res.data
})

export const paragraphSlice = createSlice({
    name:"paragraphs",
    initialState: {
        item:"",
        status:"idle"
    },
    extraReducers: (builder) => {
        builder
        .addCase(generateParagraphs.pending, (state,action) => {
            console.log("loading")
            state.status = "loading"
        })
        .addCase(generateParagraphs.fulfilled, (state,action) => {
            console.log("success")
            state.status = "succeeded"

            state.item = action.payload
            // console.log(action.payload)

        })
        .addCase(generateParagraphs.rejected, (state,action) => {
            console.log("failed", action.error.message)
            state.status = "failed"
        })
    }
})

export const paragraphSelector = (state) => state.paragraphs.item
export const statusSelector = (state) => state.paragraphs.status



export default paragraphSlice.reducer