interface EditModelProps {
  children: React.ReactNode;
  title?: string; // Optional title prop
  className?: string;
  onClose: ()=>void// Optional className for custom styling
}

const Dialog: React.FC<EditModelProps> = ({ children, title = "تعديل الماركة", className , onClose }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-6 rounded-lg w-full max-w-2xl mx-auto ${className}`} // Apply custom className
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2> {/* Use custom title */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Dialog; 