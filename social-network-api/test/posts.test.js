const request = require('supertest');
const app = require('../index'); 
describe('POST /posts/create', () => {
  it('Debería crear una nueva publicación', (done) => {
    request(app)
      .post('/posts/create')
      .send({ title: 'Post de prueba', body: 'Contenido de prueba' })
      .expect(201)
      .then((response) => {
        const post = response.body;
        expect(post).to.have.property('_id');
        expect(post.title).to.equal('Post de prueba');
        done();
      })
      .catch((err) => done(err));
  });

  it('Debería fallar si no se envían todos los campos requeridos', (done) => {
    request(app)
      .post('/posts/create')
      .send({ title: 'Solo título' })
      .expect(400, done);
  });
});
