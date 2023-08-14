import { httpGet } from '../baseHttp';

const getRole = async (req, res) => {

    const queryString = `
        SELECT * 
        FROM UserRole
    `;

    const { status, result } = await httpGet(req.method, queryString);

    res.status(status).json(result);
}

export default getRole;