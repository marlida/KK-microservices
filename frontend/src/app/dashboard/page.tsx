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
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
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
