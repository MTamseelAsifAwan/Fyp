
const SkeletonLoader = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="bg-gray-300 h-8 w-2/3 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded-md animate-pulse"></div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <div className="bg-gray-300 h-10 w-32 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-10 w-32 rounded-md animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-300 h-40 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-40 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-40 rounded-md animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-300 h-40 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-40 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-40 rounded-md animate-pulse"></div>
      </div>
      
    </div>
  );
};

export default SkeletonLoader;
