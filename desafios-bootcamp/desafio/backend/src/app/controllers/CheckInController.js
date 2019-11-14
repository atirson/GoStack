import { subDays, endOfDay, startOfDay } from 'date-fns';
import Checkin from '../schemas/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckInController {
  async index(req, res) {
    const { student_id } = req.body;

    const studentExist = await Student.findByPk(student_id);

    if (!(await studentExist)) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const checkinsExist = await Checkin.find({ student_id }).limit(5);

    return res.json(checkinsExist);
  }

  async store(req, res) {
    const { student_id } = req.body;

    const studentExist = await Student.findByPk(student_id);

    if (!(await studentExist)) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const enrollmentExist = await Enrollment.findOne({ where: { student_id } });

    if (!(await enrollmentExist)) {
      return res
        .status(400)
        .json({ error: 'This student does not have enrollment.' });
    }

    const today = new Date();

    const pastDays = await subDays(today, 7);

    const checkinPermit = await Checkin.count({
      student_id,
    })
      .gte('createdAt', startOfDay(pastDays))
      .lte('createdAt', endOfDay(today))
      .countDocuments();

    if (checkinPermit >= 5) {
      return res.status(400).json({
        error:
          'Sorry, but you exceeded your limit of checkins at the GymPoint.',
      });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckInController();
