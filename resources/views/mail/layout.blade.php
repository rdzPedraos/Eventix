<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
</head>

<body
    style="
        font-family: Arial, sans-serif; 
        margin:0; 
        padding:0; 
        box-sizing: border-box; 
        min-height: 100vh; 
        color: #555; 
        background-color: #f4f4f4; 
        padding:20px
    ">
    <div>

        <div
            style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

            <div style="display: flex; align-items: center; gap: 8px;">
                <img src="{{ asset('img/logo.png') }}" alt="Logo" style="height: 50px;" />
                <h2 style="margin: 4px 0 0 0;">
                    {{ config('app.name') }}
                </h2>
            </div>

            <h1 style="color: #333333; text-align: center;">@yield('title')</h1>

            @yield('body')
        </div>
</body>

</html>
