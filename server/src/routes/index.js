require('dotenv').config()
const { OPENAI_API_KEY } = process.env
const { Router } = require('express')
const OpenAI = require('openai')


const routes = Router()

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
})

routes.post('/ai-assistant', async (req, res)=>{
    try {
        const { threadId, message } = req.body

        if(threadId){

        }else{
            //Response with the new Thread and save it in the front to the next peticion.
            const thread = await openai.beta.threads.create();
            const message = await openai.beta.threads.messages.create(
                thread.id,
                {
                    role: 'user',
                    content: "Necesito evaluar a un candidato"
                }
            )
            const run  = await openai.beta.threads.runs.createAndPoll(
                thread.id,
                {
                    assistant_id: 'asst_UkYq6uZ7PwcOXPNWn83z2IAC',
                    instructions: 'Please address the user as User. The user has a premium account.'
                }
            )
            if (run.status === 'completed') {
                const messages = await openai.beta.threads.messages.list(run.thread_id)
                const lastMessage = await messages.data.reverse()[0].content[0].text.value
                res.status(201).json({messageFromAssistant: lastMessage})
            }
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = routes