import { openDB } from '../../config/sqlite';
import { log } from '../../utils/log';

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

const queryDB = async (queryString) => {

    log.INFO(queryString);

    const db = await openDB();

    let status = OK;
    let result = null;

    try {
        const result = await db.all(queryString);
        status = OK;
        result = result;
    } catch (error) {
        status = INTERNAL_SERVER_ERROR;
        result = error;
    }
    return { status, result };
}

const httpGet = async (method, queryString) => (method === 'GET') ? await queryDB(queryString) : null;
const httpPost = async (method, queryString) => (method === 'POST') ? await queryDB(queryString) : null;

export {
    httpGet,
    httpPost
};