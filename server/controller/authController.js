/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ClientController from './clientController';

dotenv.config();

class AuthController extends ClientController{
  create(req, res, next) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const action = 'INSERT INTO users(username, email, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING username, email, created_at, updated_at';
      const values = [req.body.username, req.body.email, hash, 'NOW()', 'NOW()'];
      const query = {
        text: action,
        values,
      };
      this._client.query(query)
        .then((result) => {
          res.status(201).json({
            status: 'success',
            data: result.rows[0],
          });
        }).catch((e) => {
          if (parseInt(e.code, 10) === 23505) {
            e.status = 409;
            e.message = 'an account with this email already exist';
          }
          next(e);
        });
    }).catch((err) => {
      next(err);
    });
  }

  login(req, res, next) {
    const { email, password, } = req.body;
    this._client.query('SELECT id, username, email, password fav_quote FROM users WHERE email=($1)', [email.toLowerCase()])
      .then((result) => {
        if (result.rowCount > 0) {
          const data = result.rows[0];
          bcrypt.compare(password, data.password)
            .then((val) => {
              if (val) {
                const token = jwt.sign(
                  {
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    fav_quote: data.fav_quote,
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: process.env.JWT_EXPIRY,
                  },
                );
                delete data.password;
                data.token = token;
                res.status(200)
                  .json({
                    status: 'success',
                    data,
                  });
              } else {
                const error = new Error('not match any record');
                error.status = 401;
                next(error);
              }
            })
            .catch((err) => {
              next(err);
            });
        } else {
          const error = new Error('not match any record');
          error.status = 401;
          next(error);
        }
      })
      .catch((e) => {
        next(e);
      });
  }
}

export default AuthController;
