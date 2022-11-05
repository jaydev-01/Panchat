module.exports = app => {
    const UserController = require("../controller/user.controller")
    const middleware = require("../helpers/jwt");
    const router = require('express').Router();

    router.post('/sign-up',UserController.signup);
    router.post('/login', UserController.login);
    router.post('/upload-image', UserController.uploadImage);
    router.post('/save-image',middleware, UserController.saveImage);
    router.post('/send-email',UserController.validateEmailAndSendResetLink);
    router.post('/reset-password', UserController.UpdatePassword);

    // profile
    router.get('/get-user-detail', middleware, UserController.getUserDetail);
    router.post('/update-profile', middleware, UserController.updateProfile);

    app.use('/api/panchat/', router);
}