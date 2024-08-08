import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { HeaderData } from '@/schemas/headerSchema';

interface MenuOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: HeaderData['menus'];
  onSave: (newOrder: HeaderData['menus']) => void;
}

export function MenuOrderModal({ isOpen, onClose, menuItems, onSave }: MenuOrderModalProps) {
  const [items, setItems] = useState(menuItems);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const handleSave = () => {
    onSave(items);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reorder Menu Items</DialogTitle>
        </DialogHeader>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="menu-items">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.name} draggableId={item.name} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-gray-100 rounded"
                      >
                        {item.name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <DialogFooter>
          <Button onClick={handleSave}>Save Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}