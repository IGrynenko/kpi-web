const config = require('./config.json');
const sql = require('mssql');
const guid = require('uuid');
const datetime = require('node-datetime');

async function getAllPrograms() {

    try {
        const pool = await sql.connect(config.db);
        const program = await pool.request()
            .query('select * from Programs where IsActive = 1');
        
        return program.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getProgram(title) {
    
    try {
        if (title) {
            const pool = await sql.connect(config.db);
            const program = await pool.request()
                .input('title_parameter', sql.NVarChar, title)
                .query('select * from Programs where Title = @title_parameter and IsActive = 1');
            
            return program.recordsets;
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function createProgram(program) {

    try {
        if (program) {

            const pool = await sql.connect(config.db);
            await pool.request()
                .input('id', sql.UniqueIdentifier, guid.v4())
                .input('title', sql.NVarChar, program.title)
                .input('description', sql.NVarChar, program.descr)
                .input('genre', sql.UniqueIdentifier, program.genre)
                .input('audience', sql.UniqueIdentifier, program.audience)
                .input('language', sql.UniqueIdentifier, program.language)
                .input('duration', sql.Decimal, Number.parseFloat(program.duration) ?? 0)
                .input('isActive', sql.Bit, 1)
                .input('created', sql.DateTime, new Date())
                .query('insert into Programs values(@id, @title, @description, @genre, @audience, @language, @duration, @isActive, @created)');
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function updateProgram(program) {
    
    try {
        if (program) {

            const pool = await sql.connect(config.db);
            const genreQuery = await pool.request()
                .input('id_parameter', sql.UniqueIdentifier, program.Genre)
                .query('select * from Genres where Id = @id_parameter');
            const audienceQuery = await pool.request()
                .input('id_parameter', sql.UniqueIdentifier, program.Audience)
                .query('select * from Audience where Id = @id_parameter');
            const languageQuery = await pool.request()
                .input('id_parameter', sql.UniqueIdentifier, program.Language)
                .query('select * from Languages where Id = @id_parameter');

            const genre = genreQuery.recordsets[0][0];
            const audience = id_parameter.recordsets[0][0];
            const language = languageQuery.recordsets[0][0];
            
            await pool.request()
                .input('id_parameter', sql.UniqueIdentifier, program.Id)
                .input('title_parameter', sql.NVarChar, program.Title)
                .input('description_parameter', sql.NVarChar, program.Description)
                .input('genre_parameter', sql.UniqueIdentifier, genre.Id)
                .input('audience_parameter', sql.UniqueIdentifier, audience.Id)
                .input('language_parameter', sql.UniqueIdentifier, language.Id)
                .input('duration_parameter', sql.Decimal, program.Duration)
                .input('isActive_parameter', sql.Bit, program.IsActive)
                .input('created_parameter', sql.DateTime, program.Created)
                .query(`update Programs set Title=@title_parameter, Description=@description_parameter, Genre=@genre_parameter,
                        Audience=@audience_parameter, Language=@language_parameter, Duration=@duration_parameter,
                        IsActive=@isActive_parameter, Created=@created_parameter 
                        where Id=@id_parameter`);
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllPrograms: getAllPrograms,
    getProgram: getProgram,
    updateProgram: updateProgram,
    createProgram: createProgram
}