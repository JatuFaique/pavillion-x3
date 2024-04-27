'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import pageReducer, { StateType as PageStateType, ActionType as PageActionType, initialPageState as initialPageState } from '../reducer/pageReducer';

interface ContextType {
  state: PageStateType;
  dispatch: React.Dispatch<PageActionType>;
}

const PageContext = createContext<ContextType | null>(null);

export const PageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(pageReducer, initialPageState);

  return (
    <PageContext.Provider value={{ state, dispatch }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = (): ContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageContextProvider');
  }
  return context;
};
