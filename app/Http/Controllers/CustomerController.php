<?php



namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    // Show the create customer form
    public function index()
    {
        return Inertia::render('Customers/Create');
    }

    // Show all customers
    public function show()
    {
        $customers = Customer::all();
        return Inertia::render('Customers/Index', [
            'customers' => $customers
        ]);
    }

    // Insert customer data
    public function create(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|max:40',
            'email' => 'required|email',
            'number' => 'required',
            'address' => 'required',
            'pic' => 'required|image|mimes:jpeg,png,gif|max:2048', // Validate image file
        ]);

        $image_rename = '';
        if ($request->hasFile('pic')) {
            $image = $request->file('pic');
            $ext = $image->getClientOriginalExtension();
            $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
            $image->move(public_path('images'), $image_rename);
        }

        // Insert the customer record into the database
        $insert = Customer::insertGetId([
            'name' => $request->name,
            'email' => $request->email,
            'number' => $request->number,
            'address' => $request->address,
            'pic' => $image_rename,
        ]);

        // Redirect or return a response based on the result
        if ($insert) {
            return redirect()->route('customer.show')->with('success', 'Customer added successfully!');
        } else {
            return back()->with('fail', 'Data insertion failed');
        }
    }

    // Show the edit form for the customer
    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer
        ]);
    }

    // Update customer data
    public function update(Request $request, Customer $customer)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|max:40',
            'email' => 'required|email',
            'number' => 'required',
            'address' => 'required',
            // 'pic' => 'nullable|image|mimes:jpeg,png,gif|max:2048', // Validate image file (optional)
        ]);

        // // Handle the image upload if there's a new image
        // $image_rename = $customer->pic;
        // if ($request->hasFile('pic')) {
        //     $image = $request->file('pic');
        //     $ext = $image->getClientOriginalExtension();
        //     $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
        //     $image->move(public_path('images'), $image_rename);

        //     // Delete the old image file if exists
        //     if (file_exists(public_path('images/' . $customer->pic)) && $customer->pic) {
        //         unlink(public_path('images/' . $customer->pic));
        //     }
        // }

        // Update the customer record in the database
        $customer->update([
            'name' => $request->name,
            'email' => $request->email,
            'number' => $request->number,
            'address' => $request->address,
            // 'pic' => $image_rename,
        ]);

        // Redirect or return a response based on the result
        return redirect()->route('customer.show')->with('success', 'Customer updated successfully!');
    }

    // Delete customer data
    public function destroy(Customer $customer)
    {
        // Delete the customer image if exists
        if (file_exists(public_path('images/' . $customer->pic)) && $customer->pic) {
            unlink(public_path('images/' . $customer->pic));
        }

        // Delete the customer record from the database
        $customer->delete();

        // Redirect with success message
        return redirect()->route('customer.show')->with('success', 'Customer deleted successfully!');
    }
}


// namespace App\Http\Controllers;


// use App\Models\Customer;
// use Illuminate\Http\Request;
// use Flasher\Prime\FlasherInterface;
// use Illuminate\Support\Facades\Auth;
// use Inertia\Inertia;

// class CustomerController extends Controller
// // {

//     public function index(){
//         return Inertia::render('Customers/Create');
//     }

//     // Show all customers

//     public function show(){
//         $customers = Customer::all();
//         return Inertia::render('Customers/Index', [
//             'customers' => $customers
//         ]);

//     }

//      // Insert customer data
//     public function create(Request $request){
//           //dd($request->all());

//             $request->validate([
//             'name' => 'required|max:40',
//             'email' => 'required',
//             'number' => 'required',
//             'address' => 'required',
//             'pic' => 'required|image|mimes:jpeg,png,gif|max:2048',
//         ]);

//         $image_rename = '';
//         if ($request->hasFile('pic')) {
//             $image = $request->file('pic');
//             $ext = $image->getClientOriginalExtension();
//             $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
//             $image->move(public_path('images'), $image_rename);
//         }

//         $insert = Customer::insertGetId([
//             'name' => $request['name'],
//             'email' => $request['email'],
//             'number' => $request['number'],
//             'address' => $request['address'],
//             'pic' => $image_rename ,
//         ]);

//         if ($insert) {
//             return redirect()->route('customer.show')->with('success', 'Customer added successfully!');

//         } else {
//             return back()->with('fail', 'Data insert failed');
//         }
//     }

//     public function edit(Customer $customer)
// {
//     return Inertia::render('Customers/Edit', [
//         'customer' => $customer
//     ]);
// }


// }
