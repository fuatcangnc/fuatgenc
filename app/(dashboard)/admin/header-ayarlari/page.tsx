"use client"
import HeaderForm from '@/components/admin/header-form'
import AdminMenuPage from '@/components/admin/menu-listing'
import TopBarForm from '@/components/admin/top-bar-form'
import React, { useState, useEffect } from 'react'
import { HeaderData } from '@/schemas/headerSchema'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function HeaderAyarlari() {
  const [initialData, setInitialData] = useState<HeaderData>({
    image: '',
    menus: []
  });
  const [editingMenu, setEditingMenu] = useState<HeaderData['menus'][0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('/api/header');
        if (response.ok) {
          const data = await response.json();
          setInitialData(data.header);
        }
      } catch (error) {
        console.error('Error fetching header data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  const handleSubmit = async (data: HeaderData) => {
    try {
      const method = isLoading ? 'POST' : 'PUT';
      const response = await fetch('/api/header', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save header');
      }

      const result = await response.json();
      console.log('Header saved successfully:', result);
      setInitialData(result.header);
      // Başarılı kaydetme sonrası yapılacak işlemler (örn. kullanıcıya bildirim gösterme)
    } catch (error) {
      console.error('Error saving header:', error);
      // Hata durumunda yapılacak işlemler (örn. hata mesajı gösterme)
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <AdminMenuPage/>
        <HeaderForm
          initialData={initialData}
          onSubmit={handleSubmit}
          editingMenu={editingMenu}
        />
        <TopBarForm/>
      </div>
    </DndProvider>
  )
}

export default HeaderAyarlari