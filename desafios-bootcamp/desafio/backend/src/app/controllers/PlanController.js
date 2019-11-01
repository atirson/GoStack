import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plan = await Plan.findAll();

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const planExist = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (await planExist) {
      return res.status(400).json({ error: 'Plan already exists.' })
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });

  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'Plan not exists.' });
    }

    const updatePlan = await plan.update(req.body);

    return res.json(updatePlan);
  }

  async delete(req, res) {
    const planExist = await Plan.findByPk(req.params.id);

    if (!planExist) {
      return res.status(401).json({ error: 'Plan not exists.' });
    }

    const plan = await planExist.destroy();

    return res.json({ success: 'Delete with success.' });
  }

}

export default new PlanController();
