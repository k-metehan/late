const Router = require('koa-router');
const router = new Router();

const Ctrl = require('./google.controller');

router.use(Ctrl.googleAuthMiddleware);
router.get('/calendars', Ctrl.listCalendars);
router.post('/calendars', Ctrl.createCalendar);

module.exports = router.routes();
