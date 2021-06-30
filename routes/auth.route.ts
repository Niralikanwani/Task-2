import express from 'express';
import {Login,Refresh,Protected} from '../controllers/auth.controller';
import {Create,Read,Update,Delete} from '../controllers/service.controller';
import {auth} from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', Login);
router.post('/refresh', Refresh);
router.post('/protected',auth, Protected);

router.post('/create',auth, Create);
router.post('/read',auth, Read);
router.post('/update',auth, Update);
router.post('/delete',auth, Delete);

export default router;