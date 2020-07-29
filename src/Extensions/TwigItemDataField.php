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
 * Class TwigStyleScriptTagFilter
 * @package Ceres\Extensions
 */
class TwigItemDataField extends Twig_Extension
{
    /**
     * @var TwigFactory
     */
    private $twig;

    /**
     * @var array $itemData
     * This array acts as a stack (LIFO)
     * The last element is used for datafield fetches
     */
    private $itemData = [];

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
        return 'Ceres_Extension_TwigItemDataField';
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

    public function setItemDataBase($itemData)
    {
        $this->itemData[] = $itemData;
        return '';
    }

    public function popItemDataBase()
    {
        array_pop($this->itemData);
        return '';
    }

    /**
     * @param $field
     * @param null $filter
     * @return string
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
     * @param $field
     * @param null $filter
     * @return string
     */
    public function getDataFieldHtml($field, $filter = null)
    {
        return $this->getDataField($field, $filter, 'html');
    }

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
     * @return array the map of helper objects to add.
     */
    public function getGlobals(): array
    {
        return [];
    }
}
