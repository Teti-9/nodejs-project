import express from 'express'
import exerciciosApi from './routes/exerciciosApi.js'
import volumeApi from './routes/volumeApi.js'
import progressaoApi from './routes/progressaoApi.js'
import authApi from './routes/authApi.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Node.js API Projects!')
})

app.use('/api', authApi)
app.use('/api', authMiddleware, exerciciosApi)
app.use('/api', authMiddleware, volumeApi)
app.use('/api', authMiddleware, progressaoApi)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})