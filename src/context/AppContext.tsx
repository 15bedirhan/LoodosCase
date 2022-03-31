import React, {createContext, useContext, useState, FC} from 'react';
import {ContextState} from '../types/ContextState';

const contextDefaultValues: ContextState = {
  response: {},
};
export const AppContext = createContext<ContextState>(contextDefaultValues);

export const AppContextWrapper: FC = ({children}) => {
  const [movieData, setMovieData] = useState(); //movie detail from request
  return (
    <AppContext.Provider
      value={{
        movieData,
        setMovieData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
