import jwt from 'jsonwebtoken';

// Middleware to authenticate user by verifying his/her jwt-token.
export const auth = async (req: any, res: any, next: any) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1]; //Access token

    jwt.verify(token, "access", async (err: any, user: any) => {
        if (user) {
            req.user = user;
            next();
        } else if (err.message === "jwt expired") {
            return res.status(401).json({
                success: false,
                message: "Access token expired"
            });
        } else {
            console.log(err);
            return res
                .status(403)
                .json({ err, message: "User not authenticated" });
        }
    });
}