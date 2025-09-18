
export function useNavbarConfig() {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Customers', path: '/customers' },
        { name: 'Products', path: '/products' }
    ];
    return { navItems };
}