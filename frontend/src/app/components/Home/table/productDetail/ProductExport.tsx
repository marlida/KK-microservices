import axios from 'axios';
import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function ProductExport() {
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/';
  const [loading, setLoading] = useState(false);

  const downloadExcel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}export/products`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('โหลดไฟล์ไม่สำเร็จ ลองใหม่อีกทีนะ!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
        <button
            onClick={downloadExcel}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium border cursor-pointer ${
				loading
					? "text-gray-400 bg-blue-500 border-gray-200 cursor-not-allowed"
					: "text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
			}`}
        >
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>{loading ? 'กำลังดาวน์โหลด...' : 'ดาวน์โหลด Excel สินค้า'}</span>
        </button>
    </div>
  );
}
