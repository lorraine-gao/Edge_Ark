import { connectToDatabase } from '@/lib/mongodb';
import Fixture from '@/models/fixture';

const handler = async(req, res) =>{
  const { team } = req.query;

  try {
    await connectToDatabase();

    const regex = new RegExp(team, 'i'); // do not distinguish capital case

    const matches = await Fixture.find({
      $or: [
        { home_team: regex },
        { away_team: regex }
      ]
    });
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export default handler