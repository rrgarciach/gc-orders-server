'use strict';

const proxyquire = require('proxyquire').noPreserveCache();

let userIndex;
// Stubbed modules:
let routerStub = jasmine.createSpyObj('router', ['get', 'post', 'put', 'delete']);
let userCtrlStub = jasmine.createSpyObj('controller', ['index', 'show', 'create', 'update', 'destroy']);
let authServiceStub = jasmine.createSpyObj('Auth', ['isAuthenticated']);


// Require the index with our stubbed out modules
beforeEach(() => {
    userIndex = proxyquire('./index', {
        'express': {
            Router() {
                return routerStub;
            }
        },
        './user.controller': userCtrlStub,
        '../../auth/auth.service': authServiceStub,
    });
});

describe('User API Router', () => {

    describe('GET /api/v1/users', () => {

        it('should return an express router instance', () => {
            expect(userIndex).toBe(routerStub);
        });

    });

    describe('GET /api/v1/users', () => {

        it('should verify authentication and route to user.controller.index', () => {
            expect(routerStub.get).toHaveBeenCalledWith('/', authServiceStub.isAuthenticated, userCtrlStub.index);
        });

    });

    describe('GET /api/v1/users/:uuid', () => {

        it('should verify authentication and route to user.controller.show', () =>{
            expect(routerStub.get).toHaveBeenCalledWith('/:uuid', authServiceStub.isAuthenticated, userCtrlStub.show);
        });

    });

    describe('POST /api/v1/users', () => {

        it('should verify authentication and route to user.controller.create', () => {
            expect(routerStub.post).toHaveBeenCalledWith('/', authServiceStub.isAuthenticated, userCtrlStub.create);
        });

    });

    describe('PUT /api/v1/users/:uuid', () => {

        it('should verify authentication and route to user.controller.update', () => {
            expect(routerStub.put).toHaveBeenCalledWith('/:uuid', authServiceStub.isAuthenticated, userCtrlStub.update);
        });

    });

    describe('POST /api/v1/users/:uuid/delete', () => {

        it('should verify authentication and route to user.controller.destroy', () => {
            expect(routerStub.post).toHaveBeenCalledWith('/:uuid/delete', authServiceStub.isAuthenticated, userCtrlStub.destroy);
        });

    });

});
