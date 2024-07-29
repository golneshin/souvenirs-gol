const Message = ({ variant = 'info', children }) => {
  const getAlertClass = (variant) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 text-white';
      case 'secondary':
        return 'bg-gray-500 text-white';
      case 'success':
        return 'bg-green-500 text-white';
      case 'danger':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      case 'info':
        return 'bg-blue-300 text-black';
      case 'light':
        return 'bg-gray-200 text-black';
      case 'dark':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-blue-300 text-black'; // Default to 'info' variant
    }
  };

  return (
    <div className={`p-4 my-4 font-bold rounded ${getAlertClass(variant)}`}>
      {children}
    </div>
  );
};

export default Message;
