<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\Category;
use App\Models\Customer;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $invoices = Invoice::count();
        $products = Product::count();
        $categories = Category::count();
        $brands = Brand::count();
        $customers = Customer::count();
        $totalPaidAmount = Invoice::sum('paid');
        $totalDueAmount = Invoice::sum('due');
        $totalVat = Invoice::sum('vat');

        return Inertia::render('Dashboard', [
            'invoices' => $invoices,
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'customers' => $customers,
            'totalPaidAmount' => $totalPaidAmount,
            'totalDueAmount' => $totalDueAmount,
            'totalVat' => $totalVat,
        ]);
    }
}
