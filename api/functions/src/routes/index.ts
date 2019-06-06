const express = require('express');
const router = express.Router();

import routerMovies from './movies';

router.use('/movies', routerMovies);

export default router;
