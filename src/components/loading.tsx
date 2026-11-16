export default function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2 w-full h-full">
      <div className="w-3 h-3 bg-admin-primary rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-admin-primary rounded-full animate-bounce delay-200"></div>
      <div className="w-3 h-3 bg-admin-primary rounded-full animate-bounce delay-400"></div>
    </div>
  );
}
