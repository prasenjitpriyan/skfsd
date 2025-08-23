import DailyReport from '@/models/DailyReport';
import cron from 'node-cron';
import dbConnect from './mongodb';

// Reset daily data at midnight
export function startCronJobs() {
  // Run every day at midnight (00:00)
  cron.schedule('0 0 * * *', async () => {
    try {
      await dbConnect();

      // Update all reports to make them non-editable after midnight
      await DailyReport.updateMany(
        {
          date: { $lt: new Date().setHours(0, 0, 0, 0) },
          isEditable: true,
        },
        { isEditable: false }
      );

      console.log('Daily reset completed at:', new Date().toISOString());
    } catch (error) {
      console.error('Error in daily reset:', error);
    }
  });

  console.log('Cron jobs started');
}
