import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import equipamentoRoutes from './src/routes/equipamentoRoutes.js'
import cidadeRoutes from './src/routes/cidadeRoutes.js'
import servicoRoutes from './src/routes/servicoRoutes.js'
import funcionarioRoutes from './src/routes/funcionarioRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/equipamentos', equipamentoRoutes)
app.use('/cidades', cidadeRoutes)
app.use('/servicos', servicoRoutes)
app.use('/funcionarios', funcionarioRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})