"use client"
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash,Pencil } from "@phosphor-icons/react";
import { HeaderData } from "@/schemas/headerSchema";

interface MenuTableProps {
  menus: HeaderData['menus'];
  onEdit: (menuName: string) => void;
  onDelete: (menuName: string) => void;
}

const MenuTable: React.FC<MenuTableProps> = ({ menus, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Menü Adı</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Alt Menüler</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menus.map((menu) => (
          <TableRow key={menu.name}>
            <TableCell className="font-medium">{menu.name}</TableCell>
            <TableCell>{menu.link}</TableCell>
            <TableCell>{menu.submenus ? menu.submenus.length : 0}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(menu.name)}
                className="mr-2"
              >
                <Pencil size={32} weight="fill" />
                Düzenle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(menu.name)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={32} weight="fill" />
                Sil
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MenuTable;