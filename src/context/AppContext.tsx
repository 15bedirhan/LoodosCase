import React, {createContext, useContext, useState, FC} from 'react';
import {ContextState, IMovieDataState} from '../types/ContextState';

const contextDefaultValues: ContextState = {};
export const AppContext = createContext<ContextState>(contextDefaultValues);

export const AppContextWrapper: FC = ({children}) => {
  const [movieData, setMovieData] = useState<IMovieDataState | null>(); //movie detail from request
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
