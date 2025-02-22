<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Models\Invoice_Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{


  
  public function index()
    {
        $invoices = Invoice::orderBy('id', 'desc')->with('products.product', 'customer')->get();
        return Inertia::render('Sale/InvoiceList', [
            'invoices' => $invoices,
        ]);
    }

    public function salelist($id){
        $invoice = Invoice::with(['products', 'customer']) ->where('id',$id)->first();
        return Inertia::render('Sale/SaleList', [
            'invoice' => $invoice,
        ]);

    }

    public function pdf($id)
    {

        $invoice = Invoice::with(['products', 'customer']) ->where('id',$id)->first();
        $pdf = Pdf::loadView('admin.sale.pdf',compact('invoice'));
        return $pdf->download('invoice.pdf');
    }

    public function saleIndex()
    {
        $customers = Customer::all();
        $products = Product::all();
        return Inertia::render('Sale/Sale', [
            'customers' => $customers,
            'products' => $products,
        ]);

    }


    public function submitInvoice(Request $request)
    {

        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'total' => 'required',
            'paid' => 'required',
            'due' => 'required',
            'vat' => 'nullable',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.qty' => 'required',
            'items.*.price' => 'required',
        ]);


        $invoice = Invoice::create([
            'customer_id' => $request->customer_id,
            'total' => $request->total,
            'discount' => 0,
            'vat' => $request->vat ?? 0,
            'payable' => $request->total,
            'paid' => $request->paid,
            'due' => $request->due,
            'creator' => auth()->user()->id,
        ]);


        foreach ($request->items as $item) {
            Invoice_Product::create([
                'invoice_id' => $invoice->id,
                'product_id' => $item['product_id'],
                'qty' => $item['qty'],
                'sale_price' => $item['price'],
                'subtotal' => $item['qty'] * $item['price'],
                'creator' => auth()->user()->id,
            ]);
        }

        return response()->json(['message' => 'Invoice and items saved successfully']);
    }
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            Invoice_Product::where('invoice_id', $id)->delete();
            Invoice::where('id', $id)->delete();

            DB::commit();

            return redirect()->back()->with('success', 'Invoice and its items were successfully deleted.');
        } catch (\Exception $e) {
            DB::rollback();

            return redirect()->back()->with('error', 'An error occurred while deleting the invoice: ' . $e->getMessage());
        }
    }
}
