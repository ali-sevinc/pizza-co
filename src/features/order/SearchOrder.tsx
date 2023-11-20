import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm duration-200 placeholder:text-stone-400 focus:w-32 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72 "
      />
    </form>
  );
}
