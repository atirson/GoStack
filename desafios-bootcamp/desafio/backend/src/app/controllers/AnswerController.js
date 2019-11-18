import * as Yup from 'yup';
import HelpOrder from '../schemas/HelpOrders';

class AnswerController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const answerExist = await HelpOrder.findById(req.params.id);

    if (!answerExist) {
      return res.status(400).json({ error: 'Answer does not exists.' });
    }

    const answer = await HelpOrder.findByIdAndUpdate(req.params.id, {
      answer: req.body.answer,
      answer_at: new Date(),
    });

    return res.json(answer);
  }
}

export default new AnswerController();
