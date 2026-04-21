import { getUserInfo } from "@/services/api/auth.api";
import { createContext, useContext, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean;
  profile: IProfile | null;
  isAppLoading: boolean;
  setProfile: (user: IProfile | null) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  setIsAppLoading: (loading: boolean) => void;
}

type TProps = {
  children: React.ReactNode;
};

const CurrentAppContext = createContext<IAppContext | null>(null);

const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  useEffect(() => {
    const initApp = async () => {
      setIsAppLoading(true);
      try {
        const data = await getUserInfo();
        setProfile(data!);
        setIsAuthenticated(true);
      } catch {
        setProfile(null);
      } finally {
        setIsAppLoading(false);
      }
    };

    initApp();
  }, []);

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          inset: 0,
          background: "#fff",
          zIndex: 9999,
          transition: "all 0.5s ease",
          opacity: isAppLoading ? 1 : 0,
          visibility: isAppLoading ? "visible" : "hidden",
          pointerEvents: isAppLoading ? "auto" : "none",
        }}
      >
        <FadeLoader color="#f25d1d" loading={true} height="15px" />
      </div>
      <CurrentAppContext.Provider
        value={{
          isAuthenticated,
          profile,
          isAppLoading,
          setProfile,
          setIsAuthenticated,
          setIsAppLoading,
        }}
      >
        {props.children}
      </CurrentAppContext.Provider>
    </>
  );
};

const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error("useCurrentApp has to be used within <CurrentAppContext>");
  }

  return currentAppContext;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, useCurrentApp };
