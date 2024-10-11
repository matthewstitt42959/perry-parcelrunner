import 'tailwindcss/tailwind.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/globals.css'; 
import { Windmill } from '@windmill/react-ui';

export default function
Mockpostman({ Component, pageProps })
{
    return (
        <Windmill>
    <div className='bg-background min-h-screen'>
        <Component {...pageProps} />
    </div>
    </Windmill>
    
    );
}