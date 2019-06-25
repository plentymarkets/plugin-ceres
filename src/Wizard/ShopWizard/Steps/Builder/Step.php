<?php
/**
 * Created by PhpStorm.
 * User: Victor Albulescu
 * Date: 19/06/2019
 * Time: 15:11
 */

namespace Ceres\Wizard\ShopWizard\Steps\Builder;



use Plenty\Plugin\Http\Request;

class Step
{

    public $displayGlobals;

    /**
     * Step constructor.
     */
    public function __construct()
    {
        $this->displayGlobals = $this->setDisplayGlobals();
    }

    /**
     * @param $data
     * @param bool $captionColumn
     * @param bool $valColumn
     *
     * @return array
     */
    public function buildListBoxData($data, $captionColumn = false, $valColumn = false)
    {
        $listBoxValues = [];
        if (count($data)) {
            foreach ($data as $itemKey => $itemVal) {
                $valData = is_object($itemVal) ? $itemVal->toArray() : $itemVal;
                $caption = $captionColumn ? $valData[$captionColumn] : $valData;
                $value = $valColumn ? $valData[$valColumn] : $itemKey;

                $listBoxValues[] = [
                    "caption" => $caption,
                    "value" => $value
                ];
            }
        }

        return $listBoxValues;
    }

    /**
     * @return bool
     */
    private function setDisplayGlobals()
    {
        $request = pluginApp(Request::class);
        $optionId = $request->get('optionId');

        $displayGlobals = false;

        return $displayGlobals;
    }

    /**
     * @return bool
     */
    public function getDisplayGlobals()
    {
        return $this->displayGlobals;
    }
}