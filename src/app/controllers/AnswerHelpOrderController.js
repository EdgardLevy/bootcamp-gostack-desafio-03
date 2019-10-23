import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

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
    const { id } = req.params;
    const { answer } = req.body;
    const helpOrder = await HelpOrder.findByPk(id, {
      attributes: ['id', 'question', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(401).json({ error: 'Help order does not exists' });
    }
    const answer_at = Date.now();

    const hO = await helpOrder.update({ answer, answer_at });

    console.log(hO);

    return res.json(hO);
  }
}

export default new AnswerHelpOrderController();
