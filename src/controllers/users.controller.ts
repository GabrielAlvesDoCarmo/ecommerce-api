import {NextFunction, Request, Response} from 'express';
import {getFirestore} from "firebase-admin/firestore";
import {ValidationError} from "../errors/validation.error";
import {NotFoundError} from "../errors/not-found.error";

type User = {
    id: number;
    name: string;
    email: string;
};

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let snapshot = await getFirestore().collection('users').get();
            const users = snapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()};
            })
            res.send(users)
        }catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            let userId: string = req.params.id;
            const doc = await getFirestore().collection('users').doc(userId).get();
            if (doc.exists){
                res.send({id: doc.id, ...doc.data()})
            }else {
                throw new NotFoundError("Usuario não encontrado")
            }
        }catch (error) {
            next(error);
        }
    }

    static change(req: Request, res: Response, next: NextFunction){
        try {
            let userId: string = req.params.id;
            let user = req.body as User;
            getFirestore().collection('users').doc(userId).set({
                name: user.name,
                email: user.email
            });
            res.send({
                message: `usuario alterado ${user.name}`
            });
        }catch (error) {
            next(error);
        }
    }

    static async save(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
          let user = req.body;
          if (!user.email || user.email.length === 0) {
              throw new ValidationError("Email obrigatorio   !")
          }
          const userSave = await getFirestore().collection('users').add(user)
          res.status(201).send({
              message: `Usuario ${userSave.id}criado com sucesso`
          });
      }catch (error) {
          next(error);
      }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            let userId: string = req.params.id;
            getFirestore().collection('users').doc(userId).delete();
            res.status(204).end();
        }catch (error) {
            next(error);
        }
    }
}