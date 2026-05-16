import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import produtoRoutes from './routes/produto.routes'
import categoriaRoutes from './routes/categoria.routes'
import propostaRoutes from './routes/proposta.routes'
import adminRoutes from './routes/admin.routes'
import { info } from './lib/logger'




dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

const allowedOrigins = [
  'http://localhost:5173',
  'https://garimpei-gamma.vercel.app'
]

app.use(cors({
  origin: (origin, callback) => {
    const allowed = allowedOrigins.includes(origin || '')
    callback(null, allowed)
  },
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)

app.use('/produtos', produtoRoutes)
app.use('/categorias', categoriaRoutes)
app.use('/propostas', propostaRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' })
})

app.listen(PORT, () => {
  info(`Servidor rodando na porta ${PORT}`)
})