import React, { useState } from 'react';
import { downloadCV, CVNotFoundError, CVDownloadError } from '../../services/cvDownloadService';
import { FaDownload, FaSpinner } from 'react-icons/fa';

interface CVDownloadButtonProps {
  cvUrl: string;
  fileName: string;
}

export const CVDownloadButton: React.FC<CVDownloadButtonProps> = ({ cvUrl, fileName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await downloadCV(cvUrl, fileName);
    } catch (error) {
      if (error instanceof CVNotFoundError || error instanceof CVDownloadError) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Terjadi kesalahan. Silakan coba kembali.');
      }
      
      // Auto dismiss error after 3 seconds
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-neon-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin" />
            <span>Mengunduh...</span>
          </>
        ) : (
          <>
            <FaDownload />
            <span>Unduh CV</span>
          </>
        )}
      </button>
      {errorMsg && (
        <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">
          {errorMsg}
        </p>
      )}
    </div>
  );
};
