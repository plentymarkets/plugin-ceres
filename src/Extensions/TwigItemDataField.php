<?php
namespace Ceres\Extensions;

use Ceres\ShopBuilder\DataFieldProvider\Item\ItemDataFieldProvider;
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

    /** @var ItemDataFieldProvider */
    private $dataFieldProvider;

    /**
     * TwigStyleScriptTagFilter constructor.
     * @param TwigFactory $twig
     * @param ItemDataFieldProvider $dataFieldProvider
     */
    public function __construct(TwigFactory $twig, ItemDataFieldProvider $dataFieldProvider)
    {
        $this->twig = $twig;
        $this->dataFieldProvider = $dataFieldProvider;
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
            $this->twig->createSimpleFunction('item_data_field', [$this, 'getDataField'], ['is_safe' => array('html')])
        ];
    }

    /**
     * @param $field
     * @param null $filter
     * @return string
     */
    public function getDataField($field, $filter = null)
    {
        $vueDirective = isset($filter) ?
            "v-text=\"getFilteredDataField('$field', '$filter')\"" :
            "v-text=\"getDataField('$field')\"";
        $twigPrint = "{{ itemData.$field }}";

        return "<span $vueDirective>$twigPrint</span>";
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
