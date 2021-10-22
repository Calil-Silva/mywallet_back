import connection from "../database/database.js";

async function logoutUser (req, res) {
    const token = req.header("authorization");

    try {
        const userToken = await connection.query("SELECT token FROM logged_users WHERE token = $1", [token])
        if(userToken.rowCount > 0) {
            await connection.query("DELETE FROM logged_users WHERE token = $1;", [token]);
            return res.sendStatus(200);
        } 
        res.sendStatus(401);
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    logoutUser
}