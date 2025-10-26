import { useState, useEffect, useCallback } from "react";

export function useUser(storageKey = "grahamUser") {
  const [user, setUserState] = useState({
    avatar:
      "https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3407.jpg",
    name: "User",
    login: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        setUserState((prev) => ({ ...prev, ...parsed }));
      }
    } catch (err) {
      console.warn("useUser: localStorage grahamUser inválido — removendo.", err);
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const setUser = useCallback(
    (next) => {
      const newUser = typeof next === "function" ? next(user) : next;
      try {
        localStorage.setItem(storageKey, JSON.stringify(newUser));
      } catch (err) {
        console.error("useUser: falha ao salvar no localStorage", err);
      }
      setUserState((prev) => ({ ...prev, ...newUser }));
    },
    [storageKey, user]
  );

  return { user, setUser };
}
