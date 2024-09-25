<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //brand
        'brand/destroy/*',
        'brand/store/*',
        'brand/store',
        'brand/update/*',
        //product
        'product/store',
        'product/store/*',
        'product/update/*',
        'product/destroy/*',


    ];
}
