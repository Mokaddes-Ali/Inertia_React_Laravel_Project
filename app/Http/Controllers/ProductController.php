<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Flasher\Prime\FlasherInterface;

class ProductController extends Controller
{
    // Add product form
    public function create()
    {
        $categories = Category::all();
        $brand = Brand::all();
        return Inertia::render('Products/Create', [
            'categories' => $categories,
            'brands' => $brand
        ]);
    }


     //show all data
     public function index()
     {
    $products = Product::with(['category', 'brand'])->orderBy('id', 'desc')->paginate(2);
    return Inertia::render('Products/Index', [
        'products' => $products
    ]);
    }


    public function dataShow($id)
{
    $product = Product::with(['creatorUser', 'editorUser', 'category', 'brand'])->findOrFail($id);
    return view('admin.product.index', compact('product'));
}


   // Insert product data
    public function store(Request $request, FlasherInterface $flasher)
    {

        $request->validate([
            'name' => 'required|max:100',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'price' => 'required|numeric',
            'cost' => 'required|numeric',
            'code' => 'required|unique:products,code',
            'unit' => 'required|numeric|min:1',
            'details' => 'nullable',
            'img_url' => 'nullable|image|mimes:jpeg,png,gif|max:2048',
            'status' => 'required|in:1,0',
        ]);

        $image_rename = '';
        if ($request->hasFile('img_url')) {
            $image = $request->file('img_url');
            $ext = $image->getClientOriginalExtension();
            $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
            $image->move(public_path('productImage'), $image_rename);
        }

        $product = Product::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'price' => $request->price,
            'cost' => $request->cost,
            'code' => $request->code,
            'unit' => $request->unit,
            'details' => $request->details,
            'img_url' => $image_rename,
            'status' => $request->status,
            'creator' => auth()->id(),
            'slug' => Str::random(10),
        ]);

        if ($product) {
            $flasher->addSuccess('Data inserted successfully.', [
                'position' => 'top-center',
                'timeout' => 3000,
            ]);
            return redirect( route('products.index') );
        } else {
            return back()->with('fail', 'Data insert failed');
        }
    }

   //product list for api in invoice
   public function productList()
{

    $products = Product::all();

    return response()->json($products);
}


    public function edit($id){
        $product = Product::find($id);
        $categories = Category::all();
        $brands = Brand::all();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'brands' => $brands
        ]);
    }


public function update(Request $request, $id)
{
    // Validate the input fields
    $request->validate([
        'name' => 'required|max:100',
        'category_id' => 'required|exists:categories,id',
        'brand_id' => 'required|exists:brands,id',
        'price' => 'required|numeric',
        'cost' => 'required|numeric',
        'code' => 'required',
        'unit' => 'required|numeric|min:1',
        'details' => 'nullable',
        'img_url' => 'nullable|image|mimes:jpeg,png,gif|max:2048',
        'status' => 'required|boolean',
    ]);

    // Find the product by id
    $product = Product::find($id);

    if (!$product) {
        return redirect()->back()->with('fail', 'Product not found.');
    }

    // Handle the image upload if there's a new one
    $image_rename = $product->img_url; // Keep the old image name by default

    if ($request->hasFile('img_url')) {
        // Delete the old image if it exists
        if ($product->img_url && file_exists(public_path('productImage/' . $product->img_url))) {
            unlink(public_path('productImage/' . $product->img_url));
        }

        // Upload the new image
        $image = $request->file('img_url');
        $ext = $image->getClientOriginalExtension();
        $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
        $image->move(public_path('productImage'), $image_rename);
    }

    // Update the product in the database
    $product->update([
        'name' => $request->name,
        'category_id' => $request->category_id,
        'brand_id' => $request->brand_id,
        'price' => $request->price,
        'cost' => $request->cost,
        'code' => $request->code,
        'unit' => $request->unit,
        'details' => $request->details,
        'img_url' => $image_rename,
        'status' => $request->status,
    ]);

    // Redirect back with success or failure message
    return redirect()->route('products.index')->with('success', 'Product updated successfully.');
}




// Show product details
public function destroy($id)
{
    $product = Product::find($id);

    if (!$product) {
        return redirect()->back()->with('fail', 'Product not found.');
    }
    if ($product->img_url && file_exists(public_path('productImage/' . $product->img_url))) {
        unlink(public_path('productImage/' . $product->img_url));
    }
    $product->delete();
    return redirect()->back()->with('success', 'Product deleted successfully.');
}

}
