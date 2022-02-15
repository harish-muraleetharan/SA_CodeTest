const express = require("express");
const FruitService = require("./fruit-service");

class FruitRoutes {
  /**
   * Setups the routes for fruit related REST api calls
   */
  	static setup(root) {
		const fruitRouter = express.Router();
		/**
		 * TODO-2 - need to expose an api that allows a caller to get a list of all fruits in the system
		 *  @requirements use the @FruitService methods to interact with the fruit inventory
		 *  @notes remember all methods are @see async on the FruitService
		 */
		fruitRouter.get("/fruits", function (req, res, next) {
			FruitService.getAllFruits()
				.then((Fruits) => {
					res.send(Fruits);
				})
				.catch(err => next(err));
		});
		/**
		 * TODO-3 - need to expose an api that allows a caller to get a specific fruit in the system
		 *  @requirements use the @FruitService methods to interact with the fruit inventory
		 *  @requirements take consideration when fruit does not exist
		 *  @notes remember all methods are @see async on the FruitService
		 */
		fruitRouter.get("/fruits/:name", function (req, res, next) {
			const fruitName = req.params.name;
			const fruitNameUcase = fruitName.charAt(0).toUpperCase() + fruitName.slice(1);
			FruitService.getFruit(fruitNameUcase)
			.then((Fruit) => {
				res.send(Fruit);
			})
			.catch(err => next(err));
		});
		root.use(fruitRouter);
	}
}

module.exports = FruitRoutes;
