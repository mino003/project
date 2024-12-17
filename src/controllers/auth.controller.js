import UserService from '../services/user.service.js';
import { generateToken } from '../utils/auth.js';
import { UnauthorizedError } from '../utils/errors.js';

class AuthController {
  async register(req, res, next) {
    try {
      const user = await UserService.createUser(req.body);
      const token = generateToken(user);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email);
      
      if (!user || !(await comparePasswords(password, user.password))) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const token = generateToken(user);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await UserService.findById(req.user.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();