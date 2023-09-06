const TabItem = ({ label, isActive, onClick }) => {
  return (
    <li
      className={`px-4 py-2 cursor-pointer ${
        isActive
          ? "border-b-2 border-indigo-600 text-indigo-600"
          : "border-b-2 border-indigo-600 text-zinc-900"
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default TabItem;
