import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthService {
  private static readonly JWT_SECRET: string = 'your_secret_key'; 
  
  static generateToken(role_id : number ,email : string , mobile: string | null, first_name: string, last_name: string): string {
   
    return jwt.sign({
      role_id: role_id,
      email: email,
      mobile: mobile,
      name: `${first_name} ${last_name}`
    }, AuthService.JWT_SECRET, { expiresIn: '1h' });
  }

  static async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static verifyToken(token: string): string | object {
    return jwt.verify(token, AuthService.JWT_SECRET);
  }

}
