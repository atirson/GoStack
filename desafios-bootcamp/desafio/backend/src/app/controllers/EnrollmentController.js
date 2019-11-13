import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import EnrollmentSucess from '../jobs/EnrollmentSucess';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const enrollmentAll = await Enrollment.findAll();

    return res.json(enrollmentAll);
  }

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

    await Queue.add(EnrollmentSucess.key, {
      studentExist,
      planExist,
      enrollment,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = await Yup.object().shape({
      enrollment_id: Yup.number().required(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { enrollment_id, plan_id, start_date } = req.body;

    const enrollmentExist = await Enrollment.findByPk(enrollment_id);

    if (!(await enrollmentExist)) {
      return res.status(401).json({ error: 'Enrollments not exists.' });
    }

    const planExist = await Plan.findByPk(plan_id);

    if (!(await planExist)) {
      return res.status(401).json({ error: 'This Plan not exists.' });
    }

    const end_date = addMonths(parseISO(start_date), planExist.duration);
    const price = (await planExist.duration) * planExist.price;

    const enrollment = await enrollmentExist.update({
      plan_id,
      price,
      start_date,
      end_date,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollmentExist = await Enrollment.findByPk(req.params.id);

    if (!enrollmentExist) {
      return res.status(401).json({ error: 'Enrollment not exists.' });
    }

    await enrollmentExist.destroy();

    return res.json({ success: 'Delete with success.' });
  }
}

export default new EnrollmentController();
