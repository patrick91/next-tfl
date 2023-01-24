export const StopLetter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-red-600 rounded-full font-bold text-white flex w-8 h-8 text-base items-center justify-center">
      {children}
    </div>
  );
};
