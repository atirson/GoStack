import * as Yup from 'yup';
import HelpOrder from '../schemas/HelpOrders';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const studentExist = await Student.findByPk(req.params.id);

    if (!(await studentExist)) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const helpOrders = await HelpOrder.find({ student_id: studentExist.id });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = await Yup.object().shape({
      question: Yup.string().required(),
    });

    const student_id = req.params.id;

    const studentExist = await Student.findByPk(student_id);

    if (!(await studentExist)) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const helpOrder = await HelpOrder.create({
      student_id,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
