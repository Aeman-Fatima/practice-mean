const { signup } = require('../controllers/user')
const request = require('supertest')
const app = require('../../app')

const db = require('../database/models')
const User = db.User
beforeAll(() => {
    User.destroy({
        where: { email: "testing@gmail.com" },
        truncate: true
    })
})
afterEach(() => {
    console.log("After each")
})
describe('signup', () => {
    it('should create a user if data is correct', async () => {
        const req = await request(app).post('/user/signup')
            .send({
                name: 'Aeman',
                email: 'testing@gmail.com',
                password: '321'
            })
            .expect(200)

    })

    it('should give error as email is unique', async () => {
        const req = await request(app).post('/user/signup')
            .send({
                name: 'Aeman',
                email: 'testing@gmail.com',
                password: '321'
            })
            .expect(500)
            .expect((res) => {
                expect(res._body.message).toBe('Already registered')
            })




    })

    it('should give error as user data is incorrect', async () => {
        const req = await request(app).post('/user/signup')
            .send({
                name: null,
                email: 'testing2@gmail.com',
                password: '321'
            })
            .expect(500)
            .expect((res) => {
                expect(res._body.message).toBe("Can't register user")
            })


    })

    it('should login a user if data is correct', async () => {
        const req = await request(app).post('/user/login')
            .send({
                email: 'testing@gmail.com',
                password: '321'
            })
            .expect(200)


    })
})
