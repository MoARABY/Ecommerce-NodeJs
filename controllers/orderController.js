const orderModel = require('../models/orderModel');

const createOrder= async (req, res) => {
    try {
        const newOrder = await orderModel.create(req.body);
        newOrder ? res.status(200).json(newOrder) : res.status(400).json({msg:"Cannot create order"})
    } catch (err) {
        res.status(500).json(err);
    }
}

  //UPDATE
const updateOrder= async (req, res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        updatedOrder ? res.status(200).json(updatedOrder) : res.status(400).json({msg:"Cannot update order"})
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteOrder= async (req, res) => {
    try {
        const deletedOrder= await orderModel.findByIdAndDelete(req.params.id);
        deletedOrder ? res.status(200).json({deletedOrder,msg:"order has been deleted"}) : res.status(400).json({msg:"Cannot delete cart"})
    } catch (err) {
        res.status(500).json(err);
    }
}


const showOrder= async (req, res) => {
    try {
        const Order = await orderModel.findOne({ userId: req.params.userId });
        Order ? res.status(200).json(Order) : res.status(400).json({msg:"Cannot find order"})
    } catch (err) {
        res.status(500).json(err);
    }
};

const showOrders= async (req, res) => {
    try {
        const Orders = await orderModel.find();
        Orders ? res.status(200).json(Orders) : res.status(400).json({msg:"Cannot find orders"})
    } catch (err) {
        res.status(500).json(err);
    }
}

// get monthly income

const monthlyIncome= async (req, res) => {
    try {
        const date=new Date()
        const lastMonth=new Date(date.setMonth(date.getMonth()-1))
        const previousMonth=new Date(date.setMonth(lastMonth.getMonth()-1))
        const lastMonthIncome= await orderModel.aggregate([
            { 
                $match: { createdAt: { $gte: previousMonth } } 
            },
            {
                $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
            },
            {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
            },
        ]);
        lastMonthIncome ? res.status(200).json(lastMonthIncome) : res.status(404).json("cannot find")
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports = {createOrder,updateOrder,deleteOrder,showOrder,showOrders,monthlyIncome}