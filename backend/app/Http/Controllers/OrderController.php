<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index($status)
    {
        if ($status != `index`) {
            $order = Order::where('order.status', '!=', 0)
                ->join('user', 'user.id', '=', 'order.user_id')
                ->orderBy('order.created_at', 'desc')
                ->select('order.*', 'user.name')
                ->get();
        } else {
            $order = Order::where('order.status', '=', $status)
                ->join('user', 'user.id', '=', 'order.user_id')
                ->orderBy('order.created_at', 'desc')
                ->select('order.*', 'user.name')
                ->get();
        }

        $total = Order::count();
        $resul = [
            'status' => true,
            'order' => $order,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }

    public function show($id)
    {
        $order = Order::find($id);
        $orderdetail = Orderdetail::where('orderdetail.order_id', $id)
            ->join('product', 'product.id', '=', 'orderdetail.product_id')
            ->select('product.image', 'product.name', 'orderdetail.qty', 'orderdetail.price', 'orderdetail.amount')
            ->get();
        $customer = User::where([['id', $order->user_id], ['roles', '=', 'customer']])->first();
        $total = 0;
        foreach ($orderdetail as $r) {
            $total += ($r->qty * $r->price);
        }
        if ($order == null) {
            $resul = [
                'status' => false,
                'order' => null,
                'message' => 'khong tim thay'

            ];
            return response()->json($resul, 404);
        }
        $resul = [
            'status' => true,
            'order' => $order,
            'orderdetail' => $orderdetail,
            'user' => $customer,
            'message' => 'Tai du lieu thanh cong1',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }

    function status($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $order->status = ($order->status == 1) ? 2 : 1;
        $order->updated_at = date('Y-m-d H:i:s');
        $order->updated_by = 1; //tam
        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function delete(Request $request, $id)
    {
        $brand = Order::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $brand->status = $request->status;
        if ($brand->save()) {
            $result = [
                'status' => true,
                'banner' => $brand,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $brand = Order::where('order.status', '!=', 0)
            ->join('user', 'user.id', '=', 'order.user_id')
            ->orderBy('order.created_at', 'desc')
            ->select('order.*', 'user.name')
            ->get();
        $total = Order::count();
        $resul = [
            'status' => true,
            'brand' => $brand,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'user_id' => 'required|integer',
            'delivery_name' => 'required|string|max:255',
            'delivery_gender' => 'required|string|max:255',
            'delivery_email' => 'required|string|email|max:255',
            'delivery_phone' => 'required|string|max:255',
            'delivery_address' => 'required|string|max:1000',
            'note' => 'nullable|string|max:1000',
            // 'order_details' => 'required|array',
            // 'order_details.*.product_id' => 'required|integer',
            // 'order_details.*.price' => 'required|numeric',
            // 'order_details.*.qty' => 'required|integer|min:1',
            // 'order_details.*.discount' => 'required|numeric',
            // 'order_details.*.amount' => 'required|numeric',
        ]);

        // Create an order
        $order = new Order();
        $order->user_id = $validatedData['user_id'];
        $order->delivery_name = $validatedData['delivery_name'];
        $order->delivery_gender = $validatedData['delivery_gender'];
        $order->delivery_email = $validatedData['delivery_email'];
        $order->delivery_phone = $validatedData['delivery_phone'];
        $order->delivery_address = $validatedData['delivery_address'];
        $order->note = $validatedData['note'];
        // $order->created_by = auth()->id(); // Assuming you have authentication and know the creator
        $order->status = 2; // Assuming default status
        $order->save();

        // Save order details
        // foreach ($validatedData['order_details'] as $orderDetailData) {
        //     $orderDetail = new Orderdetail();
        //     $orderDetail->order_id = $order->id; // Assign the newly created order ID
        //     $orderDetail->product_id = $orderDetailData['product_id'];
        //     $orderDetail->price = $orderDetailData['price'];
        //     $orderDetail->qty = $orderDetailData['qty'];
        //     $orderDetail->discount = $orderDetailData['discount'];
        //     $orderDetail->amount = $orderDetailData['amount'];
        //     $orderDetail->save();
        // }

        // Return a response or redirect as needed
        return response()->json(['message' => 'Order created successfully'], 201);
    }
    function update(Request $request, $id)
    {
        $brand = Order::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $brand->name = $request->name;
        $brand->link = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/banner'), $fileName);
                $brand->image = $fileName;
            }
        }


        $brand->description = $request->description;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //tam
        $brand->status = $request->status;

        if ($brand->save()) {
            $result = [
                'status' => true,
                'order' => $brand,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }


    function destroy($id)
    {
        $banner = Order::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($banner->delete()) {
            $result = [
                'status' => true,
                'order' => $banner,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
}
