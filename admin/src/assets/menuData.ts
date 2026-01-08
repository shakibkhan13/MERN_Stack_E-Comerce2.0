import {
    Bookmark,
    FileText,
    Layers2,
    LayoutDashboard,
    Package,
    ShoppingBag,
    Tag,
    User,
    Users
} from 'lucide-react'

export const navigationMenu = [
    {
        to: "/dashboard",
        icon: LayoutDashboard, 
        label: "Dashboard", 
        end: true, 
    },
    {
        to: "/dashboard/account", 
        icon: User, 
        label: "Account", 
    }, 
    {
        to: "/dashboard/users", 
        icon: Users, 
        label: "Users", 
    }, 
    {
        to: "/dashboard/orders", 
        icon: Package, 
        label: "Orders", 
    }, 
    {
        to: "/dashboard/invoices", 
        icon: FileText, 
        label: "Invoices", 
    }, 
    {
        to: "/dashboard/banners", 
        icon: Layers2, 
        label: "Banners", 
     },
    {
        to: "/dashboard/products", 
        icon: ShoppingBag, 
        label: "Products",
    }, 
    {
        to: "/dashboard/categories", 
        icon: Tag,
        label: "Categories", 
    }, 
    {
        to: "/dashboard/brands",
        icon: Bookmark, 
        label: "Brands"
    }
]