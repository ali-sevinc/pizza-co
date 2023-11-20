import { FormEvent, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUsername } from "./userSlice";

import Button from "../../ui/Button";

function CreateUser() {
  const nameRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value;
    if (!name) return;
    dispatch(setUsername(name));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base ">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        required
        ref={nameRef}
        className="input mb-8 w-72"
      />

      <div>
        <Button type="submit">Start ordering</Button>
      </div>
    </form>
  );
}

export default CreateUser;
