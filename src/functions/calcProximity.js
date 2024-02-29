import data from "../data/data.json";

function totalMatches(target, option) {
    let matches = 0;
    let misses = 0;
    let separation = 0;

    let nextMatchIndex = 0;

    for (let i = 0; i < target.length; i++) {
        let found = false;

        const jIndex = Math.max(i, nextMatchIndex);

        for (let j = jIndex; j < option.length; j++) {
            if (target.charAt(i) === option.charAt(j)) {
                matches++;
                separation += j - (nextMatchIndex || j);
                nextMatchIndex = j + 1;
                found = true;
                break;
            }
        }

        if (!found) misses++;
    }

    return { matches, misses, separation };
}

function similarity(target, option) {
    if (target.length === 0 && option.length === 0) return 1.0;

    const { matches, misses, separation } = totalMatches(target, option);

    return matches / parseFloat(option.length + misses * 6 + separation * 3);
}

function calcProximity(target) {
    if (!target) return [];

    const simpleTarget = target
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const proximitys = data.map((d) => ({
        ...d,
        proximity: similarity(simpleTarget, d.simplified),
    }));

    proximitys.sort((a, b) => b.proximity - a.proximity);

    const bestOptions = proximitys.filter(
        // pega os melhores resultados (os com pelo menos 20% da maior porcentagem),
        // respeitando PELO MENOS 6 resultados e NO MÁXIMO 15, independente da porcentagem
        (opt, i, a) => (opt.proximity >= a[0].proximity * 0.2 || i < 6) && i < 15
    );

    return bestOptions;
}

export default calcProximity;
