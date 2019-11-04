import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const studentExist = await Student.findByPk(req.body.student_id);

    if (!(await studentExist)) {
      return res.status(401).json({ error: 'Student not exists.' });
    }

    const planExist = await Plan.findByPk(req.body.plan_id);

    if (!(await planExist)) {
      return res.status(401).json({ error: 'Plan not exists.' });
    }

    const end_date = addMonths(
      parseISO(req.body.start_date),
      planExist.duration
    );
    const price = (await planExist.duration) * planExist.price;

    const { student_id, plan_id, start_date } = await req.body;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
