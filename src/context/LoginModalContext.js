import React from 'react';

const LoginModalContext = React.createContext(() => {});

export const LoginModalProvider = LoginModalContext.Provider;
export const LoginModalConsumer = LoginModalContext.Consumer;
export default LoginModalContext;
