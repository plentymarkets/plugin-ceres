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

    public $globalsCondition;

    /**
     * Step constructor.
     */
    public function __construct()
    {
        $this->globalsCondition = "client !== 'preview'";
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
}