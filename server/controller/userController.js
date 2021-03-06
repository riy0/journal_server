/* eslint no-underscore-dangle: 0 */
import dotenv from 'dotenv';
import ClientController from './clientController';

dotenv.config();

class UserController extends ClientController {
  update(req, res, next) {
    const { username, email, } = req.body;
    const favouriteQuote = (Object.prototype.hasOwnProperty.call(req.body, 'fav_quote')) ? req.body.fav_quote : null;
    const text = 'UPDATE users SET username=($1), email=($2), fav_quote=($3), updated_at=($4) WHERE id=($5) RETURNING id, username, email, fav_quote';
    const values = [username, email, favouriteQuote, 'NOW()', req.userData.id];

    const query = {
      text,
      values,
    };
    this._client.query(query)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            data: result.rows[0],
          });
      })
      .catch((e) => {
        next(e);
      });
  }
}

export default UserController;
