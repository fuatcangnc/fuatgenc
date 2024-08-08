"use client"
import React, { useState, useEffect } from 'react';
import MenuTable from '@/components/admin/menu-table';
import HeaderForm from '@/components/admin/header-form';
import { HeaderData } from "@/schemas/headerSchema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminMenuPage: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<HeaderData['menus'][0] | null>(null);

  useEffect(() => {
    fetchHeaderData();
  }, []);

  const fetchHeaderData = async () => {
    try {
      const response = await fetch('/api/header');
      if (!response.ok) {
        throw new Error('Header verisi yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setHeaderData(data.header);
    } catch (error) {
      console.error('Header verisi yüklenirken hata:', error);
    }
  };

  const handleEdit = (menuName: string) => {
    const menuToEdit = headerData?.menus.find(menu => menu.name === menuName);
    if (menuToEdit) {
      setEditingMenu(menuToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (menuName: string) => {
    // Silme işlemi için gerekli kodu buraya ekleyin
    console.log(`Siliniyor: ${menuName}`);
  };

  const handleEditSubmit = async (updatedData: HeaderData) => {
    try {
      const response = await fetch('/api/header', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Header güncellenirken bir hata oluştu');
      }

      // Başarılı güncelleme sonrası verileri yeniden çek
      await fetchHeaderData();
      setIsEditModalOpen(false);
      setEditingMenu(null);
    } catch (error) {
      console.error('Header güncellenirken hata:', error);
    }
  };

  if (!headerData) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menü Yönetimi</h1>
      <MenuTable menus={headerData.menus} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Menü Düzenle</DialogTitle>
          </DialogHeader>
          <HeaderForm initialData={headerData} onSubmit={handleEditSubmit} editingMenu={editingMenu} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMenuPage;