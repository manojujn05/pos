import { AuthService } from "../services/auth.service";
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authenticateToken(req : Request, res: Response , next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); 
  try {
      const decoded = AuthService.verifyToken(token);
      req.user = decoded; 
      next();
  } catch (error) {
      return res.sendStatus(403);  
  }
}

function authorize(role: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); 
    try {
      const decoded: any = AuthService.verifyToken(token);
      console.log(decoded.role_id);
      if (decoded.role_id === role) {
        next(); 
      } else {
        res.status(403).json({ error: 'Unauthorized' }); 
      }
    } catch (error) {
      return res.sendStatus(403); 
    }
  };
}
export { authenticateToken , authorize};