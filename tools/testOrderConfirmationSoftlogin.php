<?php

// Usage: php tools/testOrderConfirmationSoftlogin.php /path/to/twig/vendor/autoload.php
if (!isset($argv[1]) || !is_file($argv[1]))
{
    fwrite(STDERR, "Pass the path to a Composer autoloader providing Twig.\n");
    exit(1);
}
require $argv[1];

use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\Loader\LoaderInterface;
use Twig\Source;
use Twig\TwigFunction;

class RecordingSoftloginLoader implements LoaderInterface
{
    public $attempts = [];
    private $loader;

    public function __construct(array $templates)
    {
        $this->loader = new ArrayLoader($templates);
    }

    public function exists($name): bool
    {
        $this->attempts[] = $name;
        return $this->loader->exists($name);
    }

    public function getCacheKey($name): string
    {
        $this->attempts[] = $name;
        return $this->loader->getCacheKey($name);
    }

    public function getSourceContext($name): Source
    {
        $this->attempts[] = $name;
        return $this->loader->getSourceContext($name);
    }

    public function isFresh($name, $time): bool
    {
        $this->attempts[] = $name;
        return $this->loader->isFresh($name, $time);
    }
}

function checkSoftlogin($condition, $message)
{
    if (!$condition)
    {
        throw new RuntimeException($message);
    }
}

$templateName = 'Ceres::Checkout.OrderConfirmationSoftlogin';
$fallback = 'Ceres::Checkout.OrderConfirmation';
$pluginParent = 'Example::Checkout.OrderConfirmation';
$coreParent = 'Plenty\\Modules\\Webshop::SoftLogin.OrderConfirmationOverride';
$source = file_get_contents(__DIR__ . '/../resources/views/Checkout/OrderConfirmationSoftlogin.twig');
// Stock Twig rejects the existing conditional block declaration inside PartialHead.
// Keep the production inheritance preamble and PageBody verbatim; metadata needs the platform.
$headStart = strpos($source, '{% block PartialHead %}');
$bodyStart = strpos($source, '{% block PageBody %}');
checkSoftlogin($headStart !== false && $bodyStart > $headStart, 'Cannot isolate the soft-login body');
$source = substr($source, 0, $headStart) . substr($source, $bodyStart);
$parents = [$fallback, $pluginParent, $coreParent];
$cases = [
    'array candidates' => ['originalTemplate' => ['/etc/passwd', '::']],
    'associative array' => ['originalTemplate' => ['path' => '/etc/passwd', 'namespace' => '::']],
    'traversable candidates' => ['originalTemplate' => new ArrayObject(['/etc/passwd', '::'])],
    'undefined' => [],
    'null' => ['originalTemplate' => null],
    'empty string' => ['originalTemplate' => ''],
    'empty array' => ['originalTemplate' => []],
    'false' => ['originalTemplate' => false],
    'zero' => ['originalTemplate' => 0],
    'absolute path' => ['originalTemplate' => '/etc/passwd'],
    'traversal' => ['originalTemplate' => 'Ceres::../secret'],
    'plugin parent' => ['originalTemplate' => $pluginParent],
    'core parent' => ['originalTemplate' => $coreParent],
    // Simulate IO #1266 decoding an individual params value, not the top-level template.
    'JSON-decoded params array' => ['originalTemplate' => json_decode('["/etc/passwd", "::"]')],
    'JSON-decoded params object' => ['originalTemplate' => json_decode('{"namespace":"::"}')],
];
$bodyCases = [
    'no category' => [],
    'empty ShopBuilder content' => ['category' => ['id' => 42], 'builderContent' => '   '],
    'ShopBuilder content' => ['category' => ['id' => 42], 'builderContent' => '<p>Builder soft-login</p>'],
];
$testCount = 0;

foreach ($cases as $caseName => $params)
{
    foreach ($bodyCases as $bodyName => $bodyParams)
    {
        $label = $caseName . ' / ' . $bodyName;
        $expectedParent = in_array($caseName, ['plugin parent', 'core parent'], true)
            ? $params['originalTemplate'] : $fallback;
        $templates = [
            $templateName => $source,
            'Ceres::PageDesign.Macros.LayoutContainer' => '',
            'Ceres::Checkout.Partials.SoftLoginForm' => '<form id="soft-login-fixture"></form>',
            // Existing but inert candidates make the old guard's parent-selection bypass observable.
            '/etc/passwd' => 'REJECTED PATH FIXTURE{% block PageBody %}{% endblock %}',
            '::' => 'REJECTED NAMESPACE FIXTURE{% block PageBody %}{% endblock %}',
        ];
        foreach ($parents as $parent)
        {
            $templates[$parent] = 'PARENT:' . $parent
                . '{% block PageBody %}{% endblock %}';
        }

        // Only the checked-in target is read from disk; every loader candidate is in memory.
        $loader = new RecordingSoftloginLoader($templates);
        $twig = new Environment($loader, ['strict_variables' => true, 'cache' => false]);
        $builderCalls = [];
        $twig->addFunction(new TwigFunction('shop_builder_category_template',
            function ($id, $type) use (&$builderCalls, $bodyParams)
            {
                $builderCalls[] = [$id, $type];
                return $bodyParams['builderContent'];
            }
        ));
        $html = $twig->render($templateName, array_merge($params, $bodyParams));

        checkSoftlogin(strpos($html, 'PARENT:' . $expectedParent) !== false, $label . ': wrong parent');
        checkSoftlogin(in_array($expectedParent, $loader->attempts, true), $label . ': parent not loaded');
        $allowed = [$templateName, $expectedParent, 'Ceres::PageDesign.Macros.LayoutContainer',
            'Ceres::Checkout.Partials.SoftLoginForm'];
        checkSoftlogin(array_diff($loader->attempts, $allowed) === [],
            $label . ': rejected candidate reached loader: ' . json_encode($loader->attempts));
        checkSoftlogin(strpos($html, 'verify-order') !== false, $label . ': missing soft-login body');

        $hasBuilder = $bodyName === 'ShopBuilder content';
        checkSoftlogin((strpos($html, '<form id="soft-login-fixture">') !== false) === !$hasBuilder,
            $label . ': incorrect form rendering');
        checkSoftlogin((strpos($html, '<p>Builder soft-login</p>') !== false) === $hasBuilder,
            $label . ': incorrect ShopBuilder rendering');
        checkSoftlogin($builderCalls === (isset($bodyParams['category']) ? [[42, 'softlogin']] : []),
            $label . ': incorrect ShopBuilder call');
        $testCount++;
    }
}

echo "Passed $testCount soft-login rendering cases (Twig " . Environment::VERSION . ").\n";
