const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const fitbitTokenRoute = require('./fitbitToken.route');
const notificationRoute = require('./notification.route');
const companyRoute = require('./company.route');
const documentRoute = require('./document.route');
const contactRoute = require('./contact.route');
const docsRoute = require('./docs.route');
const ratingRoute = require('./rating.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/fitbit',
    route: fitbitTokenRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
  {
    path: '/companies',
    route: companyRoute,
  },
  {
    path: '/document',
    route: documentRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path: '/rating',
    route: ratingRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Enable this code in production mode to hide swager
/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

// comment this code in production mode
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
