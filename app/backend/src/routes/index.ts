import { Router } from 'express';

import teamsRouter from './teams.route';
import usersRouter from './users.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);

export default router;
