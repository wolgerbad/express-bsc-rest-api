import express from 'express';

let users = [
  { id: 1, name: 'Katerina' },
  { id: 2, name: 'Rodopsky' },
  { id: 3, name: 'Çiçikov' },
];

const router = express.Router();

router.use(logger);

function logger(req, res, next) {
  console.log('middleware runs');
  next();
}

router.get('/', (req, res) => {
  const { limit } = req.query;
  if (!limit) {
    return res.send(users);
  }
  res.send(users.slice(0, limit));
});

router.get('/:id', (req, res, next) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    const error = new Error(`user with the id of ${id} could not be found`);
    error.status = 404;
    next(error);
  }

  res.send(user);
});

router.post('/', (req, res, next) => {
  const newUser = req.body;
  if (!newUser) {
    const error = new Error('Please send valid json info');
    error.status = 500;
    next(error);
  }
  users.push(newUser);
  res.send(newUser);
});

router.put('/:id', (req, res, next) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  const updateBody = req.body;

  if (!user || !updateBody) {
    const error = new Error(`user with the id of ${id} could not be found`);
    error.status = 404;
    return next(error);
  }

  users = users.map((user) =>
    user.id === id
      ? {
          id: user.id,
          name: updateBody.name || user.name,
        }
      : user
  );

  res.send(users);
});

router.delete('/:id', (req, res, next) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    // return res.status(404).send({
    //   message: `There is no user exist to get deleted with the id you provided: ${id}`,
    // });

    const error = new Error(
      `There is no user exist to get deleted with the id you provided: ${id}`
    );
    error.status = 500;

    return next(error);
  }
  users = users.filter((user) => user.id !== id);
  res.send(users);
});

export default router;
