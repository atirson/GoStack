import * as Yup from 'yup';
import HelpOrder from '../schemas/HelpOrders';

class AnswerController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      anwser: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const anwserExist = await HelpOrder.findById(req.params.id);

    if (!anwserExist) {
      return res.status(400).json({ error: 'Anwser does not exists.' });
    }

    const anwser = await HelpOrder.findByIdAndUpdate(
      req.params.id,
      {
        anwser: req.body.anwser,
      },
      { anwser_at: new Date() }
    );

    return res.json(anwser);
  }
}

export default new AnswerController();
