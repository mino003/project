import { db } from '../config/database.js';
import { hashPassword } from '../utils/auth.js';
import { NotFoundError } from '../utils/errors.js';

class UserService {
  async createUser(userData) {
    const { email, password, name, role } = userData;
    const hashedPassword = await hashPassword(password);
    
    const result = await db.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
      [email, hashedPassword, name, role]
    );
    
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  async findById(id) {
    const result = await db.query(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [id]
    );

    if (!result.rows[0]) {
      throw new NotFoundError('User not found');
    }

    return result.rows[0];
  }

  async updateUser(id, updates) {
    const { name, email } = updates;
    
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, email, name, role',
      [name, email, id]
    );

    if (!result.rows[0]) {
      throw new NotFoundError('User not found');
    }

    return result.rows[0];
  }
}

export default new UserService();