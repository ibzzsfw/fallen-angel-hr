import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import { db } from '../../config/db';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {

    const secretKey = 'secretOrPrivateKey is a string, buffer, or object containing either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA. In case of a private key with passphrase an object { key, passphrase } can be used (based on crypto documentation), in this case be sure you pass the algorithm option.'
    let email = req.body.email
    let password = req.body.password
    if (req.method == "POST") {
        let result = await db.query('SELECT employeeID, firstName, lastName, email, passwordHash, roleID FROM Information WHERE email = ?', [email])
        result = JSON.parse(JSON.stringify(result))

        if (result.length <= 0) {
            res.send("Email not found")
        }
        else {
            if (result[0].passwordHash == password) {
                let token = jwt.sign({
                    employeeid: result[0].employeeID,
                    firstname: result[0].firstName,
                    lastname: result[0].lastName,
                    email: result[0].email,
                    roleid: result[0].roleID
                }, secretKey, {
                    expiresIn: '6h'
                })
                res.json({
                    employeeid: result[0].employeeID,
                    firstname: result[0].firstName,
                    lastname: result[0].lastName,
                    email: result[0].email,
                    roleid: result[0].roleID,
                    token: token,
                })
            }
            else {
                res.send("Wrong Password")
            }
        }
    }
}