<?php
namespace Ceres\Extensions;

use IO\Helper\SafeGetter;
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

        $twigPrint = SafeGetter::get($this->itemData, $field);
        if(!is_null($filter))
        {
            try
            {
                /** @var Twig $twigRenderer */
                $twigRenderer = pluginApp(Twig::class);
                $twigPrint = $twigRenderer->renderString("{{ " . json_encode($twigPrint) . " | $filter }}");
            }
            catch(\Exception $e)
            {
                $tmp = $e->getMessage();
            }
        }

        if (is_null($directiveType))
        {
            return $twigPrint;
        }

        $vueDirective = isset($filter) ?
            "v-$directiveType=\"getFilteredDataField('$field', '$filter')\"" :
            "v-$directiveType=\"getDataField('$field')\"";

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

    public function formatAgeRestriction($age)
    {
        $age = intval($age);
        /** @var Translator $translator */
        $translator = pluginApp(Translator::class);
        if ($age === 0)
        {
            return $translator->trans("Ceres::Template.singleItemAgeRestrictionNone", ["age" => $age]);
        }
        else if ($age > 0 && $age < 18)
        {
            return $translator->trans("Ceres::Template.singleItemAgeRestriction", ["age" => $age]);
        }
        else if ($age === 50)
        {
            return $translator->trans("Ceres::Template.singleItemAgeRestrictionNotFlagged", ["age" => $age]);
        }
        else if ($age === 80)
        {
            return $translator->trans("Ceres::Template.singleItemAgeRestrictionNotRequired", ["age" => $age]);
        }

        return $translator->trans("Ceres::Template.singleItemAgeRestrictionUnknown", ["age" => $age]);
    }

    public function formatDate($date)
    {
        return date(
            pluginApp(Translator::class)->trans("Ceres::Template.devDateFormat"),
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
