'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

let userService;
// Stubbed modules:
let userModelStub = jasmine.createSpyObj('User', [
    'findAndCountAll',
    'findOne',
    'save',
    'update',
    'destroy',
]);
let modelsStub = {
    User: userModelStub
};

// Require the service with our stubbed out modules
beforeEach(() => {
    userService = proxyquire('./user.service', {
        '../../sqldb': modelsStub,
    });
});

describe('User Service', () => {

    describe('getAll method', () => {

        it('should have called findAndCountAll', () => {
            userService.getAll();

            expect(userModelStub.findAndCountAll).toHaveBeenCalled();
        });

    });

});
