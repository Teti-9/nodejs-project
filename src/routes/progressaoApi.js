import express from 'express'
import prisma from '../prismaClient.js'
import calcularProgressao from '../utils/prog.js'
import capitalize from '../utils/capitalize.js'

const router = express.Router()

router.get('/progressao/:exercicio', async (req, res) => {
    const { exercicio } = req.params

    const exercicioFormatado = capitalize(exercicio)

    try {

        const progressao = await prisma.exercicio.findFirstOrThrow({
            where: {
                nome: {
                    contains: exercicioFormatado
                },
                userId: req.userId
                
            }
        })

        const opcoes = {
            1: "Você progrediu tanto carga quanto repetições.",
            2: "Você progrediu se mantendo nas mesmas repetições para uma carga maior.",
            3: "Você ainda está progredindo repetições para essa carga, devendo chegar ao mesmo número de repetições que atingiu anteriormente para ser considerado uma progressão.",
            4: "Você se manteve na mesma carga para as mesmas repetições, mas talvez tenha progredido em técnica ou execução.",
            5: "Não há dados suficientes para determinar se houve progressão ou não.",
            6: "Você progrediu aumentando as repetições para a mesma carga.",
            7: "Você regrediu em repetições comparado a última atualização para a mesma carga.",
            8: "Você não progrediu no quesito carga, mas talvez tenha progredido em técnica/execução ou repetições."
        }

        const calculo = calcularProgressao(progressao)
        const resultado = opcoes[calculo]

        res.json({
            success: true,
            data: resultado
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
            message: "Erro ao calcular progressão do exercício."

        })
    }

})

export default router