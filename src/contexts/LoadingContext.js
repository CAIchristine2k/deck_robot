import React, { createContext, useContext } from 'react';

const LoadingContext = createContext({
  isLoading: true,
  hasLoadingCompleted: false,
  hasLanguageSelected: false
});

export const LoadingProvider = ({ children, isLoading, hasLanguageSelected = false }) => {
  // hasLoadingCompleted is true when loading has finished at least once AND language is selected
  const hasLoadingCompleted = !isLoading && hasLanguageSelected;
  
  return (
    <LoadingContext.Provider value={{ isLoading, hasLoadingCompleted, hasLanguageSelected }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};