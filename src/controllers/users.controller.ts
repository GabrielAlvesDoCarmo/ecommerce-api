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
        let snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map((doc) => {
            return {id: doc.id, ...doc.data()};
        })
        res.send(users)
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId: string = req.params.id;
        const doc = await getFirestore().collection('users').doc(userId).get();
        if (doc.exists) {
            res.send({id: doc.id, ...doc.data()})
        } else {
            throw new NotFoundError("Usuario não encontrado")
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId: string = req.params.id;
        let user = req.body as User;
        let docRef = getFirestore().collection('users').doc(userId);
        if ((await docRef.get()).exists) {
            await docRef.set({
                name: user.name,
                email: user.email
            });
            res.send({
                message: `usuario alterado ${user.name}`
            });
        } else {
            throw new NotFoundError("Usuario Nao existe")
        }
    }

    static async save(req: Request, res: Response, next: NextFunction): Promise<void> {
        let user = req.body;
        if (!user.email || user.email.length === 0) {
            throw new ValidationError("Email obrigatorio   !")
        }
        const userSave = await getFirestore().collection('users').add(user)
        res.status(201).send({
            message: `Usuario ${userSave.id}criado com sucesso`
        });
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        let userId: string = req.params.id;
        getFirestore().collection('users').doc(userId).delete();
        res.status(204).end();
    }
}