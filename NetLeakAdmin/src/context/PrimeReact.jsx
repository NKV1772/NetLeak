import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import { PrimeReactProvider } from 'primereact/api';

export default function PrimeReact({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <Component {...pageProps} />
        </PrimeReactProvider>
    );
}