import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe("sk_test_51N0R9NSByCMPJ5NHBiuwVHh91W8eg5ndDG7a2Xdy9bFqACfPDifWusWrPao00KL1bIpl31kJSPp8qqTNJ9DouHGF00TNEE6AFP");

        return stripePromise;
    }
}

export default getStripe;