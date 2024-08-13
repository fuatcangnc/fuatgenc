'use client'

import React, { useState, useEffect } from 'react'
import { getSubscribers } from '@/actions/newsletter.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Newsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    const result = await getSubscribers();
    if (result.success) {
      setSubscribers(result.data);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Bülten Aboneleri</h2>
      <div className="grid gap-4">
        {subscribers.map((subscriber) => (
          <div key={subscriber.id} className="flex items-center justify-between p-2 border rounded">
            <span>{subscriber.email}</span>
            <Button  variant="destructive">
              Aboneliği İptal Et
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Newsletter