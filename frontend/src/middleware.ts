export { default } from 'next-auth/middleware';

export const config = {
    // api: {
    //   bodyParser: false
    // },
    matcher: ["/extra", "/dashboard"]
};