import { apiServices } from '../service/api.services';
import { Request, Response } from 'express';


const getAllPhones = async (req: Request, res: Response) => {
    const phones = await apiServices.getAllPhones();
    res.send(phones);
};

const getPhone = async (req: Request, res: Response) => {
    const { phoneId } = req.params;
    const phone = await apiServices.getPhone(phoneId);

    if (!phone) {
        res.sendStatus(404);
        return;
    }
    res.send(phone);
};

export const apiController = {
    getAllPhones,
    getPhone,
};