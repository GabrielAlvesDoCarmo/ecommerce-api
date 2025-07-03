import {Request, Response} from 'express';
import {getFirestore} from "firebase-admin/firestore";

type User = {
    id: number;
    name: string;
    email: string;
};

export class UsersController {
    static async getAll(req: Request, res: Response): Promise<void> {
        let snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map((doc) => {
            return {id: doc.id, ...doc.data()};
        })
        res.send(users)
    }

    static async getById(req: Request, res: Response) {
        let userId: string = req.params.id;
        const doc = await getFirestore().collection('users').doc(userId).get();
        res.send({
            id: doc.id,
            ...doc.data()
        })
    }

    static change(req: Request, res: Response){
        let userId: string = req.params.id;
        let user = req.body as User;
        getFirestore().collection('users').doc(userId).set({
            name: user.name,
            email: user.email
        });
        res.send({
            message: `usuario alterado ${user.name}`
        });
    }

    static async save(req: Request, res: Response): Promise<void> {
        let user = req.body;
        const userSave = await getFirestore().collection('users').add(user)
        res.send({
            message: `Usuario ${userSave.id}criado com sucesso`
        });
    }

    static delete(req: Request, res: Response): void {
        let userId: string = req.params.id;
        getFirestore().collection('users').doc(userId).delete();
        res.send({
            message: `Usuario ${userId} removido com sucesso`
        });
    }
}