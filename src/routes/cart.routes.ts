import { addToCart, getCart, removeFromCart, updateCartAmount} from "@controllers/cart.controller.js";
import { router } from "./router.js";

router.post('/cart', addToCart);
router.get('/cart/:userId', getCart); 
router.delete('/cart/:id', removeFromCart);
router.put('/cart/:id', updateCartAmount);

export default router;
