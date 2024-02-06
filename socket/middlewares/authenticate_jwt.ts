import { Request, Response, NextFunction } from 'express';

function checkTokenValidity(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization || '';


    if (tokenIsValid(token)) {
        next(); 
    } else {
        res.status(401).json({ message: 'Session has expired. Please login again.' });
    }
}

function tokenIsValid(token: string): boolean {

    return true;
}

export default checkTokenValidity;