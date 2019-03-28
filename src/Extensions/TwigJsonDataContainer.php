<?php
namespace Ceres\Extensions;

use Plenty\Plugin\Templates\Extensions\Twig_Extension;
use Plenty\Plugin\Templates\Factories\TwigFactory;

/**
 * Class TwigStyleScriptTagFilter
 * @package Ceres\Extensions
 */
class TwigJsonDataContainer extends Twig_Extension
{
    /**
     * @var TwigFactory
     */
    private $twig;

    private $dataStorage = [];

    /**
     * TwigStyleScriptTagFilter constructor.
     * @param TwigFactory $twig
     */
    public function __construct(TwigFactory $twig)
    {
        $this->twig = $twig;
    }

    /**
     * Return the name of the extension. The name must be unique.
     *
     * @return string The name of the extension
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
     * @return array the list of functions to add.
     */
    public function getFunctions(): array
    {
        return [
            $this->twig->createSimpleFunction('get_json_data', [$this, 'getJsonData'], ['is_safe' => array('html')])
        ];
    }

    public function storeJsonData($data, $uid = null)
    {
        if ( is_null($uid) )
        {
            $uid = uniqid();
        }

        $this->dataStorage[$uid] = json_encode($data);
        return $uid;
    }

    public function getJsonData()
    {
        $result = [];
        foreach( $this->dataStorage as $uid => $data )
        {
            $result[] = "<script type=\"application/json\" id=\"" . $uid . "\">" . $data . "</script>";
        }

        return implode("", $result);
    }

    /**
     * Return a map of global helper objects to add.
     *
     * @return array the map of helper objects to add.
     */
    public function getGlobals(): array
    {
        return [];
    }
}
