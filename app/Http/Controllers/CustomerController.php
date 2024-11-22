<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Flasher\Prime\FlasherInterface;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::latest()->get();
        return inertia('Customers/Index', compact('customers'));
    }

    public function create()
    {
        return inertia('Customers/Create');
    }

    public function store(Request $request, FlasherInterface $flasher)
    {
        // Validate the input fields
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'number' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'pic' => 'nullable|image|max:2048',  // Image validation
        ]);

        // Handle file upload if there's an image
        if ($request->hasFile('pic')) {
            $file = $request->file('pic');
            // Generate a unique filename using time and random string
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            // Store the image in the 'public/customers' folder, making it publicly accessible
            $validated['pic'] = $file->storeAs('customers', $filename, 'public');
        }

        // Add creator ID and store the customer data
        $validated['creator'] = auth()->id();
        Customer::create($validated);

        // Flash success message
        $flasher->addSuccess('Customer created successfully.');
        return redirect()->route('customers.index');
    }

    public function edit(Customer $customer)
    {
        return inertia('Customers/Edit', compact('customer'));
    }

    public function update(Request $request, Customer $customer, FlasherInterface $flasher)
    {
        // Validate the input fields
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $customer->id,
            'number' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'pic' => 'nullable|image|max:2048',  // Image validation
        ]);

        // Handle file upload if there's an image
        if ($request->hasFile('pic')) {
            // Delete the old image if it exists
            if ($customer->pic) {
                Storage::disk('public')->delete($customer->pic);
            }

            // Generate a unique filename using time and random string
            $file = $request->file('pic');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            // Store the image in the 'public/customers' folder, making it publicly accessible
            $validated['pic'] = $file->storeAs('customers', $filename, 'public');
        }

        // Add editor ID and update the customer data
        $validated['editor'] = auth()->id();
        $customer->update($validated);

        // Flash success message
        $flasher->addSuccess('Customer updated successfully.');
        return redirect()->route('customers.index');
    }

    public function destroy(Customer $customer, FlasherInterface $flasher)
    {
        // Delete the image from storage if it exists
        if ($customer->pic) {
            Storage::disk('public')->delete($customer->pic);
        }

        // Delete the customer record
        $customer->delete();

        // Flash success message
        $flasher->addSuccess('Customer deleted successfully.');
        return redirect()->route('customers.index');
    }
}
