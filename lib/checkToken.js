import jwt from 'jsonwebtoken'

const checkToken = (token) => {
    try {
        let result = jwt.verify(token, 'REPLACE_YOUR_TOKEN_HERE')
        return result
    }
    catch (e) {
        return false
    }
}

export default checkToken