import { useEffect } from "react";
import { useRouter } from "next/router";
import { Loading } from '@carbon/react';

const Redirect = () => {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/dashboard')
        }, 3000);
    }, [])

    return (
        <div style={styles}>
            <h1>Page not found (404)</h1>
            <p>Redirecting back to dashboard...</p>
            <Loading />
        </div>
    )
}

const styles = {

    width: '100vw',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '32px',
    justifyContent: 'center',
    alignItems: 'center',
}

export default Redirect;