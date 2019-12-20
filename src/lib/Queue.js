// modulo para criacao de filas de background jobs
import Bee from 'bee-queue';

import HelpOrderMail from '../app/jobs/HelpOrderMail';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import redisConfig from '../config/redis';

const jobs = [SubscriptionMail, HelpOrderMail];

class Queue {
  constructor() {
    this.queues = [];
    this.init();
  }

  /**
   * Start jobs queues
   */
  init() {
    console.log('Queue init');
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, { redis: redisConfig }),
        handle,
      };
    });
  }

  add(queue, job) {
    console.log('Queue add');
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    console.log('Queue processQueue');
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
