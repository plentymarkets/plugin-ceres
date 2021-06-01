<?php

namespace Ceres\Extensions;

use IO\Helper\Utils;
use IO\Helper\SafeGetter;
use IO\Services\PropertyFileService;
use Plenty\Plugin\Templates\Extensions\Twig_Extension;
use Plenty\Plugin\Templates\Factories\TwigFactory;
use Plenty\Plugin\Templates\Twig;
use Plenty\Plugin\Translation\Translator;

/**
 * Class TwigItemDataField
 * This TWIG extension provides several functions and filters for accessing item data.
 * Created for the ShopBuilder text widget.
 *
 * @package Ceres\Extensions
 */
class TwigItemDataField extends Twig_Extension
{
    /**
     * @var TwigFactory $twig The factory to render TWIG.
     */
    private $twig;

    /**
     * @var array $itemData This array acts as a stack (LIFO). The last element is used for data field fetches.
     */
    private $itemData = [];

    /**
     * TwigItemDataField constructor.
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
        return 'Ceres_Extension_TwigItemDataField';
    }

    /**
     * Return a list of functions to add.
     *
     * @return array The list of functions to add.
     */
    public function getFunctions(): array
    {
        return [
            $this->twig->createSimpleFunction('set_item_data_base', [$this, 'setItemDataBase']),
            $this->twig->createSimpleFunction('pop_item_data_base', [$this, 'popItemDataBase']),
            $this->twig->createSimpleFunction('item_data_field', [$this, 'getDataField'], ['is_safe' => array('html')]),
            $this->twig->createSimpleFunction(
                'item_data_field_html',
                [$this, 'getDataFieldHtml'],
                ['is_safe' => ['html']]
            ),
        ];
    }

    /**
     * Return a list of filters to add.
     *
     * @return array The list of filters to add.
     */
    public function getFilters(): array
    {
        return [
            $this->twig->createSimpleFilter('ageRestriction', [$this, 'formatAgeRestriction']),
            $this->twig->createSimpleFilter('moment', [$this, 'formatDate'])
        ];
    }

    /**
     * Add an item data array into the property itemData.
     *
     * @param array $itemData Item data array.
     * @return string Empty string.
     */
    public function setItemDataBase($itemData)
    {
        $this->itemData[] = $itemData;
        return '';
    }

    /**
     * Calls array_pop against the property itemData.
     *
     * @return string Empty string.
     */
    public function popItemDataBase()
    {
        array_pop($this->itemData);
        return '';
    }

    /**
     * Return a created HTML element. The content of the element is a TWIG statement to print a field from the item data.
     *
     * @param string $field The accessor for the field in the item data.
     * @param string $filter Add a filter in the TWIG string.
     * @param string $directiveType Vue.js directive type for the element.
     * @param string $htmlTagType HTML Tag for element.
     * @param string $linkType If set to "file", the element gets the attribute target="_black".
     * @return string Created element.
     */
    public function getDataField($field, $filter = null, $directiveType = "text", $htmlTagType = "span", $linkType = "")
    {
        $itemData = $this->itemData[count($this->itemData)-1];
        $twigPrint = SafeGetter::get($itemData, $field);
        if (!is_null($filter)) {
            try {
                /** @var Twig $twigRenderer */
                $twigRenderer = pluginApp(Twig::class);
                $twigPrint = $twigRenderer->renderString("{{ " . json_encode($twigPrint) . " | $filter }}");
            } catch (\Exception $e) {
                $tmp = $e->getMessage();
            }
        }

        if (is_null($directiveType)) {

            return $twigPrint;
        }

        $vueDirectiveAttr = $directiveType === 'text' || $directiveType === 'html' ?
            "v-$directiveType" :
            ":$directiveType";

        $vueDirectiveValue = isset($filter) ?
            "slotProps.getFilteredDataField('$field', '$filter')" :
            "slotProps.getDataField('$field')";

        $additionalAttributes = [];

        if ($directiveType === 'href') {
            $additionalAttributes['v-text'] = $vueDirectiveValue;
        }

        if ($linkType === 'file') {
            $additionalAttributes['v-if'] = $vueDirectiveValue;
            $additionalAttributes['target'] = '_blank';

            $propertyFileService = pluginApp(PropertyFileService::class);
            $vueDirectiveValue = "'{$propertyFileService->getPropertyFileUrl()}' + $vueDirectiveValue";
        }

        $attributes = '';
        foreach ($additionalAttributes as $attrName => $attrValue) {
            $attributes .= " $attrName=\"$attrValue\"";
        }

        if (in_array($htmlTagType, ['img'])) {
            $html = "<$htmlTagType $vueDirectiveAttr=\"$vueDirectiveValue\"$attributes v-if=\"$vueDirectiveValue\"/>";
        } else {
            $html = "<$htmlTagType $vueDirectiveAttr=\"$vueDirectiveValue\"$attributes>$twigPrint</$htmlTagType>";
        }

        return $html;
    }

    /**
     * Call method getDataField with the directiveType "html".
     *
     * @param string $field The accessor for the field in the item data.
     * @param string $filter Add a filter in the TWIG string.
     * @return string Created element.
     */
    public function getDataFieldHtml($field, $filter = null)
    {
        return $this->getDataField($field, $filter, 'html');
    }


    /**
     * Convert an age to the assigned translation string.
     *
     * @param int $age The age.
     * @return string The translated age string.
     */
    public function formatAgeRestriction($age)
    {
        $age = intval($age);
        /** @var Translator $translator */
        $translator = pluginApp(Translator::class);
        if ($age === 0) {
            return $translator->trans('Ceres::Template.singleItemAgeRestrictionNone', ['age' => $age]);
        } elseif ($age > 0 && $age <= 18) {
            return $translator->trans('Ceres::Template.singleItemAgeRestriction', ['age' => $age]);
        } elseif ($age === 50) {
            return $translator->trans('Ceres::Template.singleItemAgeRestrictionNotFlagged', ['age' => $age]);
        } elseif ($age === 80) {
            return $translator->trans(
                'Ceres::Template.singleItemAgeRestrictionNotRequired',
                ['age' => $age]
            );
        }
        return $translator->trans('Ceres::Template.singleItemAgeRestrictionUnknown', ['age' => $age]);
    }

    /**
     * Format a date string.
     *
     * @param string $date The date string.
     * @return string The formatted date.
     */
    public function formatDate($date)
    {
        return date(
            Utils::translate('Ceres::Template.devDateFormat'),
            strtotime($date)
        );
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
