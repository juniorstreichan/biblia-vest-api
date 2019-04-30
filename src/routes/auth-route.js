import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/create', AuthController.store);

router.post('/', async (req, res) => res.status(401).send());

export default router;
