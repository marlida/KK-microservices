import DashboardClient from "@/component/Dashboard/DashboardClient";

// Server-side data fetching
async function fetchAllData() {
    try {
        const [ordersRes, usersRes, brandsRes, categoriesRes, productsRes] = await Promise.all([
            fetch("http://172.20.10.4:8000/jobs/order", { cache: 'no-store' }),
            fetch("http://172.20.10.4:8000/jobs/user", { cache: 'no-store' }),
            fetch("http://172.20.10.4:8000/jobs/brand", { cache: 'no-store' }),
            fetch("http://172.20.10.4:8000/jobs/category", { cache: 'no-store' }),
            fetch("http://172.20.10.4:8000/jobs/product", { cache: 'no-store' }),
        ]);

        // Parse JSON responses
        const ordersData = await ordersRes.json();
        const usersData = await usersRes.json();
        const brandsData = await brandsRes.json();
        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        return {
            orders: ordersData.data || [],
            users: usersData.data || [],
            brands: brandsData.data || [],
            categories: categoriesData.data || [],
            products: productsData.data || [],
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            orders: [],
            users: [],
            brands: [],
            categories: [],
            products: [],
        };
    }
}

// Server Component 
export default async function Dashboard() {
    // Fetch data on server
    const { orders, users, brands, categories, products } = await fetchAllData();

    return (
        <div className="p-6">
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl -z-10"></div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                               KK Dashboard
                            </h1>
                            <p className="text-slate-600 font-medium">ภาพรวมการจัดการระบบ</p>
                        </div>
                    </div>
                    <div className="relative w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
                    </div>
                </div>
            </div>
            
            <DashboardClient 
                orders={orders}
                users={users}
                brands={brands}
                categories={categories}
                products={products}
            />
        </div>
    );
}
