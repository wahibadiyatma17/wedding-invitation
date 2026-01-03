import { useUIStore } from '@/stores/uiStore';

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  );
}

interface ToastProps {
  toast: {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
  };
  onClose: () => void;
}

function Toast({ toast, onClose }: ToastProps) {
  const typeClasses = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white'
  };

  return (
    <div className={`rounded-lg shadow-lg p-4 min-w-[300px] ${typeClasses[toast.type]} animate-in slide-in-from-right`}>
      <div className="flex justify-between items-center">
        <p className="font-medium">{toast.message}</p>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}