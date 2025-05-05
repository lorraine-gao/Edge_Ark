import { useState } from 'react';
import {useRouter} from 'next/router'
import Papa from 'papaparse';

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async function (results) {
        try {
          setUploading(true);
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fixtures: results.data }),
          });

          const data = await res.json();
          setMessage(data.message);
        } catch (err) {
          setMessage('Upload failed');
        } finally {
          setUploading(false);
        }
      },
    });
  };

  const router = useRouter();

  const GoToSearch = () => {
    router.push('/search');
  };

  return (
    <div className='p-8 flex flex-col items-center gap-10'>
      <h1 className="text-2xl font-bold">Upload Fixtures CSV</h1>
      <input
      type="file"
      accept=".csv"
      onChange={handleFileUpload}
      className="text-sm file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700"
    />
      {uploading 
      ? <p>Uploading...</p> 
      : <div>
        <p>{message}</p>
        <button className="bg-blue-700 text-white py-2 px-4 rounded" onClick={GoToSearch}>Go to search</button>
      </div>}
    </div>
  );
}

export default UploadPage