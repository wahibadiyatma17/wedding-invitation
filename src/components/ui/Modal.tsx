import { useUIStore } from '@/stores/uiStore';
import { Button } from './Button';

export function Modal() {
  const { modal, closeModal } = useUIStore();

  if (!modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          {modal.title && (
            <h2 className="text-xl font-bold text-green-800">{modal.title}</h2>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={closeModal}
            className="ml-auto"
          >
            ✕
          </Button>
        </div>
        <div className="text-gray-700">
          {modal.content}
        </div>
      </div>
    </div>
  );
}