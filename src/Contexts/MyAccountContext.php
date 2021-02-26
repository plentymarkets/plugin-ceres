<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

/**
 * Class MyAccountContext
 *
 * Context class with additional data, required for my account view.
 *
 * @package Ceres\Contexts
 */
class MyAccountContext extends CategoryContext implements ContextInterface
{
    /**
     * @inheritDoc
     */
    public $assetName = "ceres-checkout";
}
