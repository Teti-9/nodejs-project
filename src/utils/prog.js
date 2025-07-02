function calcularProgressao(exercicio) {
    const repeticoes = exercicio.repeticoes
    const repeticoes_anterior = exercicio.repeticoes_anterior
    const carga = exercicio.carga
    const carga_anterior = exercicio.carga_anterior

    if ([repeticoes, repeticoes_anterior, carga, carga_anterior].some(val => val === null || val === undefined)) {
        return 5;
    }

    if (repeticoes_anterior === 0 || carga_anterior === 0) {
        return 5;
    }

    if (carga > carga_anterior) {
        if (repeticoes > repeticoes_anterior) {
            return 1;
        } else if (repeticoes === repeticoes_anterior) {
            return 2;
        } else {
            return 3;
        }
    } else if (carga === carga_anterior) {
        if (repeticoes > repeticoes_anterior) {
            return 6;
        } else if (repeticoes === repeticoes_anterior) {
            return 4;
        } else {
            return 7;
        }
    } else {
        return 8;
    }
}

export default calcularProgressao