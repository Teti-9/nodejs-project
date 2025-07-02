function musculoResidual(musculo) {
    const musculos = {
        'Peito': 'Tríceps',
        'Costas': 'Bíceps',
        'Ombros': 'Trapézio',
        'Pernas': 'Glúteos',
        'Glúteos': 'Pernas',
        'Bíceps': 'Antebraços'
    };

    return musculos[musculo] || 'Nenhum';
}

export default musculoResidual