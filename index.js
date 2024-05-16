import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
require('dotenv').config();

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());



const configuration = new Configuration({
  // organization: 'org-DfbUX36AckA7eMIGO51WbAXj',
  apiKey:process.env.OPEN_AI_API_KEY ,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are Ai Dermatologist. You can help people with skin problems and give natural solutions and you are not supposed to give any other answer except related to skin",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
