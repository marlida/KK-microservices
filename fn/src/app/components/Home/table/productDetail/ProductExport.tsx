import axios from 'axios';
import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";

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
        <Button
            onClick={downloadExcel}
            disabled={loading}
            variant="outline" // Example variant, adjust as needed
            size="default" // Example size, adjust as needed
        >
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>{loading ? 'กำลังดาวน์โหลด...' : 'ดาวน์โหลด Excel สินค้า'}</span>
        </Button>
    </div>
  );
}
