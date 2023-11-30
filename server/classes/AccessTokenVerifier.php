<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Path may vary based on your project structure

use Auth0\SDK\Auth0;

require_once 'TokenVerifier.php';

// AccessTokenVerifier class implementing TokenVerifier interface
class AccessTokenVerifier implements TokenVerifier {
    private $auth0;

    public function __construct() {
        $this->auth0 = new Auth0([
            'domain' => 'https://buckaroo-calculator.eu.auth0.com',
            'client_id' => 'PWMm48dwT77djrNgLxWYBHLucuhNYui8',
            'client_secret' => 'lT_8YqD97BkmXVY0Qk43y_XnCMIyQde5hMOljZeX5EhPD0zUdb6wZ9USg4iy4w-P',
            'audience' => 'https://buckaroo-calculator.eu.auth0.com/api/v2/',
        ]);
    }
    // public function verifyAccessToken($token) {
    //     try {
    //         echo($token);
    //         // return true;
    //         $this->auth0->setAccessToken($token);
    //         $userinfo = $this->auth0->getUser();

    //         return $userinfo !== null;
    //     } catch (\Exception $e) {
    //         return false;
    //     }
    // }
    public function verifyAccessToken($token) {
        try {
            // return true;
            $decodedToken = $this->auth0->decode($token);
            // Additional validation checks can be performed on $decodedToken if needed

            return $decodedToken !== null; // Token is valid
        } catch (Exception $e) {
            return false; // Token verification failed
        }
    }
}

?>
