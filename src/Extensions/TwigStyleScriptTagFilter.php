<?php
namespace Ceres\Extensions;

use Plenty\Plugin\Templates\Extensions\Twig_Extension;
use Plenty\Plugin\Templates\Factories\TwigFactory;

/**
 * Created by ptopczewski, 28.11.17 21:57
 * Class TwigStyleScriptTagFilter
 * @package Ceres\Extensions
 */
class TwigStyleScriptTagFilter extends Twig_Extension
{
    private static $styleTags = [];

    private static $scriptTags = [];

    /**
     * @var TwigFactory
     */
    private $twig;

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
        return "Ceres_Extension_TwigStyleScriptTagFilter";
    }

    /**
     * Return a list of filters to add.
     *
     * @return array The list of filters to add.
     */
    public function getFilters(): array
    {
        return [
            $this->twig->createSimpleFilter('filter_tags', [$this, 'filterTags'], ['is_safe' => array('html')])
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
            $this->twig->createSimpleFunction('get_filtered_tags', [$this, 'getFilteredTags'], ['is_safe' => array('html')])
        ];
    }

    /**
     * @return string
     */
    public function getFilteredTags(){
        $tags = implode("\n", array_unique(self::$scriptTags));
        $tags .= implode("\n", array_unique(self::$styleTags));
        return $tags;
    }

    /**
     * @param $content
     * @param $containerName
     * @return mixed
     */
    public function filterTags($content, $containerName)
    {
        if (strpos($containerName, 'Ceres::Template') === 0 || strpos($containerName, 'Ceres::Script') === 0) {
            return $content;
        }

        //search for style tag
        if (strpos($content, '<style') !== false) {
            /** @var \DOMDocument $doc */
            $doc = pluginApp('DOMDocument', ['version' => '1.0', 'encoding' => 'utf-8']);
            $doc->loadHTML($content);
            foreach ($doc->getElementsByTagName('style') as $element) {
                $newdoc = pluginApp('DOMDocument', ['version' => '1.0', 'encoding' => 'utf-8']);
                $cloned = $element->cloneNode(TRUE);
                $newdoc->appendChild($newdoc->importNode($cloned, TRUE));
                self::$styleTags[] = $newdoc->saveHTML();
            }

            $content = preg_replace("/<style.*?>.*?<\\/style>/s", "", $content);
        }

        //search for style tag
        if (strpos($content, '<script') !== false) {
            /** @var \DOMDocument $doc */
            $doc = pluginApp('DOMDocument', ['version' => '1.0', 'encoding' => 'utf-8']);
            $doc->loadHTML($content);
            foreach ($doc->getElementsByTagName('script') as $element) {

                $newdoc = pluginApp('DOMDocument', ['version' => '1.0', 'encoding' => 'utf-8']);
                $cloned = $element->cloneNode(TRUE);
                $newdoc->appendChild($newdoc->importNode($cloned, TRUE));
                self::$scriptTags[] = $newdoc->saveHTML();
            }

            $content = preg_replace("/<script.*?>.*?<\\/script>/s", "", $content);
        }

        return $content;
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
