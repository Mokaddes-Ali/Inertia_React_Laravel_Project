<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    // Add Form
    public function index()
    {
        $brands = Brand::orderBy('id', 'desc')->get();
        return Inertia::render('Brands/Index', ['brands' => $brands]);
    }

    // Show All Data
    public function show()
    {
        $all = Brand::orderBy('id', 'desc')->paginate(4);
        return Inertia::render('Brands/Show', ['brands' => $all]);
    }

    // Insert Data
    public function create(Request $request)
    {
        $request->validate([
            'brandName' => 'required|max:40',
            'brandImg' => 'required|image|mimes:jpeg,png,gif|max:2048',
        ]);

        $image_rename = '';

        if ($request->hasFile('brandImg')) {
            $image = $request->file('brandImg');
            $ext = $image->getClientOriginalExtension();
            $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
            $image->move(public_path('BrandImage'), $image_rename);
        }

        Brand::create([
            'brandName' => $request->brandName,
            'brandImg' => $image_rename,
        ]);

        return redirect()->route('brands.index')->with('success', 'Brand created successfully');
    }

    // Edit Form
    public function edit($id)
    {
        $record = Brand::findOrFail($id);
        return Inertia::render('Brands/Edit', ['brand' => $record]);
    }

    // Update Data
    public function update(Request $request, $id)
    {
        $request->validate([
            'brandName' => 'required|max:40',
            'brandImg' => 'nullable|image|mimes:jpeg,png,gif|max:2048',
        ]);

        $brand = Brand::findOrFail($id);
        $image_rename = $brand->brandImg;

        if ($request->hasFile('brandImg')) {
            $image = $request->file('brandImg');
            $ext = $image->getClientOriginalExtension();
            $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
            $image->move(public_path('BrandImage'), $image_rename);

            if (file_exists(public_path('BrandImage/' . $brand->brandImg))) {
                unlink(public_path('BrandImage/' . $brand->brandImg));
            }
        }

        $brand->update([
            'brandName' => $request->brandName,
            'brandImg' => $image_rename,
        ]);

        return redirect()->route('brands.index')->with('success', 'Brand updated successfully');
    }

    // Delete Data
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);

        if ($brand) {
            $imagePath = public_path('BrandImage/' . $brand->brandImg);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            $brand->delete();
        }

        return redirect()->route('brands.index')->with('success', 'Brand deleted successfully');
    }
}


