"use client"
import React from 'react';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { headerSchema, HeaderData } from "@/schemas/headerSchema";
import { useDrag, useDrop } from 'react-dnd';

interface HeaderFormProps {
  initialData: HeaderData;
  onSubmit: (data: HeaderData) => Promise<void>;
  editingMenu: HeaderData['menus'][0] | null;
}

const HeaderForm: React.FC<HeaderFormProps> = ({ initialData, onSubmit, editingMenu }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeaderData>({
    resolver: zodResolver(headerSchema),
    defaultValues: editingMenu 
      ? {
          ...initialData,
          menus: initialData.menus.map(menu => 
            menu.name === editingMenu.name ? editingMenu : menu
          )
        }
      : initialData,
  });

  const { fields: menuFields, append: appendMenu, remove: removeMenu, move: moveMenu } = useFieldArray({
    control,
    name: "menus",
  });

  const handleFormSubmit = async (data: HeaderData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Header</h2>

      <div>
        <label className="block font-semibold">Image URL</label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input {...field} className="w-full p-2 border rounded" />
          )}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Menus</label>
        {menuFields.map((item, index) => (
          <DraggableMenuItem
            key={item.id}
            index={index}
            moveMenu={moveMenu}
            menuItem={item}
            control={control}
            removeMenu={removeMenu}
            errors={errors}
          />
        ))}
        <button type="button" onClick={() => appendMenu({ name: "", link: "", submenus: [] })} className="p-2 bg-blue-500 text-white rounded">Add Menu</button>
      </div>

      <button type="submit" className="p-2 bg-green-500 text-white rounded">Submit</button>
    </form>
  );
};

const DraggableMenuItem = ({ index, moveMenu, menuItem, control, removeMenu, errors }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'MENU_ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveMenu(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }} className="space-y-2 mb-2 p-2 border rounded">
      <div className="flex space-x-2">
        <span className="cursor-move">☰</span>
        <Controller
          name={`menus.${index}.name`}
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Menu Name" className="w-full p-2 border rounded" />
          )}
        />
        <Controller
          name={`menus.${index}.link`}
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Menu Link" className="w-full p-2 border rounded" />
          )}
        />
        <button type="button" onClick={() => removeMenu(index)} className="p-2 bg-red-500 text-white rounded">Remove</button>
      </div>
      {errors.menus?.[index]?.name && (
        <p className="text-red-500">{errors.menus[index].name?.message}</p>
      )}
      {errors.menus?.[index]?.link && (
        <p className="text-red-500">{errors.menus[index].link?.message}</p>
      )}

      <Controller
        name={`menus.${index}.submenus`}
        control={control}
        render={({ field }) => (
          <SubMenuFieldArray control={control} menuIndex={index} />
        )}
      />
    </div>
  );
};

const SubMenuFieldArray = ({ control, menuIndex }) => {
  const { fields: submenuFields, append: appendSubmenu, remove: removeSubmenu } = useFieldArray({
    control,
    name: `menus.${menuIndex}.submenus`,
  });

  return (
    <div className="ml-4">
      <label className="block font-semibold">Submenus</label>
      {submenuFields.map((item, subIndex) => (
        <div key={item.id} className="flex space-x-2">
          <Controller
            name={`menus.${menuIndex}.submenus.${subIndex}.name`}
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="Submenu Name" className="w-full p-2 border rounded" />
            )}
          />
          <Controller
            name={`menus.${menuIndex}.submenus.${subIndex}.link`}
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="Submenu Link" className="w-full p-2 border rounded" />
            )}
          />
          <button type="button" onClick={() => removeSubmenu(subIndex)} className="p-2 bg-red-500 text-white rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => appendSubmenu({ name: "", link: "" })} className="p-2 bg-blue-500 text-white rounded">Add Submenu</button>
    </div>
  );
};

export default HeaderForm;