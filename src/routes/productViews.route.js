import { Router } from "express";
import { productView } from '../controllers/product.controller.js';

const router = Router();

router.get('/', productView);

export default router