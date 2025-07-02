import express from 'express'
import prisma from '../prismaClient.js'
import capitalize from '../utils/capitalize.js'

const router = express.Router()

router.get('/volume', async (req, res) => {
    try {
    
        const volume = await prisma.exercicio.groupBy({
        by: ['musculo', 'musculo_residual'],
        where: {
            userId: req.userId
        },
        _sum: {
            series: true,
        }
    })
        
        if (volume.length < 1) {
            return res.status(404).json({ 
                success: false,
                message: "Nenhum volume encontrado." })
        }

        const response = volume.map(item => ({
            musculo: item.musculo,
            series: item._sum.series,
            musculo_residual: item.musculo_residual,
            series_residual: item._sum.series / 2
        }))

        if (response[0].musculo_residual === 'Nenhum') {
            response[0].series_residual = 0
        }
    
        res.json({
            success: true,
            data: response})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ 
            success: false,
            message: "Erro ao buscar volume." })
    }
})

router.get('/volume/:musculo', async (req, res) => {
    const { musculo } = req.params

    const musculoFormatado = capitalize(musculo)

    try {
    
        const volume = await prisma.exercicio.groupBy({
        by: ['musculo', 'musculo_residual'],
        where: {
            musculo: {
                equals: musculoFormatado,
            },
            userId: req.userId
        },
        _sum: {
            series: true,
        }
    })
        
        if (volume.length < 1) {
            return res.status(404).json({ 
                success: false,
                message: `Nenhum volume encontrado para o músculo: ${musculo}` })
        }

        const response = volume.map(item => ({
            musculo: item.musculo,
            series: item._sum.series,
            musculo_residual: item.musculo_residual,
            series_residual: item._sum.series / 2
        }))

        if (response[0].musculo_residual === 'Nenhum') {
            response[0].series_residual = 0
        }
    
        res.json({
            success: true,
            data: response})

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Erro ao buscar volume." 
        })
    }
})

export default router