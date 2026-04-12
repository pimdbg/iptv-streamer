import { useEffect, useState } from "react";
import Routes from "./Routes";

const getHashPath = () => {
  return window.location.hash.replace("#", "") || "/";
} 

export const Router = () => {
  const [path, setPath] = useState(getHashPath());
  
//   TODO: Convert to hook?
  useEffect(() => {
    const onHashChange = () => {
      setPath(getHashPath());
    };

    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const Component = Routes[path] || (() => <div>404 Not Found</div>);
  return <Component />;
}