export const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
    {title && (
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
        {title}
      </h3>
    )}
    {children}
  </div>
);

export const Input = ({ label, icon, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="text-[10px] font-bold uppercase text-slate-600 ml-1 flex items-center gap-2">
        {icon} {label}
      </label>
    )}
    <input 
      {...props} 
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400" 
    />
  </div>
);

export const TextArea = ({ label, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="text-[10px] font-bold uppercase text-slate-600 ml-1">
        {label}
      </label>
    )}
    <textarea 
      {...props} 
      rows={props.rows || 3}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400" 
    />
  </div>
);

export const Button = ({ variant = "primary", children, className = "", size = "md", ...props }) => {
  const baseStyles = "rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100",
    secondary: "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50", // Changed text-slate-700 to 900
    outline: "text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-100",
    danger: "text-red-600 hover:bg-red-50 border border-transparent"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button {...props} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

export const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">{icon}</div>
    <h2 className="font-black uppercase tracking-[0.2em] text-xs text-slate-800">
      {title}
    </h2>
  </div>
);