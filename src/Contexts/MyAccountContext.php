<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class MyAccountContext extends CategoryContext implements ContextInterface
{
    /**
     * @inheritdoc
     */
    public $assetName = "ceres-checkout";
}