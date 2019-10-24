import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class AnswerHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      attributes: ['id', 'question', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      answer: Yup.string().required(),
    });

    const { id } = req.params;
    const { answer } = req.body;
    // validate schema and return all errors messages if need
    try {
      await schema.validate({ id, answer }, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ errors: error.errors });
    }

    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res.status(401).json({ error: 'Help order does not exists' });
    }
    const answer_at = Date.now();

    await helpOrder.update({ answer, answer_at });

    const helpOrderUpdated = await HelpOrder.findByPk(id, {
      attributes: ['id', 'question', 'answer', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await Queue.add(HelpOrderMail.key, {
      helpOrder: helpOrderUpdated,
    });

    return res.json(helpOrderUpdated);
  }
}

export default new AnswerHelpOrderController();
