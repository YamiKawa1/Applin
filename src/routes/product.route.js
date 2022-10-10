import { Router } from "express";
import { getProducts, saveFileData } from '../controllers/product.controller.js'

const router = Router();

router.get('/', getProducts);

router.post('/', saveFileData);

export default router