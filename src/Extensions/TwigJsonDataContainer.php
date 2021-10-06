<?php
namespace Ceres\Extensions;

use Plenty\Plugin\Templates\Extensions\Twig_Extension;
use Plenty\Plugin\Templates\Factories\TwigFactory;

/**
 * Class TwigJsonDataContainer
 * This TWIG extension helps minimise inline JSON data in the markup.
 * It creates script tags for each provided item, at one point.
 *
 * @package Ceres\Extensions
 */
class TwigJsonDataContainer extends Twig_Extension
{
    /**
     * @var TwigFactory $twig The factory to render TWIG.
     */
    private $twig;

    /**
     * @var array Stored data used to create script tags.
     */
    private $dataStorage = [];

    /**
     * TwigJsonDataContainer constructor.
     * @param TwigFactory $twig The factory to render TWIG.
     */
    public function __construct(TwigFactory $twig)
    {
        $this->twig = $twig;
    }

    /**
     * Return the name of the extension.
     *
     * @return string The name of the extension.
     */
    public function getName(): string
    {
        return "Ceres_Extension_TwigJsonDataContainer";
    }

    /**
     * Return a list of filters to add.
     *
     * @return array The list of filters to add.
     */
    public function getFilters(): array
    {
        return [
            $this->twig->createSimpleFilter('json_data', [$this, 'storeJsonData'], ['is_safe' => array('html')])
        ];
    }

    /**
     * Return a list of functions to add.
     *
     * @return array The list of functions to add.
     */
    public function getFunctions(): array
    {
        return [
            $this->twig->createSimpleFunction('get_json_data', [$this, 'getJsonData'], ['is_safe' => array('html')])
        ];
    }

    /**
     * Store given data in the property dataStorage for later access.
     * The data is stored behind the uid, which is getting generated if it isn't set.
     *
     * @param $data array The data to store.
     * @param string $uid If set, it gets used as key in the dataStorage.
     * @return string The uid, used as a key for storing the data.
     */
    public function storeJsonData($data, $uid = null)
    {
        if ( is_null($uid) )
        {
            $uid = uniqid();
        }

        $this->dataStorage[$uid] = json_encode($data);
        return $uid;
    }

    /**
     * Return a string, including a sequence of script tags (HTML) for each item in the property dataStorage.
     *
     * @return string A sequence of script tags.
     */
    public function getJsonData()
    {
        $result = [];
        foreach( $this->dataStorage as $uid => $data )
        {
            $script  = "<!-- SSR:global(jsonData.$uid) -->\n";
            $script .= "<script type=\"application/json\" id=\"$uid\">\n";
            $script .= $data . "\n";
            $script .= "</script>\n";
            $script .= "<!-- /SSR -->";

            $result[] = $script;
        }

        return implode("\n", $result);
    }

    /**
     * Return a map of global helper objects to add.
     *
     * @return array The map of helper objects to add.
     */
    public function getGlobals(): array
    {
        return [];
    }
}
