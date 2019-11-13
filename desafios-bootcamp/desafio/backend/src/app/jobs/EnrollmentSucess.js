import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentSucess {
  get key() {
    return 'EnrollmentSucess';
  }

  async handle({ data }) {
    const { studentExist, planExist, enrollment } = data;

    await Mail.sendMail({
      to: `${studentExist.name} <${studentExist.email}>`,
      subject: 'Mátricula GymPoint',
      template: 'enrollment',
      context: {
        student: studentExist.name,
        title: planExist.title,
        price: enrollment.price,
        date: format(
          parseISO(enrollment.end_date),
          "'dia' dd 'de' MMMM' de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new EnrollmentSucess();
