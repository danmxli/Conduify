interface BotEvaluation {
    [key: string]: Array<string>
}

export function parseResponse(input: String): any {
    const evaluation: BotEvaluation = {};

    // double line break indicates section
    const sections = input.split('\n\n');


    for (const section of sections) {
    
        const lines = section.split('\n');

        // first line is key
        const key = lines[0].replace(':', '');

        // Add to the evaluation object
        const values = lines.slice(1).map(value => value.trim());
        evaluation[key] = values;
    }

    return evaluation;
}