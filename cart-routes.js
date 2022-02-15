const express = require("express");
const CartService = require("./cart-service");

class CartRoutes {
  	static setup(root) {
		const cartRouter = express.Router();

		cartRouter.post("/items", (req, res, next)=> {
			const itemsincart = req.body.cart;
			console.log("itemsincart ", itemsincart);
			CartService.purchase(itemsincart)
			.then((result) => {
				if (result) {
					res.send("Cart checked out successfully");
				}else{
					res.send("Error in check out");
				}
			})
			.catch(err=>next(err));
		});
    	root.use(cartRouter);
  	}
}
module.exports = CartRoutes;
