"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";

type User = {
  id?: string;
  email?: string;
  role?: string;
} | null;

type FetchWithAuth = (
  input: RequestInfo,
  init?: RequestInit,
) => Promise<Response>;

type AuthContextType = {
  user: User;
  setUser: (u: User) => void;
  loading: boolean;
  fetchWithAuth: FetchWithAuth;
  refreshTokens: () => Promise<boolean>;
  logout: () => Promise<void>;
  syncUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser?: User;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(initialUser ?? null);
  const [loading, setLoading] = useState<boolean>(initialUser == null);

  // refreshMutex prevents multiple simultaneous refresh calls
  const refreshMutex = useRef<Promise<boolean> | null>(null);

  const refreshTokens = useCallback(async (): Promise<boolean> => {
    if (refreshMutex.current) return refreshMutex.current;

    const p = (async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        return res.ok;
      } catch (err) {
        console.error("refreshTokens error:", err);
        return false;
      } finally {
        refreshMutex.current = null;
      }
    })();

    refreshMutex.current = p;
    return p;
  }, []);

  const fetchWithAuth: FetchWithAuth = useCallback(
    async (input, init = {}) => {
      const opts: RequestInit = {
        credentials: "include",
        ...init,
      };

      const doFetch = async () => fetch(input, opts);

      let res = await doFetch();
      if (res.status !== 401) return res;

      const refreshed = await refreshTokens();
      if (!refreshed) return res;

      return await doFetch();
    },
    [refreshTokens],
  );

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      if (initialUser) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        let res = await fetch("/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 401) {
          const ok = await refreshTokens();
          if (ok) {
            res = await fetch("/api/user/me", {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            });
          }
        }

        if (!mounted) return;

        if (res.ok) {
          const data = await safeJson(res);
          setUser(data?.user ?? data ?? null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("AuthProvider init failed:", err);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, [initialUser, refreshTokens]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("logout error:", err);
    } finally {
      setUser(null);
    }
  }, []);

  const syncUser = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch("/api/user/me", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await safeJson(res);
        const normalizedUser = data?.user ?? data ?? null;
        setUser(normalizedUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("syncUser failed:", err);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      fetchWithAuth,
      refreshTokens,
      logout,
      syncUser,
    }),
    [user, loading, fetchWithAuth, refreshTokens, logout, syncUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
