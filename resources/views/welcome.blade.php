<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Help Charlie</title>
        <link href="/css/welcome.css" rel="stylesheet" type="text/css">
        <link href="/css/app.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="flex-center position-ref full-height" id="root">
            <modal v-show="show" @close="show = false"></modal>
            <div class="content">
                <div class="title m-b-md">
                    Help Charlie
                </div>
                <div>
                    <button class="btn btn-dark" @click="show = true">Background</button>
                    <button class="btn btn-dark">Begin</button>
                    <a class="btn btn-dark" href="https://github.com/romanmartushev/interactive-story" target="_blank" role="button">GitHub</a>
                </div>
            </div>
        </div>
    <script src="/js/main.js"></script>
    </body>
</html>
