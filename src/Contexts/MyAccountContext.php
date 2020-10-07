<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class MyAccountContext extends CategoryContext implements ContextInterface
{
    public $assetName = "ceres-checkout";
}