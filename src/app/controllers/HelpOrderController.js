import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import totalizeRecords from '../../util/dbfunctions';

class HelpOrderController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const options = {
      limit,
      offset: (page - 1) * limit,
    };

    const result = await HelpOrder.findAndCountAll(options);

    return res.json(totalizeRecords(result, limit, page));
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string()
        .required()
        .min(15),
    });

    // validate schema and return all errors messages if need
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ errors: error.errors });
    }

    const { student_id } = req.params;
    const { question } = req.body;

    const helpOrder = await HelpOrder.create({ student_id, question });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
