<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Help Charlie</title>
        <link href="/css/welcome.css" rel="stylesheet" type="text/css">
        <link href="/css/tic-tac-toe.css" rel="stylesheet" type="text/css">
        <link href="/css/app.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="flex-center position-ref full-height" id="root">
            <transition name="fade" v-cloak>
                @include('beginning')
            </transition>
            <transition name="fade" v-cloak>
                @include('charlie.charlie1')
            </transition>
            <transition name="fade" v-cloak>
                @include('charlie.charlie2')
            </transition>
            <transition name="fade" v-cloak>
                @include('charlie.charlie3')
            </transition>
            <transition name="fade" v-cloak>
                @include('partials.ticTacToe')
            </transition>
            <transition name="fade" v-cloak>
                @include('partials.final')
            </transition>
        </div>
    <script src="/js/main.js"></script>
    <script src="/js/tic-tac-toe.js"></script>
    </body>
</html>
