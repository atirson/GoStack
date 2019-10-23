import User from '../models/User';

class PorviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
    });

    return res.json(providers);
  }
}

export default new PorviderController();
