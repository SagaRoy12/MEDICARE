import { verifyToken } from "../jwt/jsonwebtokenValidate.js";

export const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers[`authorization`];
    const token = authorizationHeader.split(" ")[1];  // extract the bearer token

    if (!token) {
        return res.status(401).json({
            message: "Access token required "
        })
    }
    try {
        const decodedToken = verifyToken(token)

        req.user = {     // attaching user data to the request object
            user_id: decodedToken.id,
            user_role: decodedToken.role
        }
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid access token "
        })
    }

}