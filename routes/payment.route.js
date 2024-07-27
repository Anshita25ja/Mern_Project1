import { Router } from 'express';


import { allPayments, buySubscription, getRazorpayApiKey, verifySubscription } from '../controller/payment.controller.js';
import { authorizeRoles, isloggedIn } from '../middleware/jwtAuth.js';

const router = Router();

router.post('/subscribe',isloggedIn, buySubscription);
router.post('/verify',isloggedIn, verifySubscription);
router.post('/unsubscribe',isloggedIn, authorizeSubscribers, cancelSubscription);
router.get('/razorpay-key',isloggedIn, getRazorpayApiKey);
router.get("/",isloggedIn, authorizeRoles('ADMIN'), allPayments);

export default router;
