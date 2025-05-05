import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [selectedFixture, setSelectedFixture] = useState(null);

  useEffect(() => {
    if (query.length === 0) {
      setFixtures([]);
      return;
    }

    const delay = setTimeout(async () => {
      const res = await fetch(`/api/search?team=${query}`);
      const data = await res.json();
      console.log(data)
      setFixtures(data);
    }, 100);

    return () => clearTimeout(delay);

  }, [query]);

  return (
    <div className='p-8 flex flex-col max-w-full items-center gap-5 '>
      <h1 className="text-3xl font-bold text-blue-800">Search Fixtures</h1>
      <input
        type="text"
        placeholder="Search by team..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 mb-6 border rounded"
      />

      <div className='flex'>
        <ul className='w-full flex flex-col gap-3'>
          {fixtures.map((fix) => (
            <li key={fix.fixture_mid} className='flex gap-15'>
              <span>{fix.home_team} vs {fix.away_team}</span>
              <span onClick={() => setSelectedFixture(fix)} className='border px-1 rounded'> detail</span>
            </li>
          ))}
        </ul>

        {selectedFixture && (
          <div>
            <p><b>Match ID:</b> {selectedFixture.fixture_mid}</p>
            <p><b>Season:</b> {selectedFixture.season}</p>
            <p><b>Competition:</b> {selectedFixture.competition_name}</p>
            <p><b>Round:</b> {selectedFixture.fixture_round}</p>
            <p><b>Kickoff:</b> {new Date(selectedFixture.fixture_datetime).toLocaleString()}</p>
            <p><b>Teams:</b> {selectedFixture.home_team} vs {selectedFixture.away_team}</p>
          </div>
        )}
        </div>

    </div>
  );
}
