<?php

use App\Http\Lumberjack;
use App\AssetResolver;

require_once('vendor/autoload.php');

// Create the Application Container
$app = require_once('bootstrap/app.php');

// Bootstrap Lumberjack from the Container
$lumberjack = $app->make(Lumberjack::class);
$lumberjack->bootstrap();

// Import our routes file
require_once('routes.php');

// Set global params in the Timber context
add_filter('timber_context', [$lumberjack, 'addToContext']);

add_action('wp_enqueue_scripts', function () {
	// registers scripts and stylesheets
	wp_register_style('app', AssetResolver::resolve('css/app.css'), [], false );
	wp_register_script('app', AssetResolver::resolve('js/app.js'), [], false, true );
	// enqueue global assets
	wp_enqueue_style('app');
	wp_enqueue_script('app');
} );

add_filter('timber/context', 'add_to_context');

function add_to_context( $context ) {
    $context['menu'] = new Timber\Menu('Primary Navigation');
    return $context;
}