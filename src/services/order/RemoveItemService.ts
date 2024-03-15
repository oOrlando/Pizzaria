import prismaClient from "../../prisma";

interface ItemResquest{
    item_id: string
}

class RemoveItemService{
    async execute({item_id}: ItemResquest){
        const order = await prismaClient.item.delete({
            where:{
                id:item_id
            }
        })

        return order;

    }
}

export {RemoveItemService}