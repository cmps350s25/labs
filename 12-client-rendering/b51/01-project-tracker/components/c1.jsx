function C1({ children, color }) {
  return (
    <div className={`border p-3 m-2 border-amber-500 bg-${color}-500`}>
      <h2>C1</h2>
      {children}
    </div>
  );
}
