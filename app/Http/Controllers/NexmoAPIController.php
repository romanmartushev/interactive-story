<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SendTextRequest;
use \Nexmo\Client\Credentials\Basic;
use \Nexmo\Client;

class NexmoAPIController extends Controller
{
    /**
     * @param SendTextRequest $request
     * @return array|\Exception
     * @throws Client\Exception\Exception
     * @throws Client\Exception\Request
     * @throws Client\Exception\Server
     */
    public function sendText(SendTextRequest $request){
        //https://help-charlie.localhost/api/send-text?format=json&from=12109619101&to=12182805085&text=hello&api_key=&api_secret=
        $validated = $request->validated();
        $basic  = new Basic($validated['api_key'], $validated['api_secret']);
        $client = new Client($basic);
        $response = $client->message()->send($validated);
        try{
            return ['response_received' => $response->getResponseData()];
        }catch(\Exception $e){
            return $e;
        }
    }
}
