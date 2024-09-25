<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Brand;
use App\Models\User;

class CustomerController extends Controller
{
    function index()
    {
        $customers = Brand::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Brand::count();
        $result = [
            'status' => true,
            'customers' => $customers,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $customer = Brand::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'customer' => $customer,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $customer = new Brand();
        $customer->name = $request->name;
        $customer->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/customer'), $fileName);
                $customer->image = $fileName;
            }
        }
        // end upload

        $customer->sort_order = $request->sort_order;
        $customer->description = $request->description;
        $customer->created_at = date('Y-m-d H:i:s');
        $customer->created_by = 1; //tam
        $customer->status = $request->status;

        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $customer = Brand::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $customer->name = $request->name;
        $customer->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/customer'), $fileName);
                $customer->image = $fileName;
            }
        }

        $customer->sort_order = $request->sort_order;
        $customer->description = $request->description;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //tam
        $customer->status = $request->status;

        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $customer = Brand::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($customer->delete()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $customer = Brand::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $customer->status = ($customer->status == 1) ? 2 : 1;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1;
        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function delete(Request $request, $id)
    {
        $customner = User::find($id);
        if ($customner == null) {
            $result = [
                'status' => false,
                'customner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $customner->status = $request->status;
        if ($customner->save()) {
            $result = [
                'status' => true,
                'customner' => $customner,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'customner' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $customner = User::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'username', 'status', 'gender', 'phone', 'email')
            ->get();
        $total = User::count();
        $resul = [
            'status' => true,
            'customner' => $customner,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
