import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import  config from '../config';
import StudentModel from "../models/student/student.model";
import adminModel from '../models/admin.model';

const getSecret = async (req: Request, res: Response) => {
  const token = req['headers'] && (req['headers']['X-ACCESS-TOKEN'] || req['headers']['authorization']) ? (req['headers']['X-ACCESS-TOKEN'] || req['headers']['authorization']) : null;
  if(token) {
    const decoded = verify(token.toString(), config.JWT_SECRET) as {_id:String, type: string, iat:Number, exp: Number, time: any};
    if(decoded && decoded['_id'] && typeof decoded['_id'] === 'string') {
      let isAdmin = !!(decoded.type == 'admin');
      let model = isAdmin ? adminModel : StudentModel;
      try {
        const studentDetails: any = await model.findOne({_id:decoded['_id'],lastLoggedIn: decoded['time']});
       console.log(studentDetails);
        if(studentDetails) {
          if(isAdmin) {
            return Promise.resolve(decoded['_id']);
          }
          if(studentDetails && studentDetails['isActive']) {
            return Promise.resolve(decoded['_id']);
          }
          return Promise.reject(null);
        }else {
          return Promise.reject(null);
        }
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }else {
      return Promise.reject(null);
    }
  }
}
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secret = await getSecret(req,res);
    req['tokenId'] = secret;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);    
  }
}
