import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrdersController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string
        const datailOrdersService = new DetailOrderService();

        const orders = await datailOrdersService.execute({
            order_id
        })

        return res.json(orders)

    }
}

export { DetailOrdersController}