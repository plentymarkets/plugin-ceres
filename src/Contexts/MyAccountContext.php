<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

/**
 * Context class with additional data, required for my account view.
 */
class MyAccountContext extends CategoryContext implements ContextInterface
{
    /**
     * @inheritDoc
     */
    public $assetName = "ceres-checkout";
}