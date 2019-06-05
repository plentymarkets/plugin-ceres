<?php
namespace Ceres\Extensions;

use IO\Helper\SafeGetter;
use Plenty\Plugin\Templates\Extensions\Twig_Extension;
use Plenty\Plugin\Templates\Factories\TwigFactory;

/**
 * Class TwigStyleScriptTagFilter
 * @package Ceres\Extensions
 */
class TwigItemDataField extends Twig_Extension
{
    /**
     * @var TwigFactory
     */
    private $twig;

    private $itemData = null;

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
        return "Ceres_Extension_TwigItemDataField";
    }

    /**
     * Return a list of functions to add.
     *
     * @return array the list of functions to add.
     */
    public function getFunctions(): array
    {
        return [
            $this->twig->createSimpleFunction('set_item_data_base', [$this, 'setItemDataBase']),
            $this->twig->createSimpleFunction('item_data_field', [$this, 'getDataField'], ['is_safe' => array('html')]),
            $this->twig->createSimpleFunction('item_data_field_html', [$this, 'getDataFieldHtml'], ['is_safe' => array('html')]),
        ];
    }

    public function setItemDataBase($itemData)
    {
        $this->itemData = $itemData;
        return "";
    }

    /**
     * @param $field
     * @param null $filter
     * @return string
     */
    public function getDataField($field, $filter = null, $directiveType = "text")
    {
        $vueDirective = isset($filter) ?
            "v-$directiveType=\"getFilteredDataField('$field', '$filter')\"" :
            "v-$directiveType=\"getDataField('$field')\"";
        $twigPrint = SafeGetter::get($this->itemData, $field);

        return "<span $vueDirective>$twigPrint</span>";
    }

    /**
     * @param $field
     * @param null $filter
     * @return string
     */
    public function getDataFieldHtml($field, $filter = null)
    {
        return $this->getDataField($field, $filter, "html");
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

    /**
     * Return a list of filters to add.
     *
     * @return array The list of filters to add.
     */
    public function getFilters(): array
    {
        return [];
    }
}
