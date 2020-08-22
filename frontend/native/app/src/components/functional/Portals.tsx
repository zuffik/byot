import * as React from 'react';

export interface PortalProviderValue {
  node: React.ReactNode;
  setNode: (node: React.ReactNode) => void;
}

const {Provider, Consumer} = React.createContext<PortalProviderValue>({
  node: null,
  setNode: (node: React.ReactNode) => {
    throw new Error('Unexpected use of setNode');
  },
});

const PortalsProvider = (props: {children?: React.ReactNode}) => {
  const [node, setNode] = React.useState<React.ReactNode>(null);
  return <Provider value={{node, setNode}}>{props.children}</Provider>;
};

const PortalOut = (props: {children: React.ReactNode}) => {
  const [clearNode, setClearNode] = React.useState<(() => void) | undefined>(undefined);
  React.useEffect(() => {
    return () => clearNode?.();
  }, [clearNode]);
  return (
    <Consumer>
      {({setNode}) => {
        if (!clearNode) {
          setClearNode(() => () => setNode(null));
        }
        setNode(props.children);
        return null;
      }}
    </Consumer>
  );
};

const PortalIn = (props: {}) => <Consumer>{({node}) => node}</Consumer>;

export const createPortal = () => ({
  PortalsProvider: (props: {children?: React.ReactNode}) => (
    <PortalsProvider>{props.children}</PortalsProvider>
  ),
  PortalOut: (props: {children: React.ReactNode}) => <PortalOut>{props.children}</PortalOut>,
  PortalIn: (props: {}) => <PortalIn />,
});
