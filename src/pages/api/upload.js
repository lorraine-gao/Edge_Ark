// src/pages/api/upload.js

import { connectToDatabase } from '@/lib/mongodb';
import Fixture from '@/models/fixture';
import UploadPage from '..';

const handler = async(req, res) =>{
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Not POST method' });
  }

  try {
    await connectToDatabase();

    const fixtures = req.body.fixtures;

    const parsedFixtures = fixtures.map(item => ({
      fixture_mid:item.fixture_mid,
      season: Number(item.season),
      competition_name: item.competition_name,
      fixture_datetime: new Date(item.fixture_datetime),
      fixture_round: Number(item.fixture_round),
      home_team: item.home_team,
      away_team: item.away_team,
    }));

    await Fixture.insertMany(parsedFixtures, { ordered: false });

    res.status(200).json({ message: 'CSV uploaded successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export default handler