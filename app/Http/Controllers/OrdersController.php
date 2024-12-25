<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Orders;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $orders = Orders::with('orderDetails.product')->get();
        return response()->json($orders);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $totalPdice = 0;
        foreach ($request->products as $product) {
            $productData = Product::find($product['id']);
            $totalPdice += $productData->price; /// $product['quantity'];
        }

        $order = Orders::create([
            'total_price' => $totalPdice,
        ]);

        $pros = $request->products;

        foreach ($pros as $product) {
            $productData = Product::find($product['id']);
            $order->orderDetails()->create([
                'order_id' => $order->id,
                'product_id' => $product['id'],
                // 'quantity' => $product['quantity'],
                'price' => $productData->price,
            ]);
        }

        return response()->json(['message' => 'Order created successfully!', 'order' => $order]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Orders::with('orderDetails.product')->findOrFail($id);
        return response()->json($order);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        //
        $request->validate([
            'products ' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Orders::findOrFail($id);
        $order->orderDetails()->delete();

        $totalPrice = 0;

        foreach ($request->products as $product) {
            $productData = Product::find($product['id']);
            $totalPrice += $productData->price * $product['quantity'];

            $order->orderDetails()->create([
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'price' => $productData->price,

            ]);
        }

        $order->update(['total_price' => $totalPrice]);

        return response()->json(['message' => 'Order updated successfully!', 'order' => $order]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Orders::findOrFail($id);
        $order->orderDetails()->delete();
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully!']);
    }
}
