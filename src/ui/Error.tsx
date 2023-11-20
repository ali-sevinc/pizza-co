import { useNavigate, useRouteError, ErrorResponse } from "react-router-dom";

import LinkButton from "./LinkButton";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError() as ErrorResponse;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error?.statusText || "Failed to fetch..."}</p>
      <LinkButton onClick={() => navigate(-1)} type="button">
        &larr; Go back
      </LinkButton>
    </div>
  );
}

export default NotFound;
