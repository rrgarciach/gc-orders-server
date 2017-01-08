'use strict';

const proxyquire = require('proxyquire').noPreserveCache();

let userCtrl;
// Stubbed modules:
let userServiceStub = jasmine.createSpyObj('userService', [
    'getAll',
    'getByUuid',
    'create',
    'update',
    'softDeleteByUuid',
]);

// Require controller with our stubbed out modules
beforeEach(() => {
    userCtrl = proxyquire('./user.controller', {
        './user.service': userServiceStub,
    });
});

describe('User Controller', () => {

    describe('index method', () => {

        xit('should have called User Service getAll', () => {
            userCtrl.index();

            expect(userServiceStub.getAll).toHaveBeenCalled();
        });

    });

    describe('show method', () => {

        xit('should have called User Service getByUuid', () => {
            userCtrl.show();

            expect(userServiceStub.getByUuid).toHaveBeenCalled();
        });

    });

    describe('create method', () => {

        xit('should have called User Service create', () => {
            userCtrl.create();

            expect(userServiceStub.create).toHaveBeenCalled();
        });

    });

    describe('update method', () => {

        xit('should have called User Service update', () => {
            userCtrl.update();

            expect(userServiceStub.update).toHaveBeenCalled();
        });

    });

    describe('destroy method', () => {

        xit('should have called User Service softDeleteByUuid', () => {
            userCtrl.destroy();

            expect(userServiceStub.softDeleteByUuid).toHaveBeenCalled();
        });

    });

});
