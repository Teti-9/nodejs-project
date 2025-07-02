import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/registrar', async (req, res) => {
    const { email, senha } = req.body

    const senhaHashed = bcrypt.hashSync(senha, 8)

    try {

        const user = await prisma.user.create({
            data: {
                email,
                senha: senhaHashed
            }
        })

        res.json({ message: "Usuário registrado com sucesso" })

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                success: false,
                message: "Email já cadastrado."
            })
        }
        return res.sendStatus(503)
    }
})

router.post('/logar', async (req, res) => {
    const { email, senha } = req.body

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        const senhaValida = bcrypt.compareSync(senha, user.senha)

        if (!senhaValida) {
            return res.status(401).send({ message: "Senha inválida" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })

    } catch (error) {
        if (error.message === "Cannot read properties of null (reading 'senha')") {
            return res.status(404).json({ 
                success: false,
                message: "Email não encontrado."
            })
        }
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Erro ao logar usuário."

        })
    }
})

export default router