<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;
use IO\Extensions\Functions\UniqueId;

class UUIDSettingFactory extends BaseSettingFactory
{
    public function __construct()
    {
        $uuidGenerator = pluginApp(UniqueId::class);
        $uuid = $uuidGenerator->generateUniqueId();
        $this->withType('uuid')->withDefaultValue($uuid);
    }
}
