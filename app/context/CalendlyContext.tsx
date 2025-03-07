import React from 'react';

type CalendlyContext = {
  setUrl: (url: string) => void;
  url: string | null;
};

export const CalendlyContext = React.createContext<CalendlyContext>({
  setUrl: () => {},
  url: null,
});

type Props = {
  children: React.ReactNode;
};

export const CalendlyProvider = ({ children }: Props) => {
  const [url, setUrl] = React.useState<string | null>(null);

  const contextValue = React.useMemo(
    () => ({
      setUrl,
      url,
    }),
    [setUrl, url]
  );

  return (
    <CalendlyContext.Provider value={contextValue}>
      {children}
    </CalendlyContext.Provider>
  );
};

export const useCalendly = () => React.useContext(CalendlyContext);
