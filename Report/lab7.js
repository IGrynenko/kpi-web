const baseUrl = 'http://localhost:3010/api';
const programsUrl = '/programs'

const genres = {
    1: '4EB8480D-189A-4CE6-B0FB-15DD3AB3D7A1',
    2: 'FED9F2C2-EB15-435A-BCC7-455E74B8CE9F',
    3: '91C74DB1-11A3-488B-A327-6DE4DCF54868',
    4: '38E0232A-7C49-4CC4-8D14-FE9D427761C9'
};

const audience = {
    1: 'F1A24608-83B0-4E01-AAB8-0000B8A01068',
    2: 'E6D0CBB2-C1A6-4197-B8E7-24177E1B58F2',
    3: '895640AF-AAC8-4C71-97D9-30EA8AD37788',
    4: 'AC45596F-3A5E-47B1-9BA1-D3D6D6658999'
};

const languages = {
    1: 'D3C2A55A-A544-42B4-8A29-D5E2603DA15F',
    2: 'A3BC99A5-002A-4B1C-B81B-EE7772AF9208'
};

async function getAllPrograms() {

    return await makeRequest(baseUrl + programsUrl);
}

async function getProgram(id) {

    return await makeRequest(`${baseUrl}${programsUrl}/${id}`)
}

async function makeRequest(url, body) {

    let init = {
        method: body ? 'POST' : 'GET',
    };

    if (body) {
        init = { 
            ...init,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    return fetch(url, init);
}

async function createProgram(title, descr, genreValue, audienceValue, languageValue, duration) {

    const program = new Program(
        title,
        descr,
        genres[genreValue],
        audience[audienceValue],
        languages[languageValue],
        duration
    );

    return await makeRequest(baseUrl + programsUrl, program);
}

export { getAllPrograms, getProgram, createProgram };


class Program {
    constructor(title, descr, genre, audience, language, duration) {
        this.title = title;
        this.descr = descr;
        this.genre = genre;
        this.audience = audience;
        this.language = language;
        this.duration = duration;
    }
}