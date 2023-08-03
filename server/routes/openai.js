import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
     const { text, activeChatId } = req.body;

     const response = await openai.createChatCompletion({
       model: "gpt-3.5-turbo",
       messages: [
         { role: "system", content: "You are a helpful assistant." }, // this represents the bot and what role they will assume
         { role: "user", content: text }, // the message that the user sends


       ],
     });

     await axios.post(
       `https://api.chatengine.io/chats/${activeChatId}/messages/`,
       { text: response.data.choices[0].message.content },
       {
         headers: {
           "Project-ID": "24ccdd59-bd5a-4d93-a23d-78dc997f389c",
           "User-Name": "AIBOT",
           "User-Secret": "1234",
         },
       }
     );

     res.status(200).json({ text: response.data.choices[0].message.content });
   } catch (error) {
     console.error("error", error.response.data.error);
     res.status(500).json({ error: error.message });
   }
 });

 router.post("/code", async (req, res) => {
   try {
     const { text, activeChatId } = req.body;
     const response = await openai.createChatCompletion({
       model: "gpt-3.5-turbo",
       messages: [
         {
           role: "system",
           content:
             "You are an assistant coder who responds with only code and no explanations.",
         }, // this represents the bot and what role they will assume
         { role: "user", content: text }, // the message that the user sends
       ],
     });

     await axios.post(
       `https://api.chatengine.io/chats/${activeChatId}/messages/`,
       { text: response.data.choices[0].message.content },
       {
         headers: {
           "Project-ID": "24ccdd59-bd5a-4d93-a23d-78dc997f389c",
           "User-Name": "AIBOT",
           "User-Secret": "1234",
         },
       }
     );
     res.status(200).json({ text: response.data.choices[0].message.content });
   } catch (error) {
     console.error("error", error.response.data.error);
     res.status(500).json({ error: error.message });
   }
 });
 router.post("/assist", async (req, res) => {
   try {
     const { text } = req.body;
     const response = await openai.createChatCompletion({
       model: "gpt-3.5-turbo",
       messages: [
         {
           role: "system",
           content:
             "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
         }, // this represents the bot and what role they will assume
         { role: "user", content: `Finish my thought: ${text}` }, // the message that the user sends
       ],
     });
     res.status(200).json({ text: response.data.choices[0].message.content });
   } catch (error) {
     console.error("error", error);
     res.status(500).json({ error: error.message });
   }
});

export default router;