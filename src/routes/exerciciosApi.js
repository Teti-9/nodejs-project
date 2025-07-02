import express from 'express'
import prisma from '../prismaClient.js'
import musculoResidual from '../utils/residual.js'
import capitalize from '../utils/capitalize.js'

const router = express.Router()

router.get('/exercicios', async (req, res) => {
    const exercicios = await prisma.exercicio.findMany({
        orderBy: {
            id: 'asc'
        },
        where: {
            userId: req.userId
        }
    })

    if (exercicios.length < 1) {
        return res.status(404).json({ 
            success: false,
            message: "Nenhum exercício encontrado."

        })}

    res.json({
        success: true,
        data: exercicios
    })
})

router.get('/exercicios/:nome', async (req, res) => {
    const { nome } = req.params

    try {

        const exercicio = await prisma.exercicio.findFirstOrThrow({
            where: {
                nome: {
                    contains: nome
                },
                userId: req.userId
            }
        })

        res.json({
            success: true,
            data: exercicio
        })

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: "Exercício não encontrado."
            })
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar exercício."

        })
    }
})

router.post('/exercicios', async (req, res) => {

    try {

        const exercicioFormatado = {
            ...req.body,
            nome: capitalize(req.body.nome),
            musculo: capitalize(req.body.musculo),
            userId: req.userId
        }

        exercicioFormatado.musculo_residual = musculoResidual(exercicioFormatado.musculo)

        const exercicioCriado = await prisma.exercicio.create({
            data: exercicioFormatado
        })

        res.status(201).json({
            success: true,
            data: exercicioCriado
        })

    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: "Erro ao criar exercício." })
        }
})

router.put('/exercicios/:id', async (req, res) => {
    const { id } = req.params

    try {

        const exercicioExistente = await prisma.exercicio.findUniqueOrThrow({
            where: {
                id: +id,
                userId: req.userId
            }
        })

        const exercicioAtualizado = await prisma.exercicio.update({
            where: {
                id: +id,
                userId: req.userId
            },
            data: {
                ...req.body,
                nome: capitalize(req.body.nome),
                musculo: capitalize(req.body.musculo),
                carga_anterior: exercicioExistente.carga,
                repeticoes_anterior: exercicioExistente.repeticoes,
                data_anterior: exercicioExistente.data,
                data: new Date()
            }
        })

        exercicioAtualizado.musculo_residual = musculoResidual(exercicioAtualizado.musculo)

        res.json({
            success: true,
            data: exercicioAtualizado
        })

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: "Exercício não encontrado." })
        } else {
            return res.status(500).json({ 
                success: false,
                message: "Erro ao editar exercício." })}
        }
})

router.delete('/exercicios/:id', async (req, res) => {
    const { id } = req.params

    try {

        await prisma.exercicio.delete({
            where: {
                id: +id,
                userId: req.userId
            }
        })

        return res.json({
            success: true, 
            message: "Exercício deletado." 
        })
        
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: "Exercício não encontrado."
            })
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar exercício."

        })
    }
})

export default router