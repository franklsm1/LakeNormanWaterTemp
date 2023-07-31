import axios from 'axios';
import { schedule } from '@netlify/functions'

const BUILD_HOOK = 'https://api.netlify.com/build_hooks/64c79195d9ea9602dcf62dc3'

// Schedules the app to rebuild every 15 minutes to update the temp
const handler = schedule('*/15 * * * *', async () => {
    await axios.post(BUILD_HOOK).then(response => {
        console.log('Build hook response:', response)
    })

    return {
        statusCode: 200
    }
})

export { handler }
