import {app} from './client/js/app';

describe('Test, the function app() should exist', ()=>{
    test('It should return true', ()=>{
        expect(app).toBeDefined();
    });
});

describe('Test, the function app() should be a function', ()=>{
    test('It should be a function', ()=>{
        expect(typeof app).toBe('function');
    });
});
