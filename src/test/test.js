const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const generateProduct = () =>{
    return {
        precio: faker.commerce.price(1, 1000, 2, ""),
        nombre: faker.commerce.product(),
        timestamp: new Date().toLocaleString(),
        descripcion: faker.commerce.productDescription(),
        stock: 10,
        codigo: faker.commerce.productMaterial(),
        thumbnail: faker.image.technics(640, 480, true),
    };
};

// GET

describe('test all endpoint', () => {
    describe('GET ALL', () => {
        it('deberia devolver status 200 y ser un array', async ()=>{
            const res = await request.get('/api/productos');
            expect(res.status).to.eql(200);
            expect(res.body).to.be.a('array');
        })
    })

    describe("POST ONE", () => {
        it("Deberia incorporar un producto nuevo", async () => {
          const post = generateProduct();
          const res = await request.post("/api/productos").send(post);
          expect(res.status).to.eql(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys("msg");
          expect(post.body).to.eql(res.body.body);
        });
      });
})