<?php

namespace Ceres\Contexts;

interface ContextInterface
{
    public function init($params, $templateContainer);
}